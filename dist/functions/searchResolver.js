exports = async (query) => {
  
  const mongodb = context.services.get("mongodb-atlas");
  const propertyCollection = mongodb.db("Management").collection("Properties");
  const peopleCollection = mongodb.db("Management").collection("People");
  
  let properties = await propertyCollection.aggregate([
      {
        $search: {
          compound: {
            should: [
              { autocomplete: { query, path: "name" } },
              { autocomplete: { query, path: "address" } },
            ],
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: { _id: 1, name: 1, photo: 1 },
      },
    ]);
    
  return properties;
};
