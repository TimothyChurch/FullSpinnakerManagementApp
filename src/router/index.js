import { createRouter, createWebHashHistory } from "vue-router";
// Admin Routes
import AdminLayout from "../views/admin/AdminLayout.vue";
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
// Reports Routes
import GuestLayout from "../views/guest/GuestLayout.vue";
import PropertyReport from "../views/guest/reports/property/[id].vue";

const routes = [
  {
    path: "/admin",
    name: "Admin",
    component: AdminLayout,
    children: [
      { path: "", name: "AdminHome", component: AdminHome },
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
          { path: "", name: "AirdnaHome", component: AirdnaHome },
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
  {
    path: "/guest",
    name: "Guest",
    component: GuestLayout,
    children: [
      {
        path: "/reports/property/:id",
        name: "Property Report",
        component: PropertyReport,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
