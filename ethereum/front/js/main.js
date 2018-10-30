"use strict";

window.onload = init;

document.getElementById("transfer").addEventListener("submit", function(event) {
    event.preventDefault();
    sendToken();
})

const web3 = setupWeb3();
console.log(web3)
const contract = loadContractFromAddress("0x23c5243787c606bb24bf6998ecb4f80d95c3c32c");
// console.log("contract loaded");

function init() {
    loadTokenInfos();
    loadAccountsAndBalances();
}

function setupWeb3() {
    let web3;
    if (typeof web3 === 'undefined') {
        return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    } else {
        return new Web3(web3.currentProvider);
    }
}

function loadContractFromAddress(address) {
    const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf_",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_tokenOwner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "remaining",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_name",
                    "type": "string"
                },
                {
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "name": "_decimals",
                    "type": "uint8"
                },
                {
                    "name": "_totalSupply",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "tokens",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "tokenOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "tokens",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        }
    ];    
    const contract = web3.eth.contract(abi);
    return contract.at(address);
}

function loadTokenInfos() {
    document.getElementById("tkn-name").innerHTML = contract.name()
    document.getElementById("tkn-symbol").innerHTML = contract.symbol()
    document.getElementById("tkn-supply").innerHTML = contract.totalSupply()
    document.getElementById("block-number").innerHTML = web3.eth.blockNumber;
}

function loadAccountsAndBalances() {
    let accounts = web3.eth.accounts;
    let html = '';
    for (const account of accounts) {
        html += `<fieldset>
            <div style="color: black">${account}</div>
            <input placeholder="${balanceOf(account)}" type="text" readonly>
        </fieldset>`;
    }
    document.getElementById('accounts').innerHTML += html;    
}

function sendToken()  {
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let amount = parseInt(document.getElementById('amount').value);
    let password = document.getElementById('password').value;
    transfer(from, to, amount);
    // web3.personal.unlockAccount(from, password, 60, (err, res) => {
    //     transfer(from, to, amount);
    // });
}

function balanceOf(address) {
    return contract.balanceOf(address).c[0];
}

function transfer(from, to, amount) {
    console.log(balanceOf(to));
    let tx = contract.transfer(to, amount);
}

function handleError(err) {
    console.log('error: ')
    console.log(err)
    return;
}

