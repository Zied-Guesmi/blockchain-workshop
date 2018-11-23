1 - start geth

2 - migrate (truffle)

3 - set contract address

4 - start the front

5 - go go go !

install node, npm

install geth

geth --datadir ./datadir \
            --networkid 1337  \
            --gasprice '1' \
            --rpc --rpcaddr '0.0.0.0' --rpcport 8545 --rpcapi 'personal,db,eth,net,web3,txpool,miner' \
            --mine --minerthreads 2 \
            --unlock "d97e5e5129525f840dc38b605dab56e97d4b8283,57ca4570fe057bea16ce0f918995ad018b7504f6,12a0b79e4ce07d6df9a37727a32f53d656767838,fb5df45ddf8834b21e086f9d7a7c75c8994b91ef,e8617af9cb476f4a972ee2c3a41617350e3e0e47" \
            --rpccorsdomain "*" \
            --password password.txt