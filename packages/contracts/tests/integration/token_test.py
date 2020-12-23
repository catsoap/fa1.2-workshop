import logging
from os.path import join, dirname
from unittest import TestCase
from decimal import Decimal
from pytezos.crypto import Key
from pytezos import ContractInterface, MichelsonRuntimeError

for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)

logging.basicConfig(filename='test_log.log', level=logging.DEBUG)

alice = Key.from_encoded_key(
    "edskS3LMw4BFQjbutGWtLG9MtPhcoSsR6BfkLzrHhf5ZB36TfVqQsDxUXkrLaj6tULpoSnyWDF5HsNZvLJv2wL7W6YAahZPqwa"
)
bob = Key.from_encoded_key(
    "edskRqA1izJkgC8BAzXSnbhtcJdmZqN9YLDHLm7t4SLcVfds4hNGESLK6MH4Fvi8V4sviwMLyDbLRSenQscR4vJUMcoCAT7Pjm"
)

alice_address = alice.public_key_hash()
bob_address = bob.public_key_hash()

total_supply = 10000000
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

    def test_transfer_token_from_alice_to_bob(self):
        res = self.token \
            .transfer(
                source=alice_address,
                receiver=bob_address,
                value=1000000
            ) \
            .result(initial_storage, alice_address)

        self.assertEqual(9000000,
                         res.big_map_diff['ledger'][alice_address]['balance'])
        self.assertEqual(1000000,
                         res.big_map_diff['ledger'][bob_address]['balance'])

    def test_fail_unaproved_transfer(self):
        with self.assertRaises(MichelsonRuntimeError):
            self.token \
                .transfer(
                    source=alice_address,
                    receiver=bob_address,
                    value=1
                ) \
                .result(storage=initial_storage, source=bob_address)

    def test_mint_1_token_for_1_nanotez(self):
        res = self.token \
            .mint(None) \
            .with_amount(1) \
            .result(storage=initial_storage, source=bob_address)

        self.assertEqual(1, res.big_map_diff['ledger'][bob_address]['balance'])

    def test_redeem_2_token(self):
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

        self.assertEqual(6, res.big_map_diff['ledger'][bob_address]['balance'])
        self.assertEqual(4, res.big_map_diff['ledger'][bob_address]['staked'])

    def test_stake_tokens_for_alice(self):
        res = self.token \
            .stake(1000000) \
            .result(storage=initial_storage, source=alice_address)

        self.assertEqual(9000000,
                         res.big_map_diff['ledger'][alice_address]['balance'])
