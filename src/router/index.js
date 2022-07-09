import { createRouter, createWebHashHistory } from "vue-router";
// Admin Routes
import Admin from "../views/admin/Admin.vue";
import AdminHome from "../views/admin/AdminHome.vue";
import AdminProperties from "../views/admin/properties/Properties.vue";
import AdminProperty from "../views/admin/properties/[id].vue";
import AdminPeople from "../views/admin/people/People.vue";
// AirDNA Routes
import Airdna from "../views/admin/airdna/Airdna.vue";
import AirdnaHome from "../views/admin/airdna/AirdnaHome.vue";
import Rentalizer from "../views/admin/airdna/Rentalizer.vue";
import MonthlyAdr from "../views/admin/airdna/MonthlyAdr.vue";
import DailyRates from "../views/admin/airdna/DailyRates.vue";
import FutureRates from "../views/admin/airdna/FutureRates.vue";

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      { path: "", name: "Home", component: AdminHome },
      {
        path: "properties",
        name: "Properties",
        component: AdminProperties,
      },
      {
        path: "properties/:id",
        name: "Property",
        component: AdminProperty,
      },
      { path: "people", name: "People", component: AdminPeople },
      {
        path: "airdna",
        name: "airdna",
        component: Airdna,
        children: [
          { path: "", name: "Home", component: AirdnaHome },
          { path: "rentalizer", name: "Rentalizer", component: Rentalizer },
          { path: "monthly_adr", name: "Monthly ADR", component: MonthlyAdr },
          { path: "daily_rates", name: "Daily Rates", component: DailyRates },
          {
            path: "future_rates",
            name: "Future Rates",
            component: FutureRates,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
