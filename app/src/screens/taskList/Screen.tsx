import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScreen } from './useScreen';
import TaskCard from '@/components/cards/TaskCard';
import LoadingView from '@/components/common/LoadingView';
import ErrorView from '@/components/common/ErrorView';
import { AppStrings } from '@/constants/AppStrings';
import { Task } from '@/types';

const TaskListScreen = () => {
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
  } = useScreen();

  if (loading) {
    return <LoadingView />;
  }

  if (error && tasks.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>{AppStrings.taskList.title}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>{AppStrings.common.logout}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item: Task) => item._id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>{AppStrings.taskList.emptyState}</Text>}
      />

      <View style={styles.addRow}>
        <TextInput
          style={styles.addInput}
          placeholder={AppStrings.taskList.addPlaceholder}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={handleAddTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>{AppStrings.taskList.addButton}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  logout: {
    color: 'red',
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
  addRow: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TaskListScreen;
