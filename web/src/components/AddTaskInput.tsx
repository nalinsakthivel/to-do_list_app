import { AppStrings } from '@/constants/AppStrings';

type AddTaskInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const AddTaskInput = ({ value, onChange, onSubmit }: AddTaskInputProps) => {
  return (
    <div style={{ display: 'flex', padding: 16, borderTop: '1px solid #eee' }}>
      <input
        style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ccc', marginRight: 8 }}
        placeholder={AppStrings.taskList.addPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
      <button
        onClick={onSubmit}
        style={{
          background: '#111',
          color: '#fff',
          borderRadius: 8,
          padding: '0 20px',
          fontWeight: 600,
        }}
      >
        {AppStrings.taskList.addButton}
      </button>
    </div>
  );
};

export default AddTaskInput;
