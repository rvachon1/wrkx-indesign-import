// IMPORTS
const utils = require("./utils");
const { questionPositions } = require("./question_positions");
const { params } = require("./params");
const { calcAverage } = require("./utils");

// Constants
const qPos = questionPositions();
const { surveyId, questions } = params();

// Export Functions
const internals = {};

// Demographic (age) 1 Value & Percentage
internals.getAgeResults = async function getAgeResults() {
  const ageChoices = utils.lookupChoices(qPos.age.lookupPosition);
  const { id: maxAgeId } = utils.findMax(ageChoices);
  const maxAgePercent = utils.calcPercentage(ageChoices, maxAgeId);
  const maxAgeText = await utils.getChoiceText(
    surveyId,
    qPos.age.page,
    qPos.age.apiPosition,
    maxAgeId
  );

  return { max: maxAgePercent, text: maxAgeText };
};

// Gender
internals.getGenderResults = async function () {
  const results = await utils.getResults(surveyId, qPos.gender, true);

  return results;
};

// Empolyement
internals.getEmployementResults = async function () {
  const results = await utils.getResults(surveyId, qPos.employment, true);

  return results;
};

// Role
internals.getRoleResults = async function () {
  const results = await utils.getResults(surveyId, qPos.workLevel, true);

  return results;
};

// Career Stage
internals.getCareerStageResults = async function () {
  const results = await utils.getResults(surveyId, qPos.careerStage, false);

  return results;
};

// Days in Office
internals.getDaysSpentOfficeResults = async function () {
  const average = await utils.getAverageResults(surveyId, qPos.daysSpentOffice.lookupPosition);

  return average;
};

// Days Preferrerd in the Office
internals.getDaysPreferredOfficeResults = async function () {
  const average = await utils.getAverageResults(surveyId, qPos.daysPreferredOffice.lookupPosition);

  return average;
};

// EXPORTS
module.exports = internals;
