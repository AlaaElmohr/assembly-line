import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
/*
local files
*/
import { AssemblyLineParams, OnMoveParams } from './types';
import { Task, Stage, Stages, AddToFirstStage, OnMoveTaskParams } from 'types';

import { BACKWARD } from 'config';

const useAssemblyLine: AssemblyLineParams = (data) => {
  const [stages, setStages] = useState<Stages>({});

  useEffect(() => {
    //structure the stages list to be {brainstorming_stage: [], development_stage: [], testing_stage: []}
    const initList: Stages = data.reduce((stagesObject: Stages, currentStage) => {
      //replace every space in the stage name with _
      const key = currentStage.replaceAll(' ', '_');

      stagesObject[key] = [];
      return stagesObject;
    }, {});

    setStages(initList);
  }, []);

  const addToFirstStage: AddToFirstStage = (taskName) => {
    //get the first stage key
    const firstStageKey: string = Object.keys(stages)[0];

    //update the targeted stage by pushing the task info at the top of it.
    //using nanoid to generate unique id for each task.
    setStages((prevState) => ({
      ...prevState,
      [firstStageKey]: [{ id: nanoid(), name: taskName }, ...prevState[firstStageKey]]
    }));
  };

  const onMoveTask: OnMoveTaskParams = (id, currentStageKey, direction) => {
    //id is the id of the targetted task which needs to be moved
    //currentStageKey is where the task currently exits.
    //direction whether it is forward or backward depend on how user click.
    const currentStage: Stage = stages[currentStageKey];
    //get the target task info
    const targetTask = currentStage.find((task: Task) => task.id === id);

    if (targetTask) {
      //remove the targetedTask from the current stage
      const filteredCurrentStage = currentStage.filter((task: Task) => task.id !== id);

      if (direction === BACKWARD) {
        onMoveBackward(currentStageKey, filteredCurrentStage, targetTask);
      } else {
        onMoveForward(currentStageKey, filteredCurrentStage, targetTask);
      }
    }
  };

  const onMoveBackward: OnMoveParams = (currentStageKey, filteredCurrentStage, targetTask) => {
    //get the current stage index to get the previous stage
    const currentStageIndex = Object.keys(stages).indexOf(currentStageKey);

    //if currentStageIndex === 0 this means, we are at the first stage then we need to remove it from list
    if (!currentStageIndex) {
      setStages((prevState) => ({
        ...prevState,
        [currentStageKey]: filteredCurrentStage
      }));
    } else {
      // insert the task info to the previous stage at the bottom of the list
      const previousStage = Object.keys(stages)[currentStageIndex - 1];

      setStages((prevState) => ({
        ...prevState,
        [currentStageKey]: filteredCurrentStage,
        [previousStage]: [...prevState[previousStage], targetTask]
      }));
    }
  };

  const onMoveForward: OnMoveParams = (currentStageKey, filteredCurrentStage, targetTask) => {
    //get the current stage index to get the next stage
    const currentStageIndex = Object.keys(stages).indexOf(currentStageKey);
    //if currentStageIndex === the stages length this means, we are at the last stage then we need to remove it from list
    if (currentStageIndex === Object.keys(stages).length - 1) {
      setStages((prevState) => ({
        ...prevState,
        [currentStageKey]: filteredCurrentStage
      }));
    } else {
      // insert the task info to the next stage at the top of list
      const nextStage = Object.keys(stages)[currentStageIndex + 1];

      setStages((prevState) => ({
        ...prevState,
        [currentStageKey]: filteredCurrentStage,
        [nextStage]: [targetTask, ...prevState[nextStage]]
      }));
    }
  };
  return {
    stages,
    addToFirstStage,
    onMoveTask
  };
};

export default useAssemblyLine;
