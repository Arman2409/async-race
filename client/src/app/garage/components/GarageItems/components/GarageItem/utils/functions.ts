export const roundToPrecision = (number:number, precision:number) => {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}