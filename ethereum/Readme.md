
## Requirements

- nodejs
- npm


## Installation

    # install truffle
    $ npm install -g truffle

    # install ganache-cli
    $ npm install -g ganache-cli


## Start ganache

    $ ganache-cli -p 8545 &> ganache.log &


## Deploy smart contract to the chain
copy & paste the code into contracts/TKN.sol

    $ truffle migrate --network dev


## Set contract address
Change the contract address in the main.js file (line 18)


## Open the ui
Open the index.html file and start trading tokens !!


## Install ethreum-go client (geth)

    # init geth
    geth --datadir ./datadir init ./genesis.json

    # create accounts
    geth --datadir ./datadir account new --password ./password.txt

    # start the node
    geth --datadir ./datadir \
        --networkid 1337  \
        --gasprice '1' \
        --rpc --rpcaddr '0.0.0.0' --rpcport 8545 --rpcapi 'personal,db,eth,net,web3,txpool,miner' \
        --mine --minerthreads 2 \
        --unlock "d97e5e5129525f840dc38b605dab56e97d4b8283,57ca4570fe057bea16ce0f918995ad018b7504f6,12a0b79e4ce07d6df9a37727a32f53d656767838,fb5df45ddf8834b21e086f9d7a7c75c8994b91ef,e8617af9cb476f4a972ee2c3a41617350e3e0e47" \
        --rpccorsdomain "*" \
        --password password.txt
