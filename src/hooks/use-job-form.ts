import { useReducer, useState } from 'react';
import { Job, JobStatus } from '../models';

interface FormData extends Job {}

type FormField = keyof FormData;
type FormError = { field: FormField; message: string };

type FormAction =
  | { type: 'changed_name'; nextName: string }
  | { type: 'changed_desc'; nextDesc: string }
  | { type: 'changed_status'; nextStatus: JobStatus }
  | { type: 'reset' };

const initialState: FormData = {
  customerName: '',
  description: '',
  status: 'not-yet-completed',
};

function reducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case 'changed_name':
      return { ...state, customerName: action.nextName };
    case 'changed_desc':
      return { ...state, description: action.nextDesc };
    case 'changed_status':
      return { ...state, status: action.nextStatus };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

export function useJobForm() {
  const [state, dispatch] = useReducer<FormData, [action: FormAction]>(
    reducer,
    initialState
  );
  const [errors, setErrors] = useState<FormError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorStack = validateFormData(state);

    if (errorStack.length === 0) {
      console.log(state);
      setSubmitted(true);
      setErrors([]);
      dispatch({ type: 'reset' });
    } else {
      setErrors(errorStack);
    }
  };

  return { state, dispatch, errors, handleSubmit, submitted };
}

const REQUIRED_FIELDS: FormField[] = ['customerName', 'description'];
const REQUIRED_FIELD_MESSAGE = 'This field is required.';

function validateFormData(data: FormData): FormError[] {
  const errorStack: FormError[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === '') {
      errorStack.push({ field, message: REQUIRED_FIELD_MESSAGE });
    }
  }

  return errorStack;
}
