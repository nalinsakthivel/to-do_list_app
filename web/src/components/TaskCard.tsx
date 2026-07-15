import { useState } from 'react';
import type { Task } from '@/types';
import { AppStrings } from '@/constants/AppStrings';

type TaskCardProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task, title: string) => void;
  onDelete: (task: Task) => void;
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const commitEdit = () => {
    setIsEditing(false);
    const trimmed = title.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(task, trimmed);
    } else {
      setTitle(task.title);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #eee',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        style={{ marginRight: 12 }}
      />

      {isEditing ? (
        <input
          style={{ flex: 1, fontSize: 16 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
          autoFocus
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            fontSize: 16,
            cursor: 'pointer',
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : '#000',
          }}
        >
          {task.title}
        </span>
      )}

      <button onClick={() => onDelete(task)} style={{ color: 'red', marginLeft: 12 }}>
        {AppStrings.common.delete}
      </button>
    </div>
  );
};

export default TaskCard;
