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
  const validIds = [
    "13129669674",
    "13129670761",
    "13129676324",
    "13129690927",
    "13129681220",
    "13129707196",
    "13130340636",
    "13131948700",
    "13132488687",
    "13132488701",
    "13133083713",
    "13135519768",
    "13135575428",
    "13135924303",
    "13136434380",
    "13136497633",
    "13139424716",
    "13148280362",
    "13148280202",
    "13148282697",
    "13145275934",
    "13139580852",
    "13148458547",
    "13148281011",
  ];

  const officeQuestion = utils.lookupQuestion(qPos.daysSpentOffice.lookupPosition);
  const officeResponses = await utils.getResponses(surveyId, officeQuestion.id);
  const filteredOfficeResponses = utils.filterResponsesByIds(validIds, officeResponses);
  console.log({ length: filteredOfficeResponses.length });

  // const { page, apiPosition, lookupPosition } = qPos.designElementsHowWell;
  // let results = utils.lookupQuestion(lookupPosition).summary[0].rows;
  // results = results.map((r) => {
  //   return {
  //     id: r.id,
  //     mean: r.stats.mean,
  //   };
  // });
  // results.sort((a, b) => b.mean - a.mean);
  // console.log({ results });

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
