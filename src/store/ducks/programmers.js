/**
 * Types
 */
export const Types = {
  ADD_REQUEST: 'programmers/ADD_REQUEST',
  ADD_SUCCESS: 'programmers/ADD_SUCCESS',
  ADD_FAILURE: 'programmers/ADD_FAILURE',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  loading: false,
  data: [
    {
      latitude: -23.5439948,
      longitude: -46.6076,
      avatar: 'https://avatars2.githubusercontent.com/u/2254731?v=4',
    },
    {
      latitude: -23.0,
      longitude: -46.0,
      avatar: 'https://avatars2.githubusercontent.com/u/6144263?v=4',
    },
  ],
};

export default function programmers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
/**
 * Actions
 */

export const Creators = {
  addProgrammerRequest: data => ({
    type: Types.ADD_REQUEST,
    payload: {
      data,
    },
  }),

  addProgrammerSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: {
      data,
    },
  }),

  addProgrammerFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: {
      error,
    },
  }),
};
