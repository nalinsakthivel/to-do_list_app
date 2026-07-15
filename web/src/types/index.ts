export interface User {
  id: string;
  email: string;
}

export interface Task {
  _id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
