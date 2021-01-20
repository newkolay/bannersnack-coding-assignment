export default function getShortUnitName(unit: string): string {
  switch (unit) {
    case "metric":
      return "°C";
    case "imperial":
      return "°F";
    case "kelvin":
      return "K";
    default:
      return "";
  }
}
