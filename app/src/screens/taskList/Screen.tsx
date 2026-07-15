import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScreen } from './useScreen';
import TaskCard from '@/components/cards/TaskCard';
import AddTaskInput from '@/components/cards/AddTaskInput';
import LoadingView from '@/components/common/LoadingView';
import ErrorView from '@/components/common/ErrorView';
import { AppStrings } from '@/constants/AppStrings';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, FontSize, FontWeight } from '@/constants/Theme';
import { Task } from '@/types';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import { ExitIcon, ClipboardIcon } from '@/components/icons/Icons';

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

  const email = useAuthStore((state) => state.user?.email) ?? '';
  const completedCount = tasks.filter((t) => t.completed).length;

  if (loading) {
    return <LoadingView />;
  }

  if (error && tasks.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  const renderEmpty = () => (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <ClipboardIcon size={34} color={Colors.onPrimary} />
      </View>
      <Text style={styles.emptyTitle}>{AppStrings.taskList.emptyTitle}</Text>
      <Text style={styles.emptySubtitle}>{AppStrings.taskList.emptySubtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>{AppStrings.taskList.greeting}</Text>
          <Text style={styles.email} numberOfLines={1}>
            {email}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ExitIcon size={18} color={Colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsBar}>
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: Colors.primary }]}>{tasks.length}</Text>
          <Text style={styles.statLabel}>{AppStrings.taskList.statTotal}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: Colors.success }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>{AppStrings.taskList.statDone}</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>{AppStrings.taskList.sectionLabel}</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item: Task) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={handleToggleComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      <AddTaskInput value={newTitle} onChangeText={setNewTitle} onSubmit={handleAddTask} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: Spacing.md + Spacing.xs,
    backgroundColor: Colors.surface,
  },
  headerLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  email: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: FontWeight.bold,
    marginTop: 2,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    borderRadius: Radius.card,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSize.stat,
    fontWeight: FontWeight.bold,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  sectionLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: FontWeight.semibold,
    marginLeft: Spacing.md + Spacing.xs,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xl * 2,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: FontWeight.bold,
  },
  emptySubtitle: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});

export default TaskListScreen;
