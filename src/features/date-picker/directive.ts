import type { Directive, DirectiveBinding } from "vue";

interface MaskBinding {
  mask: string;
  minYear?: string;
  maxYear?: string;
}

function formatValue(value: string, mask: string) {
  const separator = "/";

  if (mask === "DD/MM/YYYY" || mask === "MM/DD/YYYY") {
    let formattedValue = value.slice(0, 2);
    if (value.length > 2) formattedValue += separator + value.slice(2, 4);
    if (value.length > 4) formattedValue += separator + value.slice(4, 8);
    return formattedValue;
  }
  return value;
}

const mask: Directive = {
  mounted(el, binding: DirectiveBinding<MaskBinding>) {
    el.addEventListener("input", () => {
      const newValue = formatValue(
        el.value.replace(/\D/g, ""),
        binding.value.mask
      );
      el.value = isValidPartialDate(newValue, binding.value)
        ? (el._lastValidValue = newValue)
        : el._lastValidValue || "";
    });

    el._lastValidValue = "";
  },
  updated: (el) => el.dispatchEvent(new Event("input")),
};

function isValidPartialDate(value: string, directiveOptions: MaskBinding) {
  const parts = value.split("/");

  const { mask: format, minYear, maxYear } = directiveOptions;

  let dayPart = format === "DD/MM/YYYY" ? parts[0] : parts[1];
  let monthPart = format === "DD/MM/YYYY" ? parts[1] : parts[0];
  let yearPart = parts[2];

  const day = parseInt(dayPart || "0", 10);
  const month = parseInt(monthPart || "0", 10);
  const year = parseInt(yearPart || "0", 10);

  if (dayPart === "00" || monthPart === "00" || yearPart === "0") return false;

  if (dayPart && (day < 0 || day > 31)) return false;
  if (monthPart && (month < 0 || month > 12)) return false;
  if (yearPart && (year < 0 || yearPart.length > 4)) return false;

  if (yearPart) {
    if (minYear && minYear.length === 4) {
      for (let i = 0; i < 4; i++) {
        if (minYear[i] > yearPart[i]) return false;
      }
    }

    if (maxYear && maxYear.length === 4) {
      for (let i = 0; i < 4; i++) {
        if (maxYear[i] < yearPart[i]) return false;
      }
    }
  }

  if (dayPart && !/^(0|1|2|3)/.test(dayPart)) return false;
  if (monthPart && !/^(0|1)/.test(monthPart)) return false;

  if (dayPart && monthPart) {
    if (
      (month === 2 && day > (isLeapYear(year) ? 29 : 28)) ||
      ([4, 6, 9, 11].includes(month) && day > 30)
    ) {
      return false;
    }
  }

  return true;
}

function isLeapYear(year: number) {
  if (String(year).length < 4) return true;
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  if (year % 400 !== 0) return false;
  return true;
}

export default mask;
