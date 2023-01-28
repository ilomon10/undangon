import unitsCss from "units-css";

export const ProcessUnitForViewport = (raw, viewport) => {
  if (!raw) return raw;
  const { value, unit } = unitsCss.parse(raw);
  if (unit === "vh") {
    return (value / 100) * viewport;
  }
  return raw;
};