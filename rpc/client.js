const RPC = require("@hyperswarm/rpc");
const { initializeDHT } = require("../dht/bootstrap");
const { dbClient } = require("../database/db");

async function sendRequest(client, action, payload) {
  const payloadRaw = Buffer.from(JSON.stringify(payload));
  const respRaw = await client.request(action, payloadRaw);
  const resp = JSON.parse(respRaw.toString("utf-8"));
  return resp;
}

async function createClient(port, serverPubKey) {
  const dht = await initializeDHT(port, dbClient);
  const rpc = new RPC({ dht });
  const client = rpc.connect(serverPubKey);
  return client
}

module.exports = { sendRequest, createClient };
