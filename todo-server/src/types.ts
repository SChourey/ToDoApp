export interface ToDoInterface {
  id?: number | any;
  title: string;
  description: string;
  date: string;
}

export interface ToDoErrorInterface {
  message?: string;
  statusCode?: number;
  error?: string;
}
