import carBrandsWithModels from "./data/carBrandsWithModels";

function generateRandomCarObjects() {
  const carObjects = [];
  const numCombinations = 100;

  // Function to generate random HEX color
  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  // Generate random combinations
  for (let i = 0; i < numCombinations; i++) {
    const randomBrandIndex = Math.floor(Math.random() * carBrandsWithModels.length);
    const brand = carBrandsWithModels[randomBrandIndex].name;
    const models = carBrandsWithModels[randomBrandIndex].models;
    const randomModelIndex = Math.floor(Math.random() * models.length);
    const model = models[randomModelIndex];
    const carName = `${brand} ${model}`;
    const color = getRandomColor();
    const carObject = { name: carName, color: color };
    carObjects.push(carObject);
  }

  return carObjects;
}

export default generateRandomCarObjects;