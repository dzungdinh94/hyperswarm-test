const { dbClient } = require("../database/db");

class Bid {
  constructor(auctionId, bidderId, amount) {
    this.auctionId = auctionId;
    this.bidderId = bidderId;
    this.amount = amount;
    this.status = 'active';
  }

  async save() {
    if (await isBidCancelled(this.auctionId, this.bidderId)) {
      throw new Error("Cannot place a bid after cancelling.");
    }
    await dbClient.put(`bid:${this.auctionId}:${this.amount}:${this.bidderId}`, this);
  }
}

async function getBid(auctionId, bidderId) {
  const stream = dbClient.createReadStream({
    gte: `bid:${auctionId}:`,
    lte: `bid:${auctionId}:\xff`
  });

  for await (const data of stream) {
    if (data.value.bidderId === bidderId) {
      return data.value;
    }
  }
}

async function getHighestBid(auctionId) {
    let highestBid = null;
    const bidStream = dbClient.createReadStream({
        gte: `bid:${auctionId}:`,
        lte: `bid:${auctionId}:\xff`,
    });

    for await (const record of bidStream) {
        try{
          const bid = record.value
          console.log(bid)
          if (!highestBid || bid.amount > highestBid.amount) {
              highestBid = bid;
          }
        }catch(err){
          console.log(err);
        }
  
    }

    return highestBid;

}

async function isBidCancelled(auctionId, bidderId) {
  const bid = await getBid(auctionId, bidderId);
  return bid && bid.status === 'cancelled';
}

module.exports = {
  Bid,
  getBid,
  getHighestBid,
  isBidCancelled
};
