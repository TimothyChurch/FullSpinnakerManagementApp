exports = async function (payload) {
    const booking = JSON.parse(payload.body.text());
    // Pharsing key data points
    booking.start_date = new Date(booking.start_date);
    booking.end_date = new Date(booking.end_date);
    const idString = Math.trunc(booking.listing.property_id).toString();
    
    // Connect to properties database
    const mongodb = context.services.get("mongodb-atlas");
    const propertyCollection = mongodb.db("Management").collection("Properties");
    const bookingCollection = mongodb.db("Management").collection("Bookings");
    
    // Does property/booking exist? Update/Create it
    await bookingCollection.updateOne({code: booking.code}, {$set: booking}, {upsert: true});
    const insertedBooking = await bookingCollection.findOne({code: booking.code});
    
    const property = await propertyCollection.findOne(
      { pms: idString }
      );
    
    if (!property) {
      const propertyToWrite = {
        name: booking.listing.name,
        lat: booking.listing.lat,
        lng: booking.listing.lng,
        photo: booking.listing.picture_url,
        address: booking.listing.address,
        pms: Math.trunc(booking.listing.property_id).toString(),
        bookings: [insertedBooking._id],
      };
      await propertyCollection.insertOne(propertyToWrite);
      return;
    } 
    property.bookings.push(insertedBooking._id);
    await propertyCollection.updateOne({pms: idString}, {$set: {bookings: property.bookings}}, {upsert: true});
  
};