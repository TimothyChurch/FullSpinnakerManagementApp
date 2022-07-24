exports = function (payload) {
    const res = JSON.parse(payload.body.text());
    // const res = payload;
    
    // const { guest, listing, ...booking } = res;
    // console.log(guest);
    const mongodb = context.services.get("mongodb-atlas");
    const bookingsCollection = mongodb.db("Management").collection("Bookings");
    const guestsCollection = mongodb.db("Management").collection("Guests");
    const propertiesCollection = mongodb.db("Management").collection("Properties");
    let listingFlag = false;
    let guestFlag = false;
    let bookingFlag = false;
    bookingsCollection.insertOne(res)
    // async () => { 
    //   listing._id = await propertiesCollection.findOne({ "pms": listing.property_id },{ "_id": 1 });
    //   if(!listing._id) {
    //     listingFlag = true;
    //     listing._id = ObjectId();
    //   }
    //   guest._id = await guestsCollection.findOne({ "id": guest.id }, { "_id": 1 });
    //   if(!guest._id) {
    //     guestFlag = true;
    //     guest._id = ObjectId();
    //   }
    //   booking_id = await bookingsCollection.findOne({ "id": booking.id }, { "_id": 1 });
    //   if (!booking._id) {
    //     bookingFlag = true;
    //     booking._id = ObjectId();
    //     booking.guest = guest._id;
    //     booking.listing = listing._id;
    //   }
      
    //   if (listingFlag) {
    //     listing.bookings = [booking._id];
    //     await propertiesCollection.insertOne(listing);
    //   } else {
    //     await propertiesCollection.aggregate([
    //       { "$match": {"_id": listing._id}},
    //       { "$addToSet": { "bookings": booking._id}}
    //     ]);
    //   }
      
    //   if (guestFlag) {
    //     guest.bookings = [booking._id];
    //     await guestsCollection.insertOne(guest);
    //   } else {
    //     await guestsCollection.aggregate([
    //       { "$match": {"_id": guest._id }},
    //       { "$addToSet": {"bookings": booking._id}},
    //     ]);
    //   }
      
    //   if (bookingFlag) {
    //     await bookingsCollection.insertOne(booking);
    //   } else {
    //     await bookingsCollection.updateOne(
    //       {"_id": booking._id},
    //       {"$set": booking},
    //       {"upsert": true}
    //     );
    //   }
    //   return;
    // };
    
  return  res;
}