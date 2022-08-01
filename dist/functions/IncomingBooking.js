exports = async function (payload) {
    const booking = JSON.parse(payload.body.text());
    const guest = booking.guest;
    
    const mongodb = context.services.get("mongodb-atlas");
    const bookingsCollection = mongodb.db("Management").collection("Bookings");
    const guestsCollection = mongodb.db("Management").collection("Guests");
    
    await bookingsCollection.updateOne(
      { "code": booking.code },
      { "$set": booking },
      { "upsert": true },
    );
    await guestsCollection.updateOne(
      { "id": guest.id },
      { "$set": guest },
      { "upsert": true }
    );
  return;
};