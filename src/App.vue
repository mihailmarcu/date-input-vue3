<template>
  <date-picker v-model="modelValue" minYear="2000" maxYear="2099">
    <div class="unmasked-value desc">date: {{ modelValue }}</div>
  </date-picker>
</template>

<script setup lang="ts">
import datePicker from "./features/date-picker/date-picker.vue";
import { ref } from "vue";

const modelValue = ref<string>("");
</script>

<style lang="css">
.desc {
  margin-left: 4px;
  text-transform: none;
  font-weight: 400;
  color: rgba(49, 52, 57, 0.5);
  font-size: 12px;
}
</style>
