exports = async (input) => {
  
  const mongodb = context.services.get("mongodb-atlas");
  const propertiesCollection = mongodb.db("Management").collection("Properties");
  
  const temp = await propertiesCollection.updateOne(
    {_id: input._id},
    {$addToSet: {issues: input.issue}}
    );
  
  return temp
  
};
