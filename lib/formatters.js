const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/**
 * Format numeric values to USD currency strings (e.g., $1,250.00 or $0.00).
 * Safely handles null, undefined, strings, and NaN by falling back to $0.00.
 *
 * @param {number|string|null|undefined} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || amount === "") {
    return "$0.00";
  }

  const numeric = typeof amount === "number" ? amount : Number(amount);
  if (Number.isNaN(numeric) || !Number.isFinite(numeric)) {
    return "$0.00";
  }

  return currencyFormatter.format(numeric);
}

/**
 * Formats dates and timestamps into readable strings (e.g., Oct 24, 2026).
 * Gracefully handles ISO strings, Date instances, and timestamp strings.
 *
 * @param {Date|string|number|null|undefined} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return "-";

  try {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
      return String(dateInput);
    }
    return dateFormatter.format(date);
  } catch {
    return String(dateInput);
  }
}

/**
 * Formats large numbers compactly for chart axes or badge metrics (e.g., 1K, 2.5K).
 *
 * @param {number|string|null|undefined} num
 * @returns {string}
 */
export function formatCompactNumber(num) {
  if (num === null || num === undefined || num === "") {
    return "0";
  }

  const numeric = typeof num === "number" ? num : Number(num);
  if (Number.isNaN(numeric) || !Number.isFinite(numeric)) {
    return "0";
  }

  return compactNumberFormatter.format(numeric);
}
