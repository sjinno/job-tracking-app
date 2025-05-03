import { Button } from './components/button';

function App() {
  return (
    <>
      <main className="px-24 py-12">
        <h1 className="text-3xl font-bold">Job Tracking App</h1>
        <div className="my-3">
          <Button label="Add job" />
        </div>
      </main>
    </>
  );
}

export default App;
