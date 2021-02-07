# Vintrace Exercise 1 submission
##### Blair Christensen

These simple REST APIs return some JSON data that describes a breakdown of the TOTAL percentage of year, variety, region and year + variety information for a specific wine, ordered from highest percentage to lowest.  

## Getting started

Clone the git repository and navigate to the folder then run:

```
npm install
npm run start
```

## API calls

### Breakdown by year

```
http://localhost:1995/api/breakdown/year/{lotCode}
```

### Breakdown by variety

```
http://localhost:1995/api/breakdown/variety/{lotCode}
```

### Breakdown by region

```
http://localhost:1995/api/breakdown/region/{lotCode}
```

### Breakdown by any combination
The design speicified to give a breakdown by year + variety, however to make the solution more scalable in case we add more attributes in the future, this solution can search by any combination.

```
http://localhost:1995/api/breakdown/year-variety/{lotCode}
```

### Example output

```
{
    "breakdownResult": {
        "breakdownType": [
            "year"
        ],
        "breakdown": [
            {
                "percentage": 85,
                "key": " 2011"
            },
            {
                "percentage": 15,
                "key": " 2010"
            }
        ]
    }
}
```


### Search by lot code or description

```
http://localhost:1995/api/breakdown/search?text={lotCode or description}
```

### Example output

```
{
    "breakdowns": [
        {
            "lotCode": "11YVCHAR001",
            "volume": 1000,
            "description": "2011 Yarra Valley Chardonnay",
            "tankCode": "T25-01",
            "productState": "Ready for bottling",
            "ownerName": "YV Wines Pty Ltd",
            "components": [
                {
                    "percentage": 5,
                    "year": 2011,
                    "variety": "Pinot Noir",
                    "region": "Mornington"
                },
                {
                    "percentage": 80,
                    "year": 2011,
                    "variety": "Chardonnay",
                    "region": "Yarra Valley"
                },
                {
                    "percentage": 5,
                    "year": 2010,
                    "variety": "Pinot Noir",
                    "region": "Macedon"
                },
                {
                    "percentage": 10,
                    "year": 2010,
                    "variety": "Chardonnay",
                    "region": "Macedon"
                }
            ]
        }
    ]
}
```

## Future improvements
* Add endpoints for creating, deleting or modifying wines
* Improve the search field to check all attributes for a match
