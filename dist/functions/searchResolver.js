exports = async (input) => {
  
  const mongodb = context.services.get("mongodb-atlas");
  const propertyCollection = mongodb.db("Management").collection("Properties");
  const peopleCollection = mongodb.db("Management").collection("People");
  
  let properties = await propertyCollection.aggregate([
    {
      $search: {
        compound: {
          should: [
            { autocomplete: { input, path: "name" } },
            { autocomplete: { input, path: "address" } },
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
  
  let people = await peopleCollection.aggregate([
      {
        $search: {
          autocomplete: { input, path: "name" },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: { _id: 1, name: 1 },
      }
    ]);
    
  return (properties, people);
};
