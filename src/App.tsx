import { JobsBoard, Modal } from './components';
import { ModalContext, useModal } from './hooks';
import { JobsContext, createJobsStore } from './providers/jobs-provider';

function App() {
  const modalState = useModal();
  const jobsState = createJobsStore();

  return (
    <>
      <main className="px-24 pt-12 pb-4 min-h-svh flex flex-col w-320 mx-auto">
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
