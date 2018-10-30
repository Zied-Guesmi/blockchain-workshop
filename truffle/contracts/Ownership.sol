pragma solidity ^0.4.18;

contract Ownership {
    
    mapping(uint => address) private assets;

    event ownerChangedEvent(address oldOwner, address newOwner);

    constructor() public {}
    
    function addAsset(uint id) public {
        assets[id] = msg.sender;
    }

    function getAssetOwner(uint id) public view returns (address) {
        return assets[id];
    }

    function changeAssetOwner(uint id, address newOwner) public {
        require(assets[id] == msg.sender);
        assets[id] = newOwner;
    }
}
    /**
    * The withdraw function, following the withdraw pattern shown and explained here:
    * http://solidity.readthedocs.io/en/develop/common-patterns.html#withdrawal-from-contracts
    */
    // function withdraw() public {
    //     require(gameFinished && theWinner == msg.sender);

    //     uint amount = gains;

    //     gains = 0;
    //     msg.sender.transfer(amount);
    // }