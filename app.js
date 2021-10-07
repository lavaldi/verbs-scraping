const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://www.worldclasslearning.com/english/five-verb-forms.html";

// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items
    const listItems = $("tbody tr");
    // Stores data for all verbs
    const verbs = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      if (idx === 0) return;
      // Object holding data for each verb
      const verb = {
        id: "",
        baseForm: "",
        pastForm: "",
        pastParticipleForm: "",
        sEsIesForm: "",
        ingForm: "",
      };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      const elChildren = $(el).children();
      verb.id = $(elChildren[0]).text();
      verb.baseForm = $(elChildren[1]).text();
      verb.pastForm = $(elChildren[2]).text();
      verb.pastParticipleForm = $(elChildren[3]).text();
      verb.sEsIesForm = $(elChildren[4]).text();
      verb.ingForm = $(elChildren[5]).text();
      // Populate verbs array with verb data
      verbs.push(verb);
    });
    // Logs verbs array to the console
    console.dir(verbs);
    // Write verbs array in verbs.json file
    fs.writeFile("verbs.json", JSON.stringify(verbs, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.info("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();
