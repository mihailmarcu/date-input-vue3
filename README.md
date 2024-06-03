# Vue 3 Date Input Component

## Description

This Vue 3 component provides a date input field with a dynamic mask that changes based on the browser locale. If the browser locale is `en_US`, the input mask is `MM/DD/YYYY`. For any other locale, the input mask is `DD/MM/YYYY`. The component ensures that the input is always a valid date and binds the value to the `v-model` in the format `YYYY-MM-DD`.

## Features

- **Locale-Based Masking**: Changes the input mask based on the browser locale.
- **Date Validation**: Ensures the input is a valid date.
- **v-model Binding**: Always binds the value in the format `YYYY-MM-DD`.
- **Vue 3 Composition API**: Utilizes the Composition API for a modern and clean code structure.
- **SSR Friendly**: Compatible with server-side rendering.
- **TypeScript**: Written in TypeScript for type safety and better development experience.

## Installation

To use this component, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/mihailmarcu/date-input-vue3.git
   cd date-input-vue3
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the project**:
   ```sh
   npm run dev
   ```

## Usage

To use the component in your Vue 3 project, follow these steps:

1. **Import and register the component**:

   ```vue
   <template>
     <date-picker v-model="modelValue" />
   </template>

   <script setup lang="ts">
   import { ref } from "vue";
   import datePicker from "@/components/DateInput.vue";

   const modelValue = ref<string>("");
   </script>
   ```

## Directives

### v-mask

The `v-mask` directive applies the date mask to the input field. It validates the input to ensure only valid dates are allowed.

## Testing

Three tests are included to ensure the component functions correctly:

1. **Locale-based Masking**: Tests if the mask changes based on the browser locale.
2. **Date Validation**: Ensures only valid dates can be entered.
3. **v-model Binding**: Verifies that the `v-model` binding is always in the `YYYY-MM-DD` format.

### Running Tests

To run the tests, use the following command:

```sh
npm run test
```
