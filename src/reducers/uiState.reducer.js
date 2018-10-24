import { DEV_MODE, DEV_FLOATING_ACTIVE } from "../actions/types";
import config from "../config.json";

const INITIAL_STATE = {
  devMode: config.devMode,
  devFloatingActive: false
};

const uiState = (state = INITIAL_STATE, action) => {
  // Sanity check here
  console.log(action.type);
  if (action.type === undefined) {
    throw new Error("UI State reducer recieved an undefined action!");
  }
  switch(action.type) {
    case DEV_MODE: {
      return {
        ...state,
        devMode: !state.devMode
      }
    }
    case DEV_FLOATING_ACTIVE: {
      return {
        ...state,
        devFloatingActive: !state.devFloatingActive
      }
    }
    default: {
      return state;
    }
  }
}

export default uiState;