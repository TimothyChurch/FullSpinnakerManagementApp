import "primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "../node_modules/prismjs/themes/prism-coy.css";
import "./assets/styles/demo/flag.css";

import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import BadgeDirective from "primevue/badgedirective";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Carousel from "primevue/carousel";
import Checkbox from "primevue/checkbox";
import Chip from "primevue/chip";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";
import Galleria from "primevue/galleria";
import InlineMessage from "primevue/inlinemessage";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Knob from "primevue/knob";
import Menu from "primevue/menu";
import Message from "primevue/message";
import MultiSelect from "primevue/multiselect";
import Password from "primevue/password";
import ProgressBar from "primevue/progressbar";
import RadioButton from "primevue/radiobutton";
import Rating from "primevue/rating";
import Ripple from "primevue/ripple";
import Sidebar from "primevue/sidebar";
import Slider from "primevue/slider";
import StyleClass from "primevue/styleclass";
import TabMenu from "primevue/tabmenu";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";
import ToggleButton from "primevue/togglebutton";
import Tooltip from "primevue/tooltip";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import "./registerServiceWorker";
import router from "./router";

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .component("Accordion", Accordion)
  .component("AccordionTab", AccordionTab)
  .component("Avatar", Avatar)
  .component("AvatarGroup", AvatarGroup)
  .component("Badge", Badge)
  .component("Button", Button)
  .component("Calendar", Calendar)
  .component("Carousel", Carousel)
  .component("Checkbox", Checkbox)
  .component("Chip", Chip)
  .component("Dialog", Dialog)
  .component("Divider", Divider)
  .component("Dropdown", Dropdown)
  .component("FileUpload", FileUpload)
  .component("Galleria", Galleria)
  .component("InlineMessage", InlineMessage)
  .component("InputMask", InputMask)
  .component("InputNumber", InputNumber)
  .component("InputSwitch", InputSwitch)
  .component("InputText", InputText)
  .component("Knob", Knob)
  .component("Menu", Menu)
  .component("Message", Message)
  .component("MultiSelect", MultiSelect)
  .component("Password", Password)
  .component("ProgressBar", ProgressBar)
  .component("RadioButton", RadioButton)
  .component("Rating", Rating)
  .component("Sidebar", Sidebar)
  .component("Slider", Slider)
  .component("TabMenu", TabMenu)
  .component("TabPanel", TabPanel)
  .component("TabView", TabView)
  .component("Tag", Tag)
  .component("Textarea", Textarea)
  .component("ToggleButton", ToggleButton)
  .component("Toast", Toast)

  .directive("badge", BadgeDirective)
  .directive("tooltip", Tooltip)
  .directive("ripple", Ripple)
  .directive("styleclass", StyleClass)
  .mount("#app");
