import { useJobForm } from '../hooks';
import { Button } from './button';

export function JobForm() {
  const { state, dispatch, errors, handleSubmit } = useJobForm();
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
        />
        {errors?.has('customerName') && (
          <p className="text-red-600">{errors.get('customerName')}</p>
        )}
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
        />
      </div>
      <Button type="submit" className="bg-green-600 text-white">
        Create
      </Button>
    </form>
  );
}
