import logging
from os.path import join, dirname
from unittest import TestCase
from decimal import Decimal
from pytezos.crypto import Key
from pytezos import ContractInterface, MichelsonRuntimeError

for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)

logging.basicConfig(filename='token_log.log', level=logging.DEBUG)

alice = Key.from_encoded_key(
    "edskS3LMw4BFQjbutGWtLG9MtPhcoSsR6BfkLzrHhf5ZB36TfVqQsDxUXkrLaj6tULpoSnyWDF5HsNZvLJv2wL7W6YAahZPqwa"
)
bob = Key.from_encoded_key(
    "edskRqA1izJkgC8BAzXSnbhtcJdmZqN9YLDHLm7t4SLcVfds4hNGESLK6MH4Fvi8V4sviwMLyDbLRSenQscR4vJUMcoCAT7Pjm"
)

alice_address = alice.public_key_hash()
bob_address = bob.public_key_hash()

total_supply = 1000
total_staked = 0
reward_per_share = 0
last_update_time = 0
initial_storage = {
    "totalSupply": total_supply,
    "totalStaked": total_staked,
    "rewardPerShare": reward_per_share,
    "lastUpdateTime": last_update_time,
    "ledger": {
        alice_address: {
            "balance": total_supply,
            "staked": total_staked,
            "lastRewardPerShare": reward_per_share,
            "allowances": {},
        },
    },
}


class TokenTest(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.token = ContractInterface.create_from(
            join(dirname(__file__), "./../../build/token.tz"))
        cls.maxDiff = None

    def test_transfer_token(self):
        res = self.token \
            .transfer(
                sender=alice_address,
                receiver=bob_address,
                value=100
            ) \
            .result(initial_storage, alice_address)

        self.assertEqual(900,
                         res.big_map_diff['ledger'][alice_address]['balance'])
        self.assertEqual(100,
                         res.big_map_diff['ledger'][bob_address]['balance'])

    def test_fail_unaproved_transfer(self):
        with self.assertRaises(MichelsonRuntimeError):
            self.token \
                .transfer(
                    sender=alice_address,
                    receiver=bob_address,
                    value=1
                ) \
                .result(storage=initial_storage, source=bob_address)

    def test_mint(self):
        res = self.token \
            .mint(None) \
            .with_amount(1) \
            .result(storage=initial_storage, source=bob_address)

        self.assertEqual(1, res.big_map_diff['ledger'][bob_address]['balance'])

    def test_redeem(self):
        res = self.token \
            .redeem(2) \
            .result(
                storage={
                    **initial_storage, "ledger": {
                        bob_address: {
                            "balance": 8,
                            "staked": 4,
                            "lastRewardPerShare": 0,
                            "allowances": {},
                        }
                    }
                },
                source=bob_address
            )

        self.assertEqual(6, res.big_map_diff["ledger"][bob_address]["balance"])
        self.assertEqual(4, res.big_map_diff["ledger"][bob_address]["staked"])

    def test_stake(self):
        res = self.token \
            .stake(10) \
            .result(storage=initial_storage, source=alice_address)

        self.assertEqual(990,
                         res.big_map_diff["ledger"][alice_address]["balance"])
        self.assertEqual(10,
                         res.big_map_diff["ledger"][alice_address]["staked"])
        self.assertEqual(10, res.storage["totalStaked"])
        self.assertEqual(1000, res.storage["totalSupply"])

    def test_unstake(self):
        res = self.token \
            .unstake(20) \
            .result(storage={
                "totalSupply": 1000,
                "totalStaked": 100,
                "rewardPerShare": 0,
                "lastUpdateTime": 0,
                "ledger": {
                    bob_address: {
                        "balance": 500,
                        "staked": 30,
                        "lastRewardPerShare": 0,
                        "allowances": {},
                    },
                }
            }, source=bob_address)

        self.assertEqual(10, res.big_map_diff["ledger"][bob_address]["staked"])
        self.assertEqual(80, res.storage["totalStaked"])
        self.assertEqual(1000, res.storage["totalSupply"])
