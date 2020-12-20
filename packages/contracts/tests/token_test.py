from os.path import join, dirname
from unittest import TestCase
from pytezos import ContractInterface

class TokenTest(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.token = ContractInterface.create_from(join(dirname(__file__), 'token.tz'))

    def test_mint(self):
        print('todo')
