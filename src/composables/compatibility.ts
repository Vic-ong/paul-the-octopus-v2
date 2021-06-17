import { User, UserAttributes, Attr } from '@/composables/types';

export interface CompatibilityObject {
  user: User;
  score: number;
}

export interface CompatibilityResult {
  [key: string]: CompatibilityObject[];
}

const THRESHOLD = 2.5;
const HIGH_THRESHOLD = 4;

const defaultKeys = Object.values(Attr);

const dotProduct = (a: UserAttributes, b: UserAttributes, keys: string[]) => {
  let result = 0;
  keys.forEach((key) => {
    result += a[key] * b[key];
  });
  return result;
};

const vectorMagnitude = (v: UserAttributes, keys: string[]): number => {
  let result = 0;
  keys.forEach((key) => {
    result += Math.pow(v[key], 2);
  });
  return Math.sqrt(result);
};

const sortScoresDesc = (a: CompatibilityObject, b: CompatibilityObject) => {
  if (a.score < b.score) return 1;
  if (a.score > b.score) return -1;
  return 0;
};

/**
 * Calculates the euclidean distance (L2-norm) between 2 vectors
 * @param a 
 * @param b 
 * @returns result [>=0], shortest distance being the highest similarity
 */
 const euclideanDistance = (a: UserAttributes, b: UserAttributes, keys: string[]): number => {
  let result = 0;
  keys.forEach((key) => {
    result += Math.pow(a[key] - b[key], 2);
  });
  return Math.sqrt(result);
};

/**
 * Calculates the consine similarity between 2 vectors
 * @param a 
 * @param b 
 * @returns result [-1 to 1], 1 being the highest similarity
 */
const cosineSimilarity = (a: UserAttributes, b: UserAttributes, keys: string[]): number => {
  const dotResult = dotProduct(a, b, keys);
  const magnitudeResult = vectorMagnitude(a, keys) * vectorMagnitude(b, keys);
  return magnitudeResult === 0 ? 0 : dotResult / magnitudeResult;
};

const computeCosineSimilarity = (
  target: User,
  users: User[],
  keys: string[] = defaultKeys,
) => {
  let filteredUsers;
  filteredUsers = [...users].filter((user) => {
    return keys.every((key) => {
      if (target.attrs[key] > THRESHOLD) return user.attrs[key] < THRESHOLD;
      return user.attrs[key] > THRESHOLD;
    });
  });

  if (filteredUsers.length < 3) {
    filteredUsers = [...users].filter((user) => {
      const aboveAvgAttrs = keys.every((key) => user.attrs[key] > THRESHOLD);
      const maxAttrsCount = keys.reduce((count, key) => {
        if (user.attrs[key] >= HIGH_THRESHOLD) count += 1;
        return count;
      }, 0);
      return aboveAvgAttrs || maxAttrsCount >= (keys.length / 2);
    });
  }

  const result = (filteredUsers.length < 3 ? users : filteredUsers).map((user) => {
    const cosTheta = cosineSimilarity(target.attrs, user.attrs, keys);
    // normalize to percentage score
    const score = (cosTheta + 1) / 2;
    return { user, score };
  });
  return result.sort(sortScoresDesc);
};

const computeEuclideanDistance = (
  target: User,
  users: User[],
  keys: string[] = defaultKeys,
) => {
  const distances: number[] = [];

  users.forEach((user) => {
    const distance = euclideanDistance(target.attrs, user.attrs, keys);
    distances.push(distance);
  });

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
    similarlevel: computeEuclideanDistance(target, users),
    wilderness: computeCosineSimilarity(target, users, [Attr.Hunt, Attr.Eng, Attr.Cre, Attr.Med]),
    harrypotter: computeCosineSimilarity(target, users, [Attr.Magic, Attr.Charm, Attr.Cre]),
  };
};
