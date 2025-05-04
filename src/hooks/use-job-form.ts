import { useEffect, useReducer, useState } from 'react';
import { Job, JobStatus } from '../models';
import { useModalContext, useJobsContext } from '../providers';
import { v4 as uuidv4 } from 'uuid';

type FormData = Omit<Job, 'id'>;

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
  status: 'not-yet-started',
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
  const { toggleOpen } = useModalContext();
  const { addJob } = useJobsContext();

  const [state, dispatch] = useReducer<FormData, [action: FormAction]>(
    reducer,
    initialState
  );
  const [errors, setErrors] = useState<FormErrorMap | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!errors) return;

    REQUIRED_FIELDS.forEach((field) => {
      if (errors.has(field) && state[field] !== '') {
        errors.delete(field);
      }
    });
  }, [state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorMap = validateFormData(state);

    if (errorMap.size === 0) {
      addJob({ ...state, id: uuidv4() });
      setSubmitted(true);
      setErrors(null);
      dispatch({ type: 'reset' });
      toggleOpen();
    } else {
      setErrors(errorMap);
    }
  };

  return { state, dispatch, errors, handleSubmit, submitted };
}

const REQUIRED_FIELDS: FormField[] = ['customerName', 'description'];
const REQUIRED_FIELD_MESSAGE = 'This can not be empty.';

function validateFormData(data: FormData): FormErrorMap {
  const errorMap: FormErrorMap = new Map();

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === '') {
      errorMap.set(field, REQUIRED_FIELD_MESSAGE);
    }
  }

  return errorMap;
}
