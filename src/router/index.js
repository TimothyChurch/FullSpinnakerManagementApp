import { createRouter, createWebHashHistory } from "vue-router";
import * as Realm from "realm-web";
import Home from "../views/Home.vue";
// Admin Routes
import AdminLayout from "../views/admin/AdminLayout.vue";
import AdminHome from "../views/admin/index.vue";
// Admin Properties Routes
import AdminPropertiesLayout from "../views/admin/properties/PropertiesLayout.vue";
import AdminPropertiesTable from "../views/admin/properties/PropertiesTable.vue";
import AdminProperty from "../views/admin/properties/[id].vue";
import AdminAddProperty from "../components/admin/forms/EditProperty.vue";
// Admin People Routes
import AdminPeople from "../views/admin/people/People.vue";
// Owner Routes
import OwnerLayout from "../views/owner/OwnerLayout.vue";
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
// Guest Routes
import GuestBook from "../views/guest/property/[id].vue";

const app = Realm.getApp("managementapp-ugznc");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminLayout,
    beforeEnter: () => {
      if (app.currentUser.customData.role !== "admin") {
        return false;
      }
    },
    children: [
      { path: "", name: "AdminHome", component: AdminHome },
      {
        path: "properties",
        name: "PropertiesLayout",
        component: AdminPropertiesLayout,
        children: [
          {
            path: "",
            name: "Properties Table",
            component: AdminPropertiesTable,
          },
          {
            path: ":id",
            name: "Property",
            component: AdminProperty,
          },
          {
            path: "new",
            name: "Add Property",
            component: AdminAddProperty,
          },
        ],
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
    path: "/owner",
    name: "Owner",
    component: OwnerLayout,
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
      {
        path: "/property/:id",
        name: "Guest Book",
        component: GuestBook,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    to.name == "Guest" ||
    to.name == "Property Report" ||
    to.name == "Guest Book"
  )
    next();
  else if (to.name !== "Home" && app.currentUser == null)
    next({ name: "Home" });
  else next();
});
export default router;
