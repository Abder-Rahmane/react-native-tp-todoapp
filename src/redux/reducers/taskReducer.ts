// src/redux/reducers/taskReducer.ts

import { Task } from '../../types/types';

const initialState = {
  taskList: [] as Task[],
};

const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };
      case 'TOGGLE_TASK':
        return {
          ...state,
          taskList: state.taskList.map((task) => {
            if (task.id === action.payload) {
              const updatedTask = { ...task, completed: !task.completed };
      
              if (!updatedTask.completed) {
                updatedTask.isVisible = true;
              }
      
              return updatedTask;
            }
            return task;
          }),
        };
      
      case 'HIDE_TASK':
        return {
          ...state,
          taskList: state.taskList.map((task) =>
            task.id === action.payload ? { ...task, isVisible: false } : task
          ),
        };
    case 'DELETE_TASK':
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export default taskReducer;
