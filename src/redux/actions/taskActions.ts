// src/redux/actions/taskActions.ts
import uuid from 'react-native-uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppState } from '../store';


let taskId = 0;
let taskOrder = 0;


export const addTask = (task: Partial<Task>) => ({
  type: 'ADD_TASK',
  payload: {
    ...task,
    id: uuid.v4() as string,
    completed: false,
    isVisible: true,
  },
});

// src/redux/actions/taskActions.ts

export const toggleTask = (
  id: string
): ThunkAction<void, AppState, unknown, AnyAction> => (
  dispatch,
  getState
) => {
  dispatch({
    type: 'TOGGLE_TASK',
    payload: id,
  });

  const state = getState();
  const toggledTask = state.tasks.taskList.find((task) => task.id === id);

  if (toggledTask && toggledTask.completed) {
    setTimeout(() => {
      dispatch({
        type: 'HIDE_TASK',
        payload: id,
      });
    }, 500);
  }
};


export const deleteTask = (id: string) => ({
  type: 'DELETE_TASK',
  payload: id,
});