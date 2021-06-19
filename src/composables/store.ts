/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive } from 'vue';
import { calcCompatibility, CompatibilityResult } from './compatibility';
import { User, Attr } from './types';
import usersData from './usersData.json';

enum State {
  Points = 'points',
  User = 'user',
  Users = 'users',
  Scores = 'scores',
}

interface DataState<T> {
  loading: boolean;
  error: boolean;
  data: T;
}
interface StateObject {
  [key: string]: DataState<any>;
}

const state = reactive<StateObject>({
  [State.Points]: {
    loading: false,
    error: false,
    data: 15,
  },
  [State.User]: {
    loading: false,
    error: false,
    data: null,
  },
  // [State.User]: {
  //   loading: false,
  //   error: false,
  //   data: {
  //     name: 'Jackson Osborn',
  //     attrs: {
  //       [Attr.Charm]: 4,
  //       [Attr.Cre]: 3,
  //       [Attr.Eng]: 1,
  //       [Attr.Hunt]: 0,
  //       [Attr.Magic]: 5,
  //       [Attr.Med]: 2,
  //     },
  //   },
  // },
  [State.Users]: {
    loading: false,
    error: false,
    data: usersData,
  },
  [State.Scores]: {
    loading: false,
    error: false,
    data: null,
  },
});

export const useStore = () => {
  const points: DataState<number> = state[State.Points];
  const user: DataState<User> = state[State.User];
  const users: DataState<User[]> = state[State.Users];
  const scores: DataState<CompatibilityResult> = state[State.Scores];

  const setLoading = (stateKey: State, loadingState: boolean) => {
    state[stateKey].error = false;
    state[stateKey].loading = loadingState;
  };

  const setError = (stateKey: State, err: any) => {
    state[stateKey].error = true;
    state[stateKey].loading = false;
    console.error(err);
  };

  const setData = (stateKey: State, data: any) => {
    state[stateKey].error = false;
    state[stateKey].loading = false;
    state[stateKey].data = data;
  };

  const executeAction = async (stateKey: State, callback: () => void): Promise<void> => {
    try {
      setLoading(stateKey, true);
      await callback();
    } catch (err) {
      setError(stateKey, err);
    }
  };

  const setPoints = (param: number) => {
    setData(State.Points, param);
  };

  const createUser = (param: User) => {
    const stateKey = State.User;
    executeAction(stateKey, () => {
      setData(stateKey, param);
      generateScores();
    });
  };

  const generateScores = async () => {
    const stateKey = State.Scores;
    executeAction(stateKey, () => {
      const scores = calcCompatibility(state.user.data as User, state.users.data as User[]);
      console.log(scores);
      setData(stateKey, scores);
    });
  };

  return {
    // getters
    points,
    user,
    users,
    scores,
    // actions
    setPoints,
    createUser,
    generateScores,
  };
};
