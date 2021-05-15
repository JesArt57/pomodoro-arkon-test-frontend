import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";

// esta constante sirve para poder usar redux devtools en el navegador
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// creando el store y usando thunk para las ejecución de las acciones que son asíncronas
export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
