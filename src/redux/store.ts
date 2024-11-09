import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  tasks: taskReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
