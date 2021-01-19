const prefixes = [
  { unit: "", places: 0 },
  { unit: "K", places: 3 },
  { unit: "M", places: 6 },
  { unit: "B", places: 9 },
];

const isInPlaceRange = (n, prefix) => {
  if (n === 0 && prefix.unit === "") {
    return true;
  }
  const lowerBound = Math.pow(10, prefix.places);
  const upperBound = Math.pow(10, prefix.places + 3);
  return n > lowerBound && n < upperBound;
};

const round = (n, places) =>
  places === 0 ? n : (n / Math.pow(10, places)).toFixed(1);

export default (n) => {
  if (!n) {
    return 0;
  }
  const prefix = prefixes.find((prefix) => isInPlaceRange(n, prefix));
  if (!prefix) {
    return 0;
  }
  return round(n, prefix.places) + prefix.unit;
};
