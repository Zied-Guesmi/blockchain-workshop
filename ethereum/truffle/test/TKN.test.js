const TKN = artifact.require('./TKN.sol')
const assert = require('assert')

let contractInstance

contract('TKN', (accounts) => {
    beforeEach(()=> {
        contractInstance = TKN.deployed()
    })

    it('should return token name', () => {
        assert.equal(contractInstance.name(), 'Token')
    })

    it('should return token symbol', () => {
        assert.equal(contractInstance.symbol(), 'TKN')
    })

    it('should return token decimals', () => {
        assert.equal(contractInstance.decimals(), 18)
    })

    it('should return total supply', () => {
        assert.equal(contractInstance.totalSupply(), 3000)
    })

    it('should return balance of address', () => {
        assert.equal(contractInstance.balanceOf(accounts[0]), '3000')
    })

})