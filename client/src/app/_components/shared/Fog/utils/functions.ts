import type { Variants } from "framer-motion";

const getRandomNumberPx = (min: number, max: number):string => {
  return Math.floor(Math.random() * (max - min + 1)) + min + "px";
}

const getRandomBorderRadius = ():string => {
  return `${getRandomNumberPx(0, 15)} ${getRandomNumberPx(0, 15)} ${getRandomNumberPx(0, 15)} ${getRandomNumberPx(0, 15)}`
}

const getFogVariants = (order: number): Variants => ({
  initial: {
    left: getRandomNumberPx(2.5, 17.5),
    top: getRandomNumberPx(order * 5, order * 5 + 5),
  },
  animate: {
    width: getRandomNumberPx(3, 7),
    height: getRandomNumberPx(3, 7),
    borderRadius: getRandomBorderRadius(),
    transition: {
      duration: 1,
      repeat: Infinity,
    }
  }
});

export const getAllVariants = () => {
  const allVariants: Variants[] = [];
  for (let i = 1; i <= 3; i++) {
    allVariants.push(getFogVariants(i));
  }
  return allVariants;
}