import React from 'react';
/*
local files
*/
import AssemblyItem from '../AssemblyItem';
import { AssemblyLineProps } from './types';
import styles from './AssemblyLine.module.scss';

const AssemblyLine = ({ stages, onMoveTask }: AssemblyLineProps) => {
  return (
    <section className={styles.container}>
      {Object.keys(stages).map((stage) => {
        return (
          <article className={styles.stage_wrapper} key={`stage_${stage}`}>
            <AssemblyItem isHeader title={stage} />
            {stages[stage].map((task) => (
              <AssemblyItem
                key={task.id}
                isHeader={false}
                title={task.name}
                onMoveTask={(direction: string) => onMoveTask(task.id, stage, direction)}
              />
            ))}
          </article>
        );
      })}
    </section>
  );
};

export default AssemblyLine;
