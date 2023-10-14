const { dbServer } = require("./database/db");
const { initializeDHT } = require("./dht/bootstrap");
const handleAuctionRequset = require("./rpc/auction");
const handleBidRequest = require("./rpc/bid");
const { sendRequest, createClient } = require("./rpc/client");
const { closeAuctionAndNotifyClients } = require("./rpc/notification");
const startServer = require("./rpc/server");
const Hyperswarm = require("hyperswarm");
const crypto = require("crypto");
const RPC = require("@hyperswarm/rpc");
const rpc = new RPC();

start();

async function start() {
  const swarm1 = new Hyperswarm({ seed: crypto.randomBytes(32) });
  const swarm2 = new Hyperswarm({ seed: crypto.randomBytes(32) });

  swarm1.on("connection", async function (connection, info) {
    const rpcServer = await startServer();

    handleAuctionRequset(rpcServer);
    handleBidRequest(rpcServer);

    // const client1 = await createClient(50001, rpcServer.publicKey);
    // const client2 = await createClient(60001, rpcServer.publicKey);
    // const client3 = await createClient(70001, rpcServer.publicKey);

    // const auctionData1 = {
    //   itemId: "Pic#1",
    //   startingPrice: 75,
    //   sellerId: "seller#1",
    // };
    // const auctionResp1 = await sendRequest(
    //   client1,
    //   "openAuction",
    //   auctionData1
    // );
    // const auctionData2 = {
    //   itemId: "Pic#2",
    //   startingPrice: 65,
    //   sellerId: "seller#2",
    // };
    // const auctionResp2 = await sendRequest(
    //   client2,
    //   "openAuction",
    //   auctionData2
    // );

    // const bidData = {
    //   auctionId: auctionResp1.auctionId,
    //   bidAmount: 75,
    // };
    // const bidData1 = {
    //   auctionId: auctionResp1.auctionId,
    //   bidAmount: 75.5,
    // };
    // const bidData2 = {
    //   auctionId: auctionResp1.auctionId,
    //   bidAmount: 80,
    // };

    // const closeAuctionData = {
    //   auctionId: auctionResp1.auctionId,
    // };
    // await sendRequest(client2, "bid", bidData);
    // await sendRequest(client3, "bid", bidData1);
    // await sendRequest(client2, "bid", bidData2);
    // const closeAuctionResp = await sendRequest(
    //   client1,
    //   "closeAuction",
    //   closeAuctionData
    // );
    connection.on("error", (err) => console.error("1 CONN ERR:", err));
  });
  swarm2.on("connection", async function (connection, info) {
    connection.write("Hello from Swarm 2!");
    connection.on("data", (data) => {
      console.log("swarm2", data.toString());
    });
    // const server = await startServer();

    // const response = await rpc.request(
    //   "echo",
    //   Buffer.from("hello from swarm2")
    // );

    connection.on("error", (err) => console.error("1 CONN ERR:", err));
  });

  const key = Buffer.alloc(32).fill(7);

  const discovery1 = swarm1.join(key);
  await discovery1.flushed(); // Wait for the first lookup/annnounce to complete.

  swarm2.join(key);

  // await swarm2.flush()
  // await discovery.destroy() // Stop lookup up and announcing this topic.
}
