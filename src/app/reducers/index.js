import { combineReducers } from "redux";
import { timerReducer } from "./timer_reducer";

// combinando los reducer para formar uno solo
export const rootReducer = combineReducers({
	timer: timerReducer
});
