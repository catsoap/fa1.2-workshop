import logging
from os.path import join, dirname
from unittest import TestCase
from decimal import Decimal
from pytezos.crypto import Key
from pytezos import ContractInterface

for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)

logging.basicConfig(filename='test_log.log',level=logging.DEBUG)

alice = Key.from_encoded_key(
    "edskS3LMw4BFQjbutGWtLG9MtPhcoSsR6BfkLzrHhf5ZB36TfVqQsDxUXkrLaj6tULpoSnyWDF5HsNZvLJv2wL7W6YAahZPqwa")
bob = Key.from_encoded_key(
    "edskRqA1izJkgC8BAzXSnbhtcJdmZqN9YLDHLm7t4SLcVfds4hNGESLK6MH4Fvi8V4sviwMLyDbLRSenQscR4vJUMcoCAT7Pjm")

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
        cls.token = ContractInterface.create_from(join(dirname(__file__), "./../../build/token.tz"))
        cls.maxDiff = None

    def test_check_initial_storage(self):
        res = self.token \
            .transfer(source=alice_address, receiver=bob_address, value=1000000) \
            .result(storage=initial_storage, source=alice_address)

        self.assertEqual(total_supply, res.storage['totalSupply'])
        logging.debug(res.storage['ledger'][alice_address])
