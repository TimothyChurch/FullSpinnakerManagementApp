import { defineStore } from "pinia";
import { useAirtableAirdna } from "@/composables/useAirtable";
const rentalizerTable = useAirtableAirdna("Rentalizer");

export const useAirdnaStore = defineStore("AirdnaStore", {
  state: () => ({
    rentalizer: [],
  }),
  getters: {},
  actions: {
    async getRentalizerReports() {
      if (this.rentalizer.length == 0) {
        let temp = [];
        await rentalizerTable.select({}).eachPage((records, fetchNextPage) => {
          records.forEach((record) => {
            temp.push(record);
          });
          fetchNextPage();
        });
        this.rentalizer = temp;
      }
    },
    async getRentalizerReport(id) {
      const report = this.rentalizer.find((report) => report.id === id);
      return report;
    },
    saveRentalizer(data) {
      const dataStr = JSON.stringify(data);
      rentalizerTable.create([
        {
          fields: {
            Address: data.property_details.address,
            Bedrooms: data.property_details.bedrooms,
            Bathrooms: data.property_details.bathrooms,
            Accommodates: data.property_details.accommodates,
            Lat: data.property_details.location.lat,
            Lng: data.property_details.location.lng,
            JSON: dataStr,
          },
        },
      ]);
    },
  },
});
