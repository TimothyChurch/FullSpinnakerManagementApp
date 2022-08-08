exports = async (input) => {
  
  const mongodb = context.services.get("mongodb-atlas");
  const propertiesCollection = mongodb.db("Management").collection("Properties");
  
  await propertiesCollection.aggregate([
    {$match: {_id: input._id}},
    {$addToSet: {issues: input.issue}}
    ]);
  
  return { "hello": input.name };
};
