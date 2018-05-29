const _ = require('lodash');

const {
  compose,
  composeAsync,
  extractNumber,
  enforceHttpsUrl,
  fetchHtmlFromUrl,
  extractFromElems,
  fromPairsToObject,
  fetchElemInnerText,
  fetchElemAttribute,
  extractUrlAttribute
} = require("./helpers");

const URL = "https://www.worldclasslearning.com/english/five-verb-forms.html";