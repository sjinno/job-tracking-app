import { JobsBoard, Modal } from './components';
import { ModalContext, useModal } from './hooks';
import { JobsContext, useJobs } from './hooks/use-jobs';

function App() {
  const modalState = useModal();
  const jobsState = useJobs();

  return (
    <>
      <main className="px-24 py-12">
        <ModalContext.Provider value={modalState}>
          <JobsContext.Provider value={jobsState}>
            <h1 className="text-3xl font-bold">Job Tracking App</h1>
            <hr className="mt-1.5 text-zinc-300 border-b-none" />
            <JobsBoard />
            <Modal />
          </JobsContext.Provider>
        </ModalContext.Provider>
      </main>
    </>
  );
}

export default App;
