pragma solidity ^0.4.24;

import "./ERC20.sol";

contract TKN is ERC20 {

    string public constant symbol       = "TKN";
    string public constant name         = "Token";
    uint8 public constant decimals      = 18;
    uint private constant _totalSupply  = 3000 * 10 ** uint(decimals);

    mapping(address => uint) internal balances;
    mapping(address => mapping(address => uint)) internal allowed;

    // event Transfer(address indexed from, address indexed to, uint tokens);
    // event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

    constructor() public {
        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address _address) public view returns (uint) {
        return balances[_address];
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        require(_value <= allowed[_from][msg.sender]);
        allowed[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint remaining) {
        return allowed[_owner][_spender];
    }

    function _transfer(address _from, address _to, uint _value) internal {
        require(_to != 0);
        require(_to != _from);
        require(0 < _value && _value <= balances[_from]);

        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
    }

}