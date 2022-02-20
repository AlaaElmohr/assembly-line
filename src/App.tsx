import React from 'react';
/*
local files
*/
import { Navbar, AssemblyLine } from 'components';
import { useAssemblyLine } from 'hooks';
import styles from './App.module.scss';
import { Stages } from 'data';

const App = () => {
  const { stages, addToFirstStage, onMoveTask } = useAssemblyLine(Stages);

  return (
    <>
      <Navbar onAddToFirstStage={addToFirstStage} />
      <main className={styles.wrapper}>
        <div className={styles.container}>
          <AssemblyLine stages={stages} onMoveTask={onMoveTask} />
        </div>
      </main>
    </>
  );
};

export default App;
