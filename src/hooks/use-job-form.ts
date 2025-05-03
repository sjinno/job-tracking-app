import { useEffect, useReducer, useState } from 'react';
import { Job, JobStatus } from '../models';

interface FormData extends Job {}

type FormField = keyof FormData;
type FormError = string;
type FormErrorMap = Map<FormField, FormError>;

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
  const [errors, setErrors] = useState<FormErrorMap | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (errors?.has('customerName') && state.customerName !== '') {
      errors.delete('customerName');
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorMap = validateFormData(state);

    if (errorMap.size === 0) {
      console.log(state);
      setSubmitted(true);
      setErrors(null);
      dispatch({ type: 'reset' });
    } else {
      setErrors(errorMap);
    }
  };

  return { state, dispatch, errors, handleSubmit, submitted };
}

const REQUIRED_FIELDS: FormField[] = ['customerName'];
const REQUIRED_FIELD_MESSAGE = 'This field is required.';

function validateFormData(data: FormData): FormErrorMap {
  const errorMap: FormErrorMap = new Map();

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === '') {
      errorMap.set(field, REQUIRED_FIELD_MESSAGE);
    }
  }

  return errorMap;
}
