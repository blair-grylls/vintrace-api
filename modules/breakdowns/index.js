const { breakdownFindByLotCode } = require('../database/index'); // use database interface to get data
const { breakdownComponents } = require('./breakdownCalculator'); // handle more complex logic in another function

/**
 * This function takes in a lotCode and a list to group the breakdown by. It returns a sorted list with the highest percentage components first
 * @param {*} lotCode unique identifer for each wine. All files are stored `${lotCode}.json`
 * @param {*} fields list of properties to group components by (permutation or subset of ["year","region","variety"])
 */
function getBreakdownForLotCodeAndGroupByFields(lotCode, fields) {
    let wine = breakdownFindByLotCode(lotCode); // use the database interface to get data
    if (!wine) return null; // stop if the lotCode doesn't exist

    // check for duplicates in fields e.g ["year,"year"]
    function checkIfDuplicateExists(f){
      return new Set(f).size !== f.length;
    }

    if (checkIfDuplicateExists(fields)) {
      throw Error('Duplicate fields');
    }

    // Check each field value is a valid property
    for (let field of fields) {
      if (!["year","region","variety"].includes(field)) {
        throw Error(`Invalid field: ${field}`);
      }
    }

    console.log("Grouping breakdown components by fields", { lotCode, fields });
    components = wine.components; // only pass in the components list
    //console.log(components);
    breakdown = breakdownComponents(components, fields); // separate function handles logic
    return breakdown;
  }
  
  module.exports = {
    getBreakdownForLotCodeAndGroupByFields
  };