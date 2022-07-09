const getMinifiedRecord = (record) => {
  console.log("here");
  return {
    id: record.id,
    fields: record.fields,
  };
};
export function minifyRecords(records) {
  let miniRecords = [];
  console.log(records);
  records.forEach((record) => {
    console.log("here");
    let temp = getMinifiedRecord(record);
    miniRecords.push(temp);
  });
  return miniRecords;
}
