import { useJobForm } from '../hooks';
import { Button } from './button';

export function JobForm() {
  const { state, dispatch, errors, handleSubmit, submitted } = useJobForm();
  const { customerName, description } = state;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customer-name">Add a customer name </label>
        <input
          type="text"
          name="customer-name"
          id="customer-name"
          value={customerName}
          onChange={(e) =>
            dispatch({ type: 'changed_name', nextName: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="description">Add a dscription </label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) =>
            dispatch({ type: 'changed_desc', nextDesc: e.target.value })
          }
          required
        />
      </div>
      <Button type="submit" className="bg-green-600 text-white">
        Create
      </Button>
    </form>
  );
}
