const { Bid } = require("../models/bid");
const crypto = require("crypto");
async function handleBidRequest(rpcServer) {
  rpcServer.respond("bid", async (reqRaw) => {
    const req = JSON.parse(reqRaw.toString("utf-8"));
    const bidderId = crypto.randomBytes(16).toString("hex");

    const auctionId = req.auctionId;
    const bidAmount = req.bidAmount;

    const bid = new Bid(auctionId, bidderId, bidAmount);
    await bid.save();

    return Buffer.from(
      JSON.stringify({ status: "Bid placed successfully" }),
      "utf-8"
    );
  });
}
module.exports = handleBidRequest;