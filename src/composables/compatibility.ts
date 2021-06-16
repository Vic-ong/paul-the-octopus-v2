import { User, UserAttributes, Attr } from '@/composables/types';

export interface CompatibilityObject {
  user: User;
  avgAttrs: UserAttributes;
  score: number;
}

export interface CompatibilityResult {
  [key: string]: CompatibilityObject;
}

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

const calcAvgAttrs = (a: UserAttributes, b: UserAttributes): UserAttributes => {
  return defaultKeys.reduce((acc, key) => {
    acc[key] = (a[key] + b[key]) / 2;
    return acc;
  }, {
    [Attr.Hunt]: 0,
    [Attr.Eng]: 0,
    [Attr.Cre]: 0,
    [Attr.Med]: 0,
    [Attr.Magic]: 0,
    [Attr.Charm]: 0,
  });
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
  let result = { user: {}, score: 0 };
  users.forEach((user) => {
    const cosTheta = cosineSimilarity(target.attrs, user.attrs, keys);
    // normalize to percentage as score
    const score = (cosTheta + 1) / 2;
    if (score > result.score) result = { user, score };
  });

  const resultUser = result.user as User;
  return {
    user: resultUser,
    score: result.score,
    avgAttrs: calcAvgAttrs(target.attrs, resultUser.attrs),
  };
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
  const minDistance = Math.min(...distances);
  const minIndex = distances.indexOf(minDistance);
  
  return {
    user: users[minIndex],
    score: (maxDistance - minDistance) / maxDistance,
    avgAttrs: calcAvgAttrs(target.attrs, users[minIndex].attrs),
  };
};

const computeMaxDistance = (
  target: User,
  users: User[],
  keys: string[] = defaultKeys,
) => {
  const distances: number[] = [];
  const magnitudeTarget = vectorMagnitude(target.attrs, keys);
  users.forEach((user) => {
    const magnitudeUser = vectorMagnitude(user.attrs, keys);
    distances.push(magnitudeTarget + magnitudeUser);
  });

  const maxDistanceTotal = Math.sqrt(keys.length * Math.pow(10, 2));
  const maxDistance = Math.max(...distances);
  const maxIndex = distances.indexOf(maxDistance);
  
  return {
    user: users[maxIndex],
    score: maxDistance / maxDistanceTotal,
    avgAttrs: calcAvgAttrs(target.attrs, users[maxIndex].attrs),
  };
};

export const calcCompatibility = (target: User, users: User[]): CompatibilityResult => {
  return {
    similarlevel: computeEuclideanDistance(target, users),
    wilderness: computeCosineSimilarity(target, users, [Attr.Hunt, Attr.Eng, Attr.Cre, Attr.Med]),
    harrypotter: computeMaxDistance(target, users, [Attr.Magic, Attr.Charm, Attr.Cre]),
  };
};
