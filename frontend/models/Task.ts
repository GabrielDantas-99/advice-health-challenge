export interface Task {
  id: number;
  author: number;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  completed: boolean;
  deadline?: string;
  priority: number;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  deadline?: string;
  priority: number;
}

export interface UpdateTaskDTO extends Partial<CreateTaskDTO> {
  completed?: boolean;
}

export enum TaskPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  URGENT = 3,
}

export const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case TaskPriority.LOW:
      return "Baixa";
    case TaskPriority.MEDIUM:
      return "Média";
    case TaskPriority.HIGH:
      return "Alta";
    case TaskPriority.URGENT:
      return "Urgente";
    default:
      return "Baixa";
  }
};

export const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case TaskPriority.LOW:
      return "bg-gray-100 text-gray-800";
    case TaskPriority.MEDIUM:
      return "bg-blue-100 text-blue-800";
    case TaskPriority.HIGH:
      return "bg-yellow-100 text-yellow-800";
    case TaskPriority.URGENT:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const selectPriorityLabels = [
  {
    value: "1",
    label: "Baixa",
  },
  {
    value: "2",
    label: "Média",
  },
  {
    value: "3",
    label: "Alta",
  },
  {
    value: "4",
    label: "Urgente",
  },
];
