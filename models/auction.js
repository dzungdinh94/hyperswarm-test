const { dbClient } = require("../database/db");


class Auction {
  constructor(itemId, sellerId, startingPrice) {
    this.itemId = itemId;
    this.sellerId = sellerId;
    this.startingPrice = startingPrice;
    this.status = 'pending';
  }

  async save() {
    const timestamp = Date.now();
    await dbClient.put(`auction:${this.itemId}:${this.sellerId}:${timestamp}`, this);
  }

  async open() {
    this.status = 'open';
    await this.save();
  }

  async close() {
    this.status = 'closed';
    await this.save();
  }
}

async function getAuction(itemId) {
  return await dbClient.get(`auction:${itemId}`);
}

module.exports = {
  Auction,
  getAuction
};
