exports = async function (payload) {
    const booking = JSON.parse(payload.body.text());
    
    // Pharsing key data points
    booking.start_date = new Date(booking.start_date);
    booking.end_date = new Date(booking.end_date);
    const idString = Math.trunc(booking.listing.property_id).toString();
    
    // Connect to properties database
    const mongodb = context.services.get("mongodb-atlas");
    const propertyCollection = mongodb.db("Management").collection("Properties");
    
    
    // Does property/booking exist? Update/Create it
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
        bookings: [booking],
      };
      await propertyCollection.insertOne(propertyToWrite);
      return;
    }
    
    if (!property.bookings) {
      property.bookings = booking;
    } else {
      const index = property.bookings.findIndex(b => {
        if (b.code === booking.code) {
          return true;
        } else {
          return false;
        }
      });
      
      if (index == -1) {
        property.bookings.push(booking);
      } else {
        property.bookings[index] = booking;
      }
    }
    await propertyCollection.updateOne(
      {_id: property._id},
      { $set: {bookings: property.bookings}}
    );
  return;
};