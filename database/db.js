const Hypercore = require("hypercore");
const Hyperbee = require("hyperbee");
const crypto = require("crypto");

const feedServer = new Hypercore("./rpc-server", { valueEncoding: "json" });
const dbServer = new Hyperbee(feedServer, { keyEncoding: "utf-8", valueEncoding: "json" });

const feedClient = new Hypercore("./rpc-client", { valueEncoding: "json" });
const dbClient = new Hyperbee(feedClient, { keyEncoding: "utf-8", valueEncoding: "json" });

async function getDHTSeed(db) {
  let dhtSeedValue = (await db.get("dht-seed"))?.value;
  if (!dhtSeedValue) {
    dhtSeedValue = crypto.randomBytes(32);
    await db.put("dht-seed", dhtSeedValue);
    return dhtSeedValue
  }
  return Buffer.from(dhtSeedValue);;
}

async function getRPCSeed() {
  let rpcSeed = (await dbServer.get("rpc-seed"))?.value;
  if (!rpcSeed) {
    rpcSeed = crypto.randomBytes(32);
    await dbServer.put("rpc-seed", rpcSeed);
    return rpcSeed
  }
  return Buffer.from(rpcSeed);
}
module.exports = {
  getDHTSeed,
  getRPCSeed,
  dbServer,
  dbClient
};
