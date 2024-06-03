import { createApp } from "vue";
import App from "./App.vue";
import mask from "./features/date-picker/directive";

const app = createApp(App);
app.directive("mask", mask);
app.mount("#app");
