import { AppStrings } from '@/constants/AppStrings';

type AddTaskInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const AddTaskInput = ({ value, onChange, onSubmit }: AddTaskInputProps) => {
  const disabled = value.trim().length === 0;

  return (
    <div className="add-bar">
      <input
        className="add-input"
        placeholder={AppStrings.taskList.addPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
      <button className="send-button" onClick={onSubmit} disabled={disabled}>
        {AppStrings.common.add}
      </button>
    </div>
  );
};

export default AddTaskInput;
