import { defineStore } from "pinia";
import { useAirtable } from "@/composables/useAirtable";
const propertiesTable = useAirtable("Properties");
const detailsTable = useAirtable("Properties Details");
export const usePropertyStore = defineStore("PropertyStore", {
  state: () => ({
    properties: [],
    property: {},
    details: {},
  }),
  getters: {},
  actions: {
    async getProperties() {
      if (this.properties.length == 0) {
        let temp = [];
        await propertiesTable.select({}).eachPage((records, fetchNextPage) => {
          records.forEach((record) => {
            temp.push(record);
          });
          fetchNextPage();
        });
        this.properties = temp;
      }
    },
    getProperty(propertyId) {
      propertiesTable.find(propertyId, function (err, record) {
        if (err) throw err;
        this.property = record;
      });
      return;
    },
    getDetails(detailsId) {
      detailsTable.find(detailsId, function (err, record) {
        if (err) throw err;
        this.details = record;
      });
    },
  },
});
