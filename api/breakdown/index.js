const express = require("express");
const { getBreakdownForLotCodeAndGroupByFields } = require('../../modules/breakdowns'); // /modules handles logic
const { breakdownFindMany } = require('../../modules/database/index'); // database interface returns relevant breakdowns

router = express.Router();

/** 
 * Router to get all wines that match the query
 * http://localhost:port/api/breakdown/search?text=gin
 * Done by database interface
*/
router.get("/search", (req, res) => {
  const searchText = req.query.text;
  //console.log(searchText);

  const breakdowns = breakdownFindMany({
    searchText
  });

  res.json(
    { breakdowns }
  );
});


/** 
 * Router for year/variety/region/combination breakdown by lotCode
 * http://localhost:port/api/breakdown/year-variety/lotCode
 * Handles any combination, use hyphen between
*/
router.get("/:fields/:lotCode", (req, res) => {
    const groupByFields = req.params.fields;
    const lotCode = req.params.lotCode;
  
    let fields = groupByFields.split("-");
      
    let breakdownResult = getBreakdownForLotCodeAndGroupByFields(lotCode, fields);
  
    res.json(
      { breakdownResult }
    );
  });


module.exports = router;