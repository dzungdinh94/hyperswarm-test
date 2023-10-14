const hyperdht = require("hyperdht");
const db = require("../database/db");

async function initializeDHT(port, dbInstance) {
  const dhtSeed = await db.getDHTSeed(dbInstance);
  const dht = new hyperdht({
    port,
    keyPair: hyperdht.keyPair(dhtSeed),
    bootstrap: [{ host: "127.0.0.1", port: 30001 }],
  });
  await dht.ready();
  return dht;
}

module.exports = { initializeDHT };
