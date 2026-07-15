import { useTasks } from '@/hooks/useTasks';
import TaskCard from '@/components/TaskCard';
import AddTaskInput from '@/components/AddTaskInput';
import LoadingView from '@/components/common/LoadingView';
import ErrorView from '@/components/common/ErrorView';
import { AppStrings } from '@/constants/AppStrings';

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

  if (loading) {
    return <LoadingView />;
  }

  if (error && tasks.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 480, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
        }}
      >
        <h1 style={{ fontSize: 22 }}>{AppStrings.taskList.title}</h1>
        <button onClick={handleLogout} style={{ color: 'red' }}>
          {AppStrings.common.logout}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
            {AppStrings.taskList.emptyState}
          </p>
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

      <AddTaskInput value={newTitle} onChange={setNewTitle} onSubmit={handleAddTask} />
    </div>
  );
};

export default TaskList;
