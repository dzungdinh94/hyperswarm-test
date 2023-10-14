const { Auction } = require("../models/auction");
const crypto = require("crypto");
const { getHighestBid } = require("../models/bid");
function handleAuctionRequset(rpcServer) {
  rpcServer.respond("openAuction", async (reqRaw) => {

    try {
      const req = JSON.parse(reqRaw.toString("utf-8"));
      const auctionId = crypto.randomBytes(16).toString("hex");
      const itemId = req.itemId;
      const startingPrice = req.startingPrice;
      const sellerId = req.sellerId;
      const newAuction = new Auction(itemId, sellerId, startingPrice);
      await newAuction.open();

      return Buffer.from(JSON.stringify({ success: true, auctionId }), "utf-8");
    } catch (err) {
      console.log(err);
      return Buffer.from(JSON.stringify({ success: false }), "utf-8");
    }
  });

  rpcServer.respond("closeAuction", async (reqRaw) => {
    const req = JSON.parse(reqRaw.toString("utf-8"));
    const auctionId = req.auctionId;
    const highestBid = await getHighestBid(auctionId);

    if (!highestBid) {
        console.log('No bids were placed for this auction.');
        return;
    }
    console.log('Highest Bid:', highestBid.amount, 'by', highestBid.bidderId);

    const notificationPayload = {
        type: 'AUCTION_CLOSED',
        highestBidder: highestBid.bidderId,
        highestAmount: highestBid.amount
    };

    return Buffer.from(JSON.stringify(notificationPayload), 'utf-8');
  });
}
module.exports = handleAuctionRequset;
