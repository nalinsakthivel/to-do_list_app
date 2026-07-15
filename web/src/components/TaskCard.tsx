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

  const openEdit = () => {
    setTitle(task.title);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setTitle(task.title);
  };

  const saveEdit = () => {
    const trimmed = title.trim();
    setIsEditing(false);
    if (trimmed && trimmed !== task.title) {
      onEdit(task, trimmed);
    } else {
      setTitle(task.title);
    }
  };

  return (
    <div className="task-card">
      <button
        className={`task-checkbox${task.completed ? ' checked' : ''}`}
        onClick={() => onToggle(task)}
        aria-label="Toggle complete"
      >
        {task.completed ? '✓' : ''}
      </button>

      <div className={`task-title${task.completed ? ' completed' : ''}`}>{task.title}</div>

      <button className="icon-button edit" onClick={openEdit} aria-label="Edit">
        ✎
      </button>
      <button className="icon-button delete" onClick={() => onDelete(task)} aria-label="Delete">
        🗑
      </button>

      {isEditing ? (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{AppStrings.editModal.title}</h2>
            <input
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
              autoFocus
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={cancelEdit}>
                {AppStrings.common.cancel}
              </button>
              <button className="modal-btn save" onClick={saveEdit}>
                {AppStrings.common.save}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskCard;
