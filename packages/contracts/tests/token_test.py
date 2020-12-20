from os.path import join, dirname
from unittest import TestCase
from decimal import Decimal
from pytezos.crypto import Key
from pytezos import ContractInterface

alice = Key.from_encoded_key(
    'edskS3LMw4BFQjbutGWtLG9MtPhcoSsR6BfkLzrHhf5ZB36TfVqQsDxUXkrLaj6tULpoSnyWDF5HsNZvLJv2wL7W6YAahZPqwa')
bob = Key.from_encoded_key(
    'edskRqA1izJkgC8BAzXSnbhtcJdmZqN9YLDHLm7t4SLcVfds4hNGESLK6MH4Fvi8V4sviwMLyDbLRSenQscR4vJUMcoCAT7Pjm')

alice_address = alice.public_key_hash()
bob_address = bob.public_key_hash()

total_supply = 10000000
total_staked = 0
reward_per_share = 0
last_update_time = 0
initial_storage = {
    'totalSupply': total_supply,
    'totalStaked': total_staked,
    'rewardPerShare': reward_per_share,
    'lastUpdateTime': last_update_time,
    'ledger': {
        alice_address: {
            'balance': total_supply,
            'staked': total_staked,
            'lastRewardPerShare': reward_per_share,
            'allowances': {},
        },
    },
}

class TokenTest(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.token = ContractInterface.create_from(join(dirname(__file__), './../build/token.tz'))
        cls.maxDiff = None

    def test_transfer_tokens(self):
        print("todo")
        # res = self.token \
        #     .transfer(alice.public_key_hash(), bob.public_key_hash(), 1000000) \
        #     .result(storage=initial_storage, sender=alice_address)

        # self.assertEqual(0, res.storage['lastUpdateTime'])
