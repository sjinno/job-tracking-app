import { JobsBoard, Modal } from './components';
import { ModalContext, useModal } from './hooks';

function App() {
  const modalState = useModal();

  return (
    <>
      <main className="px-24 py-12">
        <ModalContext.Provider value={modalState}>
          <h1 className="text-3xl font-bold">Job Tracking App</h1>
          <JobsBoard />
          <Modal />
        </ModalContext.Provider>
      </main>
    </>
  );
}

export default App;
