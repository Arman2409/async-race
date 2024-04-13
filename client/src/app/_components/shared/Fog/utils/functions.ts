import type { Variants } from "framer-motion";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min + "px";
}

const getRandomBorderRadius = () => {
  return `${getRandomNumber(0, 15)} ${getRandomNumber(0, 15)} ${getRandomNumber(0, 15)} ${getRandomNumber(0, 15)}`
}

const getFogVariants = (order: number): Variants => ({
  initial: {
    left: getRandomNumber(2.5, 17.5),
    top: getRandomNumber(order * 5, order * 5 + 5),
  },
  animate: {
    width: getRandomNumber(3, 7),
    height: getRandomNumber(3, 7),
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