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

const THRESHOLD = 2.5;
const HIGH_THRESHOLD = 4;
const DEFAULT_KEYS = Object.values(Attr);

const sortScoresDesc = (a: CompatibilityObject, b: CompatibilityObject) => {
  if (a.score < b.score) return 1;
  if (a.score > b.score) return -1;
  return 0;
};

const computeCosineSimilarity = (
  target: User,
  users: User[],
  keys: string[] = DEFAULT_KEYS,
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
