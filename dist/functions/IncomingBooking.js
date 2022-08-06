exports = async function (payload) {
    const booking = JSON.parse(payload.body.text());
    const guest = booking.guest;
    
    const mongodb = context.services.get("mongodb-atlas");
    const propertyCollection = mongodb.db("Management").collection("Properties");
    
    const property = await propertyCollection.findOne({
      query: { "pms": booking.listing.property_id.toString()},
      projection: { _id: 1, bookings: 1 }
    });
    
    if (property.bookings) {
      if (property.bookings.some((b, index) => b.listing.property_id == booking.listing.property_id.toString())) {
        property.bookings[index] = booking;
      } else {
        property.bookings.push(booking);
      }
    } else {
      property.bookings = [booking];
    }
    
    await propertyCollection.updateOne({
      filter: {_id: property._id},
      update: {bookings: property.bookings}
    });
    
  return;
};