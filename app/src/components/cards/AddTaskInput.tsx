import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { AppStrings } from '@/constants/AppStrings';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius } from '@/constants/Theme';
import { PlusIcon } from '@/components/icons/Icons';

type AddTaskInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

const AddTaskInput = ({ value, onChangeText, onSubmit }: AddTaskInputProps) => {
  const disabled = value.trim().length === 0;

  return (
    <View style={styles.bar}>
      <TextInput
        style={styles.input}
        placeholder={AppStrings.taskList.addPlaceholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.sendButton, disabled && styles.sendButtonDisabled]}
        onPress={onSubmit}
        disabled={disabled}
      >
        <PlusIcon size={22} color={disabled ? Colors.textMuted : Colors.onPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: Spacing.sm + Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.input,
    paddingHorizontal: Spacing.md,
    fontSize: 15,
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.border,
  },
});

export default AddTaskInput;
