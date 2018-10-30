// var ERC20 = artifacts.require("./ERC20.sol");
var TKN = artifacts.require("./TKN.sol");

module.exports = function(deployer) {
  return deployer.deploy(TKN, "Token", "TKN", 18, 30000000)
    .then(() => TKN.deployed())
    .then(instance => {
      console.log("TKN deployed at address: " + instance.address);
    })
};