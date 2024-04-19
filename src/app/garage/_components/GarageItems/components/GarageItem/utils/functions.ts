export const roundToPrecision = (
    number: number,
    precision: number): number => {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}