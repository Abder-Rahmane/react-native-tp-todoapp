import { TaskAction } from '../../types/types';

export const addTask = (title: string): TaskAction => ({
  type: 'ADD_TASK',
  payload: title
});

export const toggleTask = (id: number): TaskAction => ({
  type: 'TOGGLE_TASK',
  payload: id
});

export const deleteTask = (id: number): TaskAction => ({
  type: 'DELETE_TASK',
  payload: id
});
