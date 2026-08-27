import learningResources from "./data/learning_resources.json";
import womensCircles from "./data/womens_circles.json";
import opportunities from "./data/opportunities.json";

type MatchItem = {
  id?: string;
  title?: string;
  name?: string;
  skills: string[];
  link?: string;
  location?: string;
  language?: string;
  skill_level?: string;
  experience_required?: string;
  verified?: boolean;
};

type MatchResult = MatchItem & {
  score: number;
  matchPercentage: number;
  reasons: string[];
};

function getTopMatches(
  confirmedSkills: string[],
  dataset: MatchItem[],
  userLocation = "Chennai",
  userLanguage = "Tamil",
  userSkillLevel = "beginner"
): MatchResult[] {
  const matches = dataset.map((item) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Skill matching
    const matchedSkills = item.skills.filter((skill) =>
      confirmedSkills.includes(skill.toLowerCase())
    );

    if (matchedSkills.length > 0) {
      score += 50;
      reasons.push(`Skill match: ${matchedSkills.join(", ")}`);
    }

    // 2. Location matching
    if (
      item.location &&
      (item.location.toLowerCase() === userLocation.toLowerCase() ||
        item.location.toLowerCase() === "remote")
    ) {
      score += 20;
      reasons.push("Location compatible");
    }

    // 3. Language matching
    if (
      item.language &&
      item.language.toLowerCase() === userLanguage.toLowerCase()
    ) {
      score += 15;
      reasons.push("Language match");
    }

    // 4. Skill level / experience matching
    const requiredLevel =
      item.skill_level?.toLowerCase() ||
      item.experience_required?.toLowerCase();

    if (
      requiredLevel &&
      (requiredLevel === userSkillLevel.toLowerCase() ||
        requiredLevel === "beginner")
    ) {
      score += 10;
      reasons.push("Experience/skill level suitable");
    }

    // 5. Verification bonus
    if (item.verified === true) {
      score += 5;
      reasons.push("Verified resource");
    }

    return {
      ...item,
      score,
      matchPercentage: score,
      reasons,
    };
  });

  return matches
    .filter((item) => item.reasons.some((reason) => reason.startsWith("Skill match")))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// Example confirmed user profile
const confirmedUserSkills = ["tailoring", "sewing"];

const userLocation = "Chennai";
const userLanguage = "Tamil";
const userSkillLevel = "beginner";

console.log("=================================");
console.log("        LO ORBIT MATCHING ENGINE");
console.log("=================================");

console.log("\nTop Learning Resources:");

console.log(
  getTopMatches(
    confirmedUserSkills,
    learningResources,
    userLocation,
    userLanguage,
    userSkillLevel
  )
);

console.log("\nTop Women's Circles:");

console.log(
  getTopMatches(
    confirmedUserSkills,
    womensCircles,
    userLocation,
    userLanguage,
    userSkillLevel
  )
);

console.log("\nTop Opportunities:");

console.log(
  getTopMatches(
    confirmedUserSkills,
    opportunities,
    userLocation,
    userLanguage,
    userSkillLevel
  )
);