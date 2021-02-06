const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');


// Database interface

/**
 * This function takes in a lotCode and returns the corresponding file if it exists
 * @param {*} lotCode unique wine identifier and filename.json
 */
function breakdownFindByLotCode(lotCode) {
    try {
      const breakdown = fs.readFileSync(path.resolve(`data/${lotCode}.json`));
      return JSON.parse(breakdown);
    } catch (error) {
      console.error(error);
      // file doesn't exist
      return null;
    }
  }

  /**
   * This function takes in a string/regex and compares it to each wines lotCode and description
   * Returns matches[], a list of all wine breakdowns that had at least a partial match
   * @param {*} filter is the string/regex to match
   */
  function breakdownFindMany(filter) {
    let breakdowns = glob.sync(path.resolve('data/*.json')); // gets all file paths
    breakdowns = breakdowns.map( path => JSON.parse(fs.readFileSync(path))); // map paths to json objects
    let regx = new RegExp(filter.searchText, "i"); // create regex
    var matches = [];
    //console.log(filters);
    if (filter.searchText) { // if the get request had something to match
      for (var breakdown of breakdowns) { // for each breakdown
        if (!matches.includes(breakdown)){ // check if it has already been matched, probably not necessary
          if (breakdown.lotCode?.match(regx) || breakdown.description?.match(regx)) { // if prop exists match to regex and add to list
            matches.push(breakdown);
          }
        }
      }
    }
    return matches;
  }


module.exports = {
    breakdownFindByLotCode,
    breakdownFindMany
};