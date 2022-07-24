exports = function(payload) {
  
    const booking = JSON.parse(payload.body.text());
    
    const mongodb = context.services.get("mongodb-atlas");
    const bookingsCollection = mongodb.db("Management").collection("Bookings");

    bookingsCollection.updateOne(
      { "id": booking.code },
      { "$set": booking },
      { "upsert": true }
    );
    return  booking;
};