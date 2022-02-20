/*
local files
*/
const helpers = {
  getColor: (stage: string = 'idea') => {
    const formattedStage = stage.toLowerCase();
    const colors = {
      idea: '#3dcdff',
      development: '#183c84',
      testing: '#ffb92ed7',
      deployment: '#4ac892'
    };

    return colors[formattedStage as keyof {}];
  }
};

export default helpers;
