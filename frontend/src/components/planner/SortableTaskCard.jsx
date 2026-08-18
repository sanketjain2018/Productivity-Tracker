import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import PlannerTaskCard from "./PlannerTaskCard";

const SortableTaskCard = ({
  task,
  onEdit,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <PlannerTaskCard
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default SortableTaskCard;