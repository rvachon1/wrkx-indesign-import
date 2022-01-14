// IMPORTS
const utils = require("./utils");
const icons = require("./icons");
const { questionPositions } = require("./question_positions");
const { params } = require("./params");

// Constants
const qPos = questionPositions();
const { surveyId } = params();

// Export Functions
const internals = {};

// Demographic (age) 1 Value & Percentage
internals.getAgeResults = async function getAgeResults() {
  const results = await utils.getResults(surveyId, qPos.age, false);
  const maxResult = utils.findMax(results);

  return maxResult;
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

// Office Workpoint
internals.getOfficeWorkpointResults = async function () {
  const results = await utils.getResults(surveyId, qPos.officeWorkpoint, true);
  const topResults = utils.filterTopResultsCount(3, results);

  return topResults;
};

// Mode of Transport
internals.getTransportMode = async function () {
  const results = await utils.getResults(surveyId, qPos.transportMode, true);
  const maxResult = utils.findMax(results);
  const iconObject = icons.modeOfTransport();
  const resultWithIcon = utils.matchIcons([maxResult], iconObject)[0];

  const resultsWithMax = {
    results,
    maxResult,
  };

  return resultsWithMax;
};

// Describes Remote Space
internals.getDescribesRemoteSpace = async function () {
  const results = await utils.getResults(surveyId, qPos.describesRemoteSpace, true);
  results.sort((a, b) => b.count - a.count);

  return results;
};

// Remote Motivation
internals.getRemoteMotivation = async function () {
  const results = await utils.getResults(surveyId, qPos.remoteMotivation, true);
  const topResults = utils.filterTopResultsCount(3, results);
  const iconObject = icons.remoteWorkReason();
  const resultsWithIcons = utils.matchIcons(topResults, iconObject);

  return topResults;
};

// Remote Work Location
internals.getRemoteWorkLocation = async function () {
  const results = await utils.getResults(surveyId, qPos.remoteWorkLocation, false);
  const maxResult = utils.findMax(results);

  return maxResult;
};

// Keep working remotely
internals.getKeepWorkingRemotely = async function () {
  const result = await utils.getResults(surveyId, qPos.keepWorkingRemotely, false);
  const positiveResults = result.filter((i) => {
    return i.text.includes("Strongly Agree") || i.text.includes("Somewhat Agree");
  });
  const percentage = utils.totalProperty(positiveResults, "percentage");

  return percentage;
};

// Motivates Work From Office - Work in Office Reason
internals.getMotivatesWorkFromOffice = async function () {
  const results = await utils.getResults(surveyId, qPos.motivatesWorkFromOffice, true);
  const topResults = utils.filterTopResultsCount(3, results);
  const iconObject = icons.motivatesWorkFromOffice();
  const resultsWithIcons = utils.matchIcons(topResults, iconObject);

  return resultsWithIcons;
};

// Commute Times
internals.getCommuteTime = async function () {
  const results = await utils.getResults(surveyId, qPos.commuteTime, false);

  return results;
};

// Design Elements
internals.getDesignElementsHowWell = async function () {
  const { page, apiPosition, lookupPosition } = qPos.designElementsHowWell;

  const question = await utils.getQuestion(surveyId, page, apiPosition);
  const results = utils.lookupQuestion(lookupPosition).summary[0].rows;
  const topResults = utils.filterTopResultsMean(3, results);
  const matchedResults = utils.matchChoiceText(topResults, question.answers.rows);
  const iconList = icons.designElements();
  const resultsWithIcons = utils.matchIcons(matchedResults, iconList);

  return resultsWithIcons;
};

// Custom Teams - departmentOfRole & daysSpentOffice
internals.getCustomTeams = async function () {
  // problem:
  // get average daysSpentOffice from all users who chose the #1 departmentOfRole
  // ALGO
  // 0. determine the maxTeam (#1 departmentOfRole)
  // 1. Get all responses for departmentOfRole Question
  // 2. Fitler responses that have max Team Name
  // 3. map these responseIds
  // 4. Filter daysSpentOffice using these responseIds
  // 5. Return Average from 4.
  // Get Max Role Responses
  const departmentOfRoles = await utils.getResults(surveyId, qPos.departmentOfRole, false);
  const question = utils.lookupQuestion(qPos.departmentOfRole.lookupPosition);
  const maxRole = utils.findMax(departmentOfRoles);
  const roleResponses = await utils.getResponses(surveyId, question.id);
  const filteredRoleResponses = utils.filterResponsesByChoice(maxRole.id, roleResponses);
  const validResponseIds = filteredRoleResponses.map((r) => r.id);
  // Get Max Role Response ID Office Responses
  const officeQuestion = utils.lookupQuestion(qPos.daysSpentOffice.lookupPosition);
  const officeResponses = await utils.getResponses(surveyId, officeQuestion.id);
  const filteredOfficeResponses = utils.filterResponsesByIds(validResponseIds, officeResponses);
  const maxRoleDaysInOfficeAvg = utils.calcAvgFromTextResponses(filteredOfficeResponses);

  return { role: maxRole, rolesAvgDaysInOffice: maxRoleDaysInOfficeAvg };
};

// EXPORTS
module.exports = internals;
