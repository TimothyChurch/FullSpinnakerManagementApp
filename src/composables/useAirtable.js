import airtable from "airtable";

const url = "https://api.airtable.com";
const key = "keyuUbgDR5JLrTBJq";

var Airtable = airtable;
Airtable.configure({
  endpointUrl: url,
  apiKey: key,
});

export function useAirtable(table) {
  var base = Airtable.base("appuRWHocoOP3cGKz");
  const records = base(table);
  return records;
}

export function useAirtableAirdna(table) {
  var base = Airtable.base("appvu7q9vJY5wrEdp");
  const records = base(table);
  return records;
}
