<template>
  <!-- <input
    v-mask="{
      mask: activeMask,
      minYear,
      maxYear,
    }"
    v-model="syncModel"
    :placeholder="activeMask"
  /> -->

  <div class="form-item">
    <label>
      Date
      <span class="desc">
        '{{ activeMask.toLocaleLowerCase() }}' in range [01.01.{{ minYear }}, 01.01.{{ maxYear }}]
      </span>
    </label>
    <input
      v-mask="{
        mask: activeMask,
        minYear,
        maxYear,
      }"
      v-model="syncModel"
      :placeholder="activeMask"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const enUSMask = "MM/DD/YYYY";
const defaultMask = "DD/MM/YYYY";

const props = defineProps<{
  modelValue: string;
  minYear?: string;
  maxYear?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const activeMask = computed(() => {
  if (typeof window === "undefined") return enUSMask;
  if (navigator.language === "en-US") return enUSMask;
  return defaultMask;
});

function modelValueSerializer(value: string) {
  if (!value) return "";
  const year = value.split("-")[0]?.slice(0, 4) ?? "";
  const month = value.split("-")[1]?.slice(0, 2) ?? "";
  const day = value.split("-")[2]?.slice(0, 2) ?? "";

  if (activeMask.value === enUSMask) {
    return `${month}/${day}/${year}`;
  }

  if (activeMask.value === defaultMask) {
    return `${day}/${month}/${year}`;
  }

  return "";
}

function modelValueTransformer(value: string) {
  if (!value) return "";
  let returnString = "";
  if (activeMask.value === enUSMask) {
    const day = value.split("/")[1]?.slice(0, 2) ?? "";
    const month = value.split("/")[0]?.slice(0, 2) ?? "";
    const year = value.split("/")[2]?.slice(0, 4) ?? "";
    returnString = `${year}-${month}-${day}`;
  }

  if (activeMask.value === defaultMask) {
    const day = value.split("/")[0]?.slice(0, 2) ?? "";
    const month = value.split("/")[1]?.slice(0, 2) ?? "";
    const year = value.split("/")[2]?.slice(0, 2) ?? "";
    returnString = `${year}-${month}-${day}`;
  }

  return returnString.replace(/[^0-9-]/g, "");
}

const syncModel = computed({
  get: () => modelValueSerializer(props.modelValue),
  set: (value: string) => emit("update:modelValue", modelValueTransformer(value)),
});
</script>

<style lang="css">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
label {
  display: block;
  color: #313439;
  margin-bottom: 4px;
  font-size: 15px;
}
input {
  display: block;
  width: 100%;
  font-size: 15px;
  height: 40px;
  outline: 0;
  background-color: #fff;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
  box-shadow: none;
  padding: 0 12px;
  max-width: 300px;
}
</style>
