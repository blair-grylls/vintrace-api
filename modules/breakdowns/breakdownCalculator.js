module.exports = {
    /**
     * This function takes in the percentage breakdown (components) that make up a wine and a list of properties (fields) 
     * It groups the components by the fields and returns the calculated breakdown in descending order by percentage 
     * @param {*} components is a list of component objects:
     * {
			"percentage":5.0,
			"year":2011,
			"variety":"Pinot Noir",
			"region":"Mornington"
		}
     * @param {*} fields list of properties to group a component by:
     * ["year","variety","region"] any subset or permutation is valid
     * 
     * Example output:
     * {
    "breakdownResult": {
        "breakdownType": [
            "year",
            "variety"
        ],
        "breakdown": [
            {
                "percentage": 80,
                "key": " 2011 Chardonnay"
            },
            {
                "percentage": 10,
                "key": " 2010 Chardonnay"
            },
            {
                "percentage": 10,
                "key": " 2011 Pinot Noir"
            }]
        }
     * 
     */

    breakdownComponents: function(components, fields) {
        var dict = {}; // keys are unique combinations of component properties e.g fields = [year,variety]
        // would yield "2011 Pinot Noir" as a key for this component

        // cycle through each component and create its key combination. If new create entry, if not then add to
        // current percentage
        for (var component in components) {
            let comp = components[component];
            var combination = "";
            for (let field of fields) {
                combination += " " + comp[field];
            }
            //console.log(combination)
            if (combination in dict) {
                dict[combination] += parseInt(comp.percentage);
            }
            else {
                dict[combination] = parseInt(comp.percentage);
            }
        }
        //console.log(dict)
        
        // Turn dict into a sorted list and return
        breakdown = [];
        for (var key in dict) {
            breakdown.push({percentage: dict[key], key: key});
        }
        //console.log(breakdown);
        breakdown.sort(function(a, b) { 
            return b.percentage - a.percentage;
        });
        //console.log(breakdown);
        res = {
            breakdownType: fields,
            breakdown
        };

        return res;
    }
};