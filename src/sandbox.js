// Load Environment Variables
const dotenv = require("dotenv");
dotenv.config();

// Load Exports
const utils = require("./lib/utils");
const { params } = require("./lib/params");
const { questionPositions } = require("./lib/question_positions");
const questions = require("./lib/questions");

// Constants
const qPos = questionPositions();
const { surveyId } = params();

// SANDBOX
(async () => {
  // const r = await utils.getResponses(surveyId, 725296487);
  // console.log(r.length);
  // const results = utils.lookupChoices(qPos.gender.lookupPosition, true);
  // const question = await utils.getQuestion(surveyId, qPos.gender.page, qPos.gender.apiPosition);
  // const genderResults = utils.matchChoiceText(results, question.answers.choices);
  // const text = await utils.getChoiceText(314014029, 2, 2, "4769965895");
  // console.log(text);
  // const question = await utils.getQuestion(314014029, 2, 2);
  // console.log(question.answers);
  // const choice = utils.getChoice(question, "4769965895");
  // console.log({ choice });

  // await getAgeResults();
  process.exit(0);
})();
