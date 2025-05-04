import { JobsBoard, Modal } from './components';
import {
  JobsContext,
  ModalContext,
  createJobsStore,
  useModal,
} from './providers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const modalState = useModal();
  const jobsState = createJobsStore();

  return (
    <>
      <main className="px-6 xl:px-24 pt-12 pb-4 min-h-svh flex flex-col w-320 mx-auto">
        <DndProvider backend={HTML5Backend}>
          <ModalContext.Provider value={modalState}>
            <JobsContext.Provider value={jobsState}>
              <h1 className="text-3xl font-bold">Job Tracking App</h1>
              <hr className="mt-1.5 text-zinc-300 border-b-none" />
              <JobsBoard />
              <Modal />
            </JobsContext.Provider>
          </ModalContext.Provider>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
