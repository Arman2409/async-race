export const getRectDegrees = ():number[] => {
    const rotateDegrees = [];
    for (let i = 0; i < 6; i++) {
        rotateDegrees.push(i * 55);
    }
    return rotateDegrees;
}