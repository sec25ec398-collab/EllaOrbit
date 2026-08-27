import learningResources from "./data/learning_resources.json";
import womensCircles from "./data/womens_circles.json";
import opportunities from "./data/opportunities.json";

type MatchItem = {
  title?: string;
  name?: string;
  skills: string[];
  link?: string;
};

function getTopMatches(
  confirmedSkills: string[],
  dataset: MatchItem[]
): MatchItem[] {
  const matches = dataset.map((item) => {
    const score = item.skills.filter((skill) =>
      confirmedSkills.includes(skill)
    ).length;

    return { ...item, score };
  });

  return matches
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

const confirmedUserSkills = ["tailoring", "sewing"];

console.log("Top Learning Resources:");
console.log(getTopMatches(confirmedUserSkills, learningResources));

console.log("Top Women's Circles:");
console.log(getTopMatches(confirmedUserSkills, womensCircles));

console.log("Top Opportunities:");
console.log(getTopMatches(confirmedUserSkills, opportunities));