const prefixes = [
    { unit: "", places: 0 },
    { unit: "K", places: 3 },
    { unit: "M", places: 6 },
    { unit: "B", places: 9}
]

const isInPlaceRange = (n, prefix) => {
    const lowerBound = Math.pow(10, prefix.places);
    const upperBound = Math.pow(10, prefix.places + 3);
    return n > lowerBound && n < upperBound;
}

const round = (n, places) => places === 0 ? n : (n / Math.pow(10, places)).toFixed(1);

export default (n) => {
    const prefix = prefixes.find((prefix) => isInPlaceRange(n, prefix));
    return round(n, prefix.places) + prefix.unit
}