// Imports
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
  const officeWorkPoint = await questions.getOfficeWorkpointResults();
  console.log({ officeWorkPoint });

  process.exit(0);
})();
