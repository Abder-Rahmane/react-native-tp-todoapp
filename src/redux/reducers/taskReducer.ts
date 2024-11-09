import { TasksState, TaskAction } from '../../types/types';

const initialState: TasksState = {
  taskList: []
};

const taskReducer = (state = initialState, action: TaskAction): TasksState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        taskList: [...state.taskList, { id: state.taskList.length + 1, title: action.payload, completed: false }]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        taskList: state.taskList.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        taskList: state.taskList.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
};

export default taskReducer;
