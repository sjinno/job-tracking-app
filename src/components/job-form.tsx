import { Asterisk, TriangleAlert } from 'lucide-react';
import { useJobForm } from '../hooks';
import { cn } from '../lib';
import { ChangeEventHandler } from '../types';
import { Button } from './button';

export function JobForm() {
  const { state, dispatch, errors, handleSubmit } = useJobForm();
  const { customerName, description } = state;

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Add a customer name"
        name="customer-name"
        value={customerName}
        onChange={(e) =>
          dispatch({ type: 'changed_name', nextName: e.target.value })
        }
        placeholder="Title"
        error={errors?.get('customerName')}
        required={true}
      />
      <InputField
        label="Add a description"
        name="description"
        value={description}
        onChange={(e) =>
          dispatch({ type: 'changed_desc', nextDesc: e.target.value })
        }
        placeholder="Type your description here..."
        error={errors?.get('description')}
        variant="large-text"
        required={true}
      />
      <Button type="submit" className="bg-green-700 text-white border-none">
        Create
      </Button>
    </form>
  );
}

type InputVariant = 'text' | 'large-text';

type InputProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler;
  placeholder?: string;
};

type InputFieldProps = InputProps & {
  label: string;
  error?: string;
  variant?: InputVariant;
  required?: boolean;
};

function InputField({
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  variant = 'text',
  required,
}: InputFieldProps) {
  const baseClass =
    'rounded font-light text-sm placeholder:text-zinc-500 border-1 border-zinc-300';

  const input =
    variant === 'large-text' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(baseClass, 'px-4 py-2')}
      />
    ) : (
      <input
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(baseClass, 'px-3 py-1.5')}
      />
    );

  const asterisk = (
    <Asterisk className="inline text-red-600 h-2 -ml-1 -mt-2" strokeWidth={3} />
  );

  return (
    <div className="flex flex-col gap-1.5 mb-3">
      <div>
        <label htmlFor={name} className="font-semibold text-sm">
          {label}
        </label>
        {required && asterisk}
      </div>
      {input}
      {error && (
        <p className="text-red-700 text-xs font-bold flex items-center">
          <TriangleAlert className="inline-block h-4 fill-red-700 text-white" />
          {error}
        </p>
      )}
    </div>
  );
}
