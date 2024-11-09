// src/types/types.ts

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TasksState {
  taskList: Task[];
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number };
