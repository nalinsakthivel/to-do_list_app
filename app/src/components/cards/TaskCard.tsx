import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Task } from '@/types';
import { AppStrings } from '@/constants/AppStrings';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, FontSize, FontWeight } from '@/constants/Theme';
import { CheckmarkIcon, EditIcon, TrashIcon } from '@/components/icons/Icons';

type TaskCardProps = {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task, title: string) => void;
  onDelete: (task: Task) => void;
};

const formatTime = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
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
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
        onPress={() => onToggle(task)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {task.completed ? <CheckmarkIcon size={14} color={Colors.onPrimary} /> : null}
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]} numberOfLines={2}>
          {task.title}
        </Text>
        <Text style={styles.time}>{formatTime(task.createdAt)}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.iconButton, styles.editButton]} onPress={openEdit}>
          <EditIcon size={16} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, styles.deleteButton]}
          onPress={() => onDelete(task)}
        >
          <TrashIcon size={16} color={Colors.danger} />
        </TouchableOpacity>
      </View>

      <Modal visible={isEditing} transparent animationType="fade" onRequestClose={cancelEdit}>
        <TouchableWithoutFeedback onPress={cancelEdit}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>{AppStrings.editModal.title}</Text>
                <TextInput
                  style={styles.modalInput}
                  value={title}
                  onChangeText={setTitle}
                  autoFocus
                  onSubmitEditing={saveEdit}
                />
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={cancelEdit}
                  >
                    <Text style={styles.cancelText}>{AppStrings.common.cancel}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.saveButton]}
                    onPress={saveEdit}
                  >
                    <Text style={styles.saveText}>{AppStrings.common.save}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.md,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: Radius.checkbox,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  center: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  title: {
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    fontWeight: FontWeight.medium,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  time: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: Colors.primaryBg,
    marginRight: Spacing.sm,
  },
  deleteButton: {
    backgroundColor: Colors.dangerBg,
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.lg,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  modalInput: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.input,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  modalActions: {
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    height: 48,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.inputBg,
    marginRight: Spacing.sm,
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  cancelText: {
    color: Colors.textSecondary,
    fontWeight: FontWeight.semibold,
  },
  saveText: {
    color: Colors.onPrimary,
    fontWeight: FontWeight.semibold,
  },
});

export default TaskCard;
