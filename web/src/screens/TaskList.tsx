import { useTasks } from '@/hooks/useTasks';
import TaskCard from '@/components/TaskCard';
import AddTaskInput from '@/components/AddTaskInput';
import LoadingView from '@/components/common/LoadingView';
import ErrorView from '@/components/common/ErrorView';
import { AppStrings } from '@/constants/AppStrings';
import { useAuthStore } from '@/stores/hooks/useAuthStore';

const TaskList = () => {
  const {
    tasks,
    loading,
    error,
    newTitle,
    setNewTitle,
    handleAddTask,
    handleToggleComplete,
    handleEditTask,
    handleDeleteTask,
    handleLogout,
    refetch,
  } = useTasks();

  const email = useAuthStore((state) => state.user?.email) ?? '';
  const completedCount = tasks.filter((t) => t.completed).length;

  if (loading) {
    return <LoadingView />;
  }

  if (error && tasks.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <div className="page">
      <div className="tl-header">
        <div className="tl-header-inner">
          <span className="tl-brand">{AppStrings.brand}</span>
          <div className="tl-header-right">
            <span className="tl-email">{email}</span>
            <button className="tl-logout" onClick={handleLogout} aria-label="Logout">
              ⏻
            </button>
          </div>
        </div>
      </div>

      <div className="page-inner">
        <div className="stats-bar">
          <div className="stat">
            <div className="stat-number total">{tasks.length}</div>
            <div className="stat-label">{AppStrings.taskList.statTotal}</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-number done">{completedCount}</div>
            <div className="stat-label">{AppStrings.taskList.statDone}</div>
          </div>
        </div>

        <AddTaskInput value={newTitle} onChange={setNewTitle} onSubmit={handleAddTask} />

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📋</div>
              <p className="empty-title">{AppStrings.taskList.emptyTitle}</p>
              <p className="empty-subtitle">{AppStrings.taskList.emptySubtitle}</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
