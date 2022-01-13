// Postion of questions is sorted so verbiage of questions / answers can be changed
// page & apiPosition are used to query the questions directly from survey monkey
// lookupPosition is used to reference the question positoin in the API survey rollup response object
function questionPositions() {
  return {
    gender: {
      page: 2,
      apiPosition: 1,
      lookupPosition: 0,
    },
    age: {
      page: 2,
      apiPosition: 2,
      lookupPosition: 1,
    },
    employment: {
      page: 2,
      apiPosition: 3,
      lookupPosition: 2,
    },
    employementLength: {
      page: 2,
      apiPosition: 4,
      lookupPosition: 3,
    },
    departmentOfRole: {
      page: 3,
      apiPosition: 1,
      lookupPosition: 4,
    },
    workLevel: {
      page: 3,
      apiPosition: 2,
      lookupPosition: 5,
    },
    numStaffManage: {
      page: 3,
      apiPosition: 3,
      lookupPosition: 6,
    },
    careerStage: {
      page: 3,
      apiPosition: 4,
      lookupPosition: 7,
    },
    commuteLength: {
      page: 4,
      apiPosition: 1,
      lookupPosition: 8,
    },
    commuteDistance: {
      page: 4,
      apiPosition: 2,
      lookupPosition: 9,
    },
    transportMode: {
      page: 4,
      apiPosition: 3,
      lookupPosition: 10,
    },
    daysSpentOffice: {
      page: 5,
      apiPosition: 1,
      lookupPosition: 11,
    },
    daysPreferredOffice: {
      page: 5,
      apiPosition: 2,
      lookupPosition: 12,
    },
    flexibilityWhereWork: {
      page: 5,
      apiPosition: 3,
      lookupPosition: 13,
    },
    flexibilityWhenWork: {
      page: 5,
      apiPosition: 4,
      lookupPosition: 14,
    },
    officeWorkpoint: {
      page: 6,
      apiPosition: 1,
      lookupPosition: 15,
    },
    motivatesWorkFromOffice: {
      page: 6,
      apiPosition: 2,
      lookupPosition: 16,
    },
    percentTimeInSpaces: {
      page: 6,
      apiPosition: 3,
      lookupPosition: 17,
    },
    whereWorkNotOffice: {
      page: 7,
      apiPosition: 1,
      lookupPosition: 18,
    },
    describesRemoteSpace: {
      page: 7,
      apiPosition: 2,
      lookupPosition: 19,
    },
    remoteSpaceNoChanges: {
      page: 7,
      apiPosition: 3,
      lookupPosition: 20,
    },
    remoteMotivation: {
      page: 7,
      apiPosition: 4,
      lookupPosition: 21,
    },
    designElementsHowImportant: {
      page: 8,
      apiPosition: 1,
      lookupPosition: 22,
    },
    designElementsHowWell: {
      page: 9,
      apiPosition: 1,
      lookupPosition: 23,
    },
    impactPhysicalSpace: {
      page: 10,
      apiPosition: 1,
      lookupPosition: 24,
    },
    recommenedEmployer: {
      page: 11,
      apiPosition: 2,
      lookupPosition: 26,
    },
    recommendOfficeEnvironment: {
      page: 11,
      apiPosition: 3,
      lookupPosition: 27,
    },
    willWorkHereTwoYears: {
      page: 11,
      apiPosition: 4,
      lookupPosition: 28,
    },
  };
}

module.exports = {
  questionPositions,
};
