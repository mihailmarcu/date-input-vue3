import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import mask from "./directive";
import Component from "./date-picker.vue";

describe("Directive: mask", () => {
  it("should format the value to DD/MM/YYYY correctly", async () => {
    const wrapper = mount(Component, {
      props: { modelValue: "2023-05-31" },
      global: {
        directives: {
          mask,
        },
      },
    });

    const input = wrapper.find("input");
    await input.setValue("05312023");

    expect(input.element.value).toBe("05/31/2023");
  });

  it("should not allow invalid dates", async () => {
    const wrapper = mount(Component, {
      props: { modelValue: "" },
      global: {
        directives: {
          mask,
        },
      },
    });

    const input = wrapper.find("input");
    await input.setValue("32132023");

    expect(input.element.value).toBe("");
  });

  it("should handle different date formats based on locale", async () => {
    const wrapper = mount(Component, {
      props: { modelValue: "2023-12-25" },
      global: {
        directives: {
          mask,
        },
      },
    });

    const input = wrapper.find("input");

    Object.defineProperty(window.navigator, "language", {
      value: "en-US",
      configurable: true,
    });

    await input.setValue("12252023");

    expect(input.element.value).toBe("12/25/2023");
  });
});
