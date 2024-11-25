export interface Task {
  id: string; // string for UUID
  title: string;
  description: string;
}

export interface Column {
  id: number;
  title: string;
  tasks: Task[];
}
