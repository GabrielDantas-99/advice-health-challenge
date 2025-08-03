import { CreateTaskDTO } from "@/models/Task";

const validateTaskForm = (formData: CreateTaskDTO): Partial<CreateTaskDTO> => {
  const newErrors: Partial<CreateTaskDTO> = {};

  if (!formData.title.trim()) {
    newErrors.title = "Título é obrigatório";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Descrição é obrigatória";
  }

  if (formData.priority === 0) {
    newErrors.description = "Selecione uma prioridade para a atividade";
  }

  return newErrors;
};

export default validateTaskForm;
