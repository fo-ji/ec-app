import {
        createStore as reduxCreateStore,
        combineReducers,
        applyMiddleware
} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
// Import reducers
// import {ProducsReducer} from "../products/reducers";
import {UsersReducer} from "../users/reducers";

export default function createStore(history) {
  return reduxCreateStore( // reduxのcreateStoreメソッドの別名
    combineReducers({
      router: connectRouter(history),
      // products: ProducsReducer,
      users: UsersReducer,
    }),
    applyMiddleware(
      routerMiddleware(history)
    )
  );
}
