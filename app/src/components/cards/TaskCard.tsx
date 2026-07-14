import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from '@/types';
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={() => onToggle(task)}>
        <View style={[styles.checkboxInner, task.completed && styles.checkboxChecked]} />
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          onBlur={commitEdit}
          onSubmitEditing={commitEdit}
          autoFocus
        />
      ) : (
        <TouchableOpacity style={styles.titleWrapper} onPress={() => setIsEditing(true)}>
          <Text style={[styles.title, task.completed && styles.titleCompleted]}>
            {task.title}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => onDelete(task)}>
        <Text style={styles.delete}>{AppStrings.common.delete}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#111',
  },
  checkboxChecked: {
    backgroundColor: '#111',
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  titleInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  delete: {
    color: 'red',
    marginLeft: 12,
  },
});

export default TaskCard;
