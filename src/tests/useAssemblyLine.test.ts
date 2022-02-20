import { renderHook, act } from '@testing-library/react-hooks';
/*
local files
 */
import { useAssemblyLine } from 'hooks';
import { BACKWARD, FORWARD } from 'config';
import { Stage } from 'types';

describe('useAssemblyLine', () => {
  const stagesArr = ['Idea', 'Development', 'Testing', 'Deployment'];

  const getTaskId = (stage: Stage) => {
    const firstStageLength = stage.length;

    return stage[firstStageLength - 1].id;
  };

  const getLastItem = (stage: Stage) => {
    const stageLength = stage.length;
    const lastItem = stage[stageLength - 1];

    return lastItem;
  };

  test('should have stages object that has each stage as a key and empty array as a value', async () => {
    const { result } = renderHook(() => useAssemblyLine(stagesArr));

    expect(result.current.stages).toEqual({
      Idea: [],
      Development: [],
      Testing: [],
      Deployment: []
    });
  });

  test('should add a new task at the top of first stage', async () => {
    const { result } = renderHook(() => useAssemblyLine(stagesArr));
    const { current } = result;
    const task = 'Task 1';

    await act(async () => {
      current.addToFirstStage(task);
    });

    //last Item in the first stage
    const firstStageKey = stagesArr[0];
    const lastItem = getLastItem(result.current.stages[firstStageKey]);
    expect(lastItem.name).toEqual(task);
  });

  test('should move the task from the first stage to the next stage when click on left', async () => {
    const { result } = renderHook(() => useAssemblyLine(stagesArr));
    const currentStageIndex = 0;
    const task = 'Task 1';

    //add task to first stage
    await act(async () => {
      result.current.addToFirstStage(task);
    });
    //get the task
    const currentStageKey = stagesArr[currentStageIndex];
    const taskId = getTaskId(result.current.stages[currentStageKey]);
    //click left on the task
    await act(async () => {
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex], FORWARD);
    });

    const nextStageKey = stagesArr[currentStageIndex + 1];
    const nextStage = result.current.stages[nextStageKey];
    const lastItem = getLastItem(nextStage);

    expect(lastItem.name).toEqual(task);
  });

  test('should remove the task from the its current stage when moving it to the next stage', async () => {
    const { result } = renderHook(() => useAssemblyLine(stagesArr));
    const currentStageIndex = 0;
    const task = 'Task 1';

    //add task to first stage
    await act(async () => {
      result.current.addToFirstStage(task);
    });
    //get the task
    const currentStageKey = stagesArr[currentStageIndex];
    const taskId = getTaskId(result.current.stages[currentStageKey]);
    //click left on the task
    await act(async () => {
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex], FORWARD);
    });

    const currentStage = result.current.stages[currentStageKey];

    expect(currentStage).toEqual([]);
  });

  test('should remove the last task when click on left', async () => {
    const { result } = renderHook(() => useAssemblyLine(stagesArr));
    const currentStageIndex = 0;
    const task = 'Task 1';

    //add task to first stage
    await act(async () => {
      result.current.addToFirstStage(task);
    });
    //get the task
    const currentStageKey = stagesArr[currentStageIndex];
    const taskId = getTaskId(result.current.stages[currentStageKey]);
    //click left on the task
    await act(async () => {
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex], FORWARD);
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex + 1], FORWARD);
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex + 2], FORWARD);
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex + 3], FORWARD);
    });
    const lastStageKey = stagesArr[stagesArr.length - 1];
    const lastStage = result.current.stages[lastStageKey];

    expect(lastStage).toEqual([]);
  });

  test('should remove the task from the its current stage when moving it to the prev stage', async () => {
    const { result } = renderHook(() => useAssemblyLine(stagesArr));
    const currentStageIndex = 0;
    const task = 'Task 1';

    //add task to first stage
    await act(async () => {
      result.current.addToFirstStage(task); // in idea
    });
    //get the task
    const currentStageKey = stagesArr[currentStageIndex];
    const taskId = getTaskId(result.current.stages[currentStageKey]);
    //click left on the task
    await act(async () => {
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex], FORWARD); // in next stage [development]
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex + 1], FORWARD); // in next stage [testing]
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex], BACKWARD); // in development stage
    });

    //checj if it get removed from testing stage;
    const prevStageKey = stagesArr[currentStageIndex + 2];
    const prevStage = result.current.stages[prevStageKey];

    expect(prevStage).toEqual([]);
  });

  test('should remove the first task when click on right', async () => {
    const { result } = renderHook(() => useAssemblyLine(stagesArr));
    const currentStageIndex = 0;
    const task = 'Task 1';

    //add task to first stage
    await act(async () => {
      result.current.addToFirstStage(task);
    });
    //get the task
    const currentStageKey = stagesArr[currentStageIndex];
    const taskId = getTaskId(result.current.stages[currentStageKey]);
    //click left on the task
    await act(async () => {
      result.current.onMoveTask(taskId, stagesArr[currentStageIndex], BACKWARD);
    });

    const firstStageKey = stagesArr[currentStageIndex];
    const firstStage = result.current.stages[firstStageKey];

    expect(firstStage).toEqual([]);
  });
});
