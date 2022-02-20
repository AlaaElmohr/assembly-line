import { AddToFirstStage, Stage, Task, OnMoveTaskParams } from 'types';

export interface OnMoveParams {
  // eslint-disable-next-line no-unused-vars
  (currentStageKey: string, filteredCurrentStage: Stage, targetTask: Task): void;
}

export interface AssemblyLineParams {
  // eslint-disable-next-line no-unused-vars
  (data: string[]): {
    stages: any;
    addToFirstStage: AddToFirstStage;
    onMoveTask: OnMoveTaskParams;
  };
}
