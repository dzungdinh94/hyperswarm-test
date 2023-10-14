const RPC = require('@hyperswarm/rpc')
const db = require("../database/db");
const { initializeDHT } = require('../dht/bootstrap');

async function startServer(){
    const dht = await initializeDHT(40001, db.dbServer);
    const rpcSeed = await db.getRPCSeed();
  
    const rpc = new RPC({ seed: rpcSeed, dht });
    const rpcServer = rpc.createServer();
    await rpcServer.listen();
    console.log('rpc server started listening on public key:', rpcServer.publicKey.toString('hex'));
    return rpcServer;
}

module.exports = startServer