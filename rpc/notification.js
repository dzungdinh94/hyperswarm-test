async function closeAuctionAndNotifyClients(client, payload) {
    const payloadRaw = Buffer.from(JSON.stringify(payload));

    await client.request('NOTIFICATION', payloadRaw);

}
module.exports = { closeAuctionAndNotifyClients };
