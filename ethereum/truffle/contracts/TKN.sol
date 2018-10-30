pragma solidity ^0.4.18;

import "./ERC20.sol";

contract TKN is ERC20 {

    string public symbol;   // "TKN"
    string public name;     // "Token"
    uint8 public decimals;  // 18

    uint public totalSupply;
    mapping(address => uint) public balanceOf_;
    mapping(address => mapping(address => uint)) public allowance;

    constructor(string _name, string _symbol, uint8 _decimals, uint _totalSupply) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply * 10 ** uint256(_decimals);
        balanceOf_[msg.sender] = _totalSupply;
    }

    function totalSupply() public view returns (uint) {
        return totalSupply;
    }

    function balanceOf(address _address) public view returns (uint balance) {
        return balanceOf_[_address];
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        _transer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] -= _value;
        _transer(_from, _to, _value);
        return true;
    }

    function allowance(address _tokenOwner, address _spender) public view returns (uint remaining) {
        return allowance[_tokenOwner][_spender];
    }

    function approve(address _spender, uint _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function _transer(address _from, address _to, uint _value) internal {
        require(_to != 0x0);
        require(0 < _value && _value <= balanceOf_[_from]);
        balanceOf_[_from] -= _value;
        balanceOf_[_to] += _value;
        emit Transfer(_from, _to, _value);
    }

    // event Transfer(address indexed from, address indexed to, uint tokens);
    // event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

}