import { User, Attr } from '@/composables/types';
import { lpSpace } from '@/utils/lpSpace';
import { cosineSimilarity } from '@/utils/cosineSimilarity';

export interface CompatibilityObject {
  user: User;
  score: number;
}

export interface CompatibilityResult {
  [key: string]: CompatibilityObject[];
}

const DEFAULT_KEYS = Object.values(Attr);

const sortScoresDesc = (a: CompatibilityObject, b: CompatibilityObject) => {
  if (a.score < b.score) return 1;
  if (a.score > b.score) return -1;
  return 0;
};

const inverseScore = (x: number) => 1 - x;

const computeCosineSimilarity = (
  target: User,
  users: User[],
  keys: string[] = DEFAULT_KEYS,
) => {
  const result = users.map((user) => {
    const cosTheta = cosineSimilarity(target.attrs, user.attrs, keys);
    // normalize to percentage score
    const similarityScore = inverseScore(cosTheta) * 0.8;
    const skillProficiencyScore = keys.reduce((acc, key) => acc += user.attrs[key], 0) / (keys.length * 5) * 0.2;
    const score = similarityScore + skillProficiencyScore;
    return { user, score };
  });
  return result.sort(sortScoresDesc);
};

const computeLpSpace = (
  target: User,
  users: User[],
  keys: string[] = DEFAULT_KEYS,
) => {
  const distances: number[] = [];

  users.forEach((user) => {
    const distance = lpSpace(target.attrs, user.attrs, keys);
    distances.push(distance);
  });

  // normalize to percentage score
  const maxDistance = Math.max(...distances);
  const result = distances.map((dist, index) => {
    return {
      user: users[index],
      score: (maxDistance - dist) / maxDistance,
    };
  });
  return result.sort(sortScoresDesc);
};

export const calcCompatibility = (target: User, users: User[]): CompatibilityResult => {
  return {
    similarlevel: computeLpSpace(target, users),
    wilderness: computeCosineSimilarity(target, users, [Attr.Hunt, Attr.Eng, Attr.Cre, Attr.Med]),
    harrypotter: computeCosineSimilarity(target, users, [Attr.Magic, Attr.Med, Attr.Cre]),
  };
};
