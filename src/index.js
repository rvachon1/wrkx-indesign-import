// Imports
const {
  getRemoteSpaceNoChanges,
  getDescribesRemoteSpace,
  getRemoteMotiviation,
} = require("./lib/questions");
const questions = require("./lib/questions");

// MAIN FUNCITON
(async () => {
  // const age = await questions.getAgeResults();
  // console.log(age);
  // const gender = await questions.getGenderResults();
  // console.log({ gender });
  // const employement = await questions.getEmployementResults();
  // console.log({ employement });
  // const role = await questions.getRoleResults();
  // console.log({ role });
  // const careerStage = await questions.getCareerStageResults();
  // console.log({ careerStage });
  // const daysSpentOffice = await questions.getDaysSpentOfficeResults();
  // console.log({ daysSpentOffice });
  // const daysPreferredOffice = await questions.getDaysPreferredOfficeResults();
  // console.log({ daysPreferredOffice });
  // const officeWorkPoint = await questions.getOfficeWorkpointResults();
  // console.log( { officeWorkPoint})
  // const transportMode = await questions.getTransportMode();
  // console.log({ transportMode });
  // const remoteSpace = await getDescribesRemoteSpace();
  // console.log({ remoteSpace });
  // const remoteMotivation = await questions.getRemoteMotivation();
  // console.log({ remoteMotivation });
  // const remoteLocation = await questions.getRemoteWorkLocation();
  // console.log({ remoteLocation });
  // const keepWorkingRemotely = await questions.getKeepWorkingRemotely();
  // console.log({ keepWorkingRemotely });
  // const motivatesWorkFromOffice = await questions.getMotivatesWorkFromOffice();
  // console.log({ motivatesWorkFromOffice });
  // const commuteTime = await questions.getCommuteTime();
  // console.log({ commuteTime });
  // const designElements = await questions.getDesignElementsHowWell();
  // console.log({ designElements });
  const customTeams = await questions.getCustomTeams();
  console.log({ customTeams });

  process.exit(0);
})();
