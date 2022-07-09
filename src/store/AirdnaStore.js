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
        rentalizerTable.select({}).eachPage((records, fetchNextPage) => {
          records.forEach((record) => {
            temp.push(record);
          });
          fetchNextPage();
        });
        this.rentalizer = temp;
      }
    },
    saveRentalizer(data) {
      const stats = JSON.stringify(data.property_stats);
      const comps = JSON.stringify(data.comps);
      rentalizerTable.create([
        {
          fields: {
            Address: data.property_details.address,
            Bedrooms: data.property_details.bedrooms,
            Bathrooms: data.property_details.bathrooms,
            Accommodates: data.property_details.accommodates,
            Lat: data.property_details.location.lat,
            Lng: data.property_details.location.lng,
            Stats: stats,
            Comps: comps,
          },
        },
      ]);
    },
  },
});
