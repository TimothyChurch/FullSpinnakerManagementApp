exports = async function (payload) {
    // const booking = JSON.parse(payload.body.text());
    const booking = payload;
    
    const mongodb = context.services.get("mongodb-atlas");
    const propertyCollection = mongodb.db("Management").collection("Properties");
    
    if(!booking.listing.hasOwnProperty("property_id")) {
      propertyCollection.insertOne({bookings: booking});
    } else {
      const idString = Math.trunc(booking.listing.property_id.$numberDouble).toString();
  
      const property = await propertyCollection.findOne(
        { pms: idString }
        );
      
      if (!property) {
        const propertyToWrite = {
          name: booking.listing.name,
          lat: booking.listing.lat,
          lng: booking.listing.lng,
          pms: Math.trunc(booking.listing.property_id.$numberDouble).toString(),
          bookings: booking,
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
    }
  return;
};