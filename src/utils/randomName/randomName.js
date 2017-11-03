import animals from "./animals.json";
import adjectives from "./adjectives.json";

const animalsCount = animals.length;
const adjectivesCount = adjectives.length;

function randomInteger(upperBound) {
  return Math.floor(Math.random() * upperBound);
}

export default function randomName() {
  const adjective = adjectives[randomInteger(adjectivesCount)];
  const animal = animals[randomInteger(animalsCount)];

  return `${adjective} ${animal}`;
}
