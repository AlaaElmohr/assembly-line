export interface Task {
  id: string;
  name: string;
}
export interface Stage extends Array<Task> {}

export type Stages = {
  [key: string]: Stage;
};

export interface OnMoveTaskParams {
  // eslint-disable-next-line no-unused-vars
  (id: string, currentStageKey: string, direction: string): void;
}

export interface OnMoveParams {
  // eslint-disable-next-line no-unused-vars
  (currentStageKey: string, filteredCurrentStage: Stage, targetTask: Task): void;
}

export interface AddToFirstStage {
  // eslint-disable-next-line no-unused-vars
  (taskName: string): void;
}

export interface AssemblyLineParams {
  // eslint-disable-next-line no-unused-vars
  (data: string[]): {
    stages: any;
    addToFirstStage: AddToFirstStage;
    onMoveTask: OnMoveTaskParams;
  };
}
