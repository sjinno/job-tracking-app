import { JobsBoard, Modal } from './components';
import { JobsProvider, ModalProvider } from './providers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
      <main className="px-6 xl:px-24 pt-12 pb-4 min-h-svh flex flex-col w-320 mx-auto">
        <DndProvider backend={HTML5Backend}>
          <ModalProvider>
            <JobsProvider>
              <h1 className="text-3xl font-bold">Job Tracking App</h1>
              <hr className="mt-1.5 text-zinc-300 border-b-none" />
              <JobsBoard />
              <Modal />
            </JobsProvider>
          </ModalProvider>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
