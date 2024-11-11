// src/types/types.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  completed: boolean;
  isVisible: boolean;
}

export interface TasksState {
  taskList: Task[];
}

export type TaskAction =
  | { type: 'ADD_TASK'; payload: { title: string; priority: string; deadline: string } } 
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'DELETE_TASK'; payload: number };
