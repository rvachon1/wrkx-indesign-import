const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// CONSTANTS
const SM_ACCESS_TOKEN = process.env.SM_ACCESS_TOKEN;
const SM_BASE_URL = "https://api.surveymonkey.com/v3";

// PARAMS
const { params } = require("./params");
const { questions: Q, surveyId } = params();

// EXPORTED FUNCTIONS
const internals = {};

internals.getResults = async function (surveyId, { page, apiPosition, lookupPosition }, addOther) {
  const choices = internals.lookupChoices(lookupPosition, addOther);
  const question = await internals.getQuestion(surveyId, page, apiPosition);
  const results = internals.matchChoiceText(choices, question.answers.choices);

  return results;
};

internals.getAverageResults = async function (surveyId, lookupPos) {
  const question = internals.lookupQuestion(lookupPos);
  const bulkResponses = await internals.getResponses(surveyId, question.id);
  const responses = internals.mapNumResponses(question.id, bulkResponses);
  const average = internals.calcAverage(responses);

  return average;
};

internals.getQuestion = async function (surveyId, pagePos, questionPos) {
  const url = `${SM_BASE_URL}/surveys/${surveyId}/pages`;
  // Get all Pages from Survey Monkey
  const { data: pages } = await get(url);
  // Find speicifc page
  const page = pages.find((page) => page.position === pagePos);
  // Get page questions form Survey Monkey
  const { data: questions } = await get(`${page.href}/questions`);
  // Find specific question
  const question = questions.find((question) => question.position === questionPos);
  // Get Question Details
  const questionDetails = await get(question.href);

  return questionDetails;
};

internals.getResponses = async function (surveyId, questionId) {
  const url = `${SM_BASE_URL}/surveys/${surveyId}/responses/bulk?question_ids=${questionId}&status=completed&per_page=100`;
  const responses = getPaginated(url);

  return responses;
};

internals.mapNumResponses = function (questionId, responses) {
  const mappedResponses = responses.map((response) => {
    const page = response.pages.find(
      (p) => p.questions.length > 0 && p.questions[0].id === questionId
    );

    const number = Number(page.questions[0].answers[0].text);

    // If the user input a non-number
    if (isNaN(number)) {
      let inputNumber = page.questions[0].answers[0].text;
      // attempt to parse out number
      let fixedNumber = inputNumber.match(/\d+/);
      if (fixedNumber) return Number(fixedNumber[0]);
    } else {
      return number;
    }
  });

  return mappedResponses;
};

internals.getChoice = function (question, choiceId) {
  const choice = question.answers.choices.find((choice) => choice.id === choiceId);

  return choice;
};

internals.getChoiceText = async function (surveyId, pagePos, questionPos, choiceId) {
  const question = await internals.getQuestion(surveyId, pagePos, questionPos);
  const choice = await internals.getChoice(question, choiceId);

  return choice.text;
};

internals.matchChoiceText = function (results, choices) {
  const resultsWithText = results.map((result) => {
    const match = choices.find((choice) => {
      return choice.id === result.id;
    });

    if (match) {
      result.text = match.text;
    } else {
      result.text = "Other";
    }

    return result;
  });

  return resultsWithText;
};

internals.lookupChoices = function (questionNumber, addOther = false) {
  const summary = Q[questionNumber].summary[0];
  const { other, choices } = summary;

  if (addOther) {
    choices.push(other[0]);
  }

  choices.map((choice) => {
    const percentage = internals.calcPercentage(choices, choice.id);
    choice.percentage = percentage;
    return choice;
  });

  return choices;
};

internals.lookupQuestion = function (lookupPos) {
  const question = Q[lookupPos];

  return question;
};

internals.findMax = function (results) {
  const maxObj = results[0];

  for (let obj of results) {
    if (obj.count > maxObj.count) {
      maxObj = obj;
    }
  }

  return maxObj;
};

internals.calcPercentage = function (results, id) {
  const total = results.map((i) => i.count).reduce((acc, ele) => (acc += ele), 0);
  const value = results.find((i) => i.id === id).count;
  const percentage = (value / total) * 100;

  return Math.round(percentage);
};

internals.calcAverage = function (numbers) {
  const total = numbers.reduce((acc, ele) => (acc += ele), 0);
  const average = total / numbers.length;

  return Math.round(average);
};

// NOT EXPORTED

async function get(url) {
  let payload;
  const headers = {
    Authorization: `Bearer ${SM_ACCESS_TOKEN}`,
  };

  let config = {
    method: "get",
    url,
    headers,
  };

  await axios(config)
    .then(function (response) {
      payload = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return payload;
}

async function getPaginated(url) {
  let payload = [];
  let page = 2;
  let response = await get(url);

  payload = payload.concat(response.data);

  while (response.links.next) {
    const nextPage = await get(`${url}&page=${page}`);
    payload = payload.concat(nextPage.data);
    response = nextPage;

    page += 1;
  }

  return payload;
}

module.exports = internals;
