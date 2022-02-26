export interface ToDoInterface {
  id?: number;
  title: string;
  description: string;
  date: string;
}

export type Filter = {
  title?: string;
};

export type ToDoForm = {
  valid?: boolean;
  formData?: ToDoInterface;
};

export type ToDoListByDate = {
  past: ToDoInterface[];
  today: ToDoInterface[];
  tomorrow: ToDoInterface[];
  future: ToDoInterface[];
};
