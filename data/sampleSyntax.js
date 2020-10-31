const sampleSyntax = `{
  "account":{
     "name":"Campus Laundromat",
     "alias":"cl",
     "account":[
        {
           "name":"Assets",
           "alias":"asset",
           "dbCr":"-",
           "account":[
              {
                 "name":"Cash",
                 "alias":"cash"
              },
              {
                 "name":"Prepaid Insurance",
                 "alias":"pIns"
              },
              {
                 "name":"Laundry Equipment",
                 "alias":"lEquip"
              }
           ]
        },
        {
           "name":"Liabilities",
           "alias":"liability",
           "account":[
              {
                 "name":"Notes Payable",
                 "alias":"np"
              },
              {
                 "name":"Accounts Payable",
                 "alias":"ap"
              }
           ]
        },
        {
           "name":"Owner's Equity",
           "alias":"oe",
           "account":[
              {
                 "name":"Bob Sample, Capital",
                 "alias":"bsc"
              },
              {
                 "name":"Bob Sample, Drawing",
                 "alias":"bsd",
                 "dbCr":"-"
              },
              {
                 "name":"Revenue",
                 "alias":"rev",
                 "account":[
                    {
                       "name":"Service Revenue",
                       "alias":"serRev"
                    }
                 ]
              },
              {
                 "name":"Expense",
                 "dbCr":"-",
                 "alias":"exp",
                 "account":[
                    {
                       "name":"Advertising Expense",
                       "alias":"advExp"
                    },
                    {
                       "name":"Rent Expense",
                       "alias":"rentExp"
                    }
                 ]
              }
           ]
        }
     ]
  },
  "transactions":[
     {
        "date":"9/1/2010",
        "entry":[
           "cash",
           "bsc",
           20000
        ],
        "explanation":"Owner’s investment of cash in business"
     },
     {
        "date":"9/2/2010",
        "entry":[
           "-cash",
           "rentExp",
           1000
        ],
        "explanation":"Paid September rent"
     },
     {
        "date":"9/3/2010",
        "entry":[
           "lEquip",
           25000,
           "-cash",
           10000,
           "+np",
           15000
        ],
        "explanation":"Purchased laundry equipment for cash and 6-month, 12% note payable"
     },
     {
        "date":"9/4/2010",
        "entry":[
           "pIns",
           "-cash",
           1200
        ],
        "explanation":"Paid one-year insurance policy"
     },
     {
        "date":"9/4/2010",
        "entry":[
           "advExp",
           "ap",
           200
        ],
        "explanation":"Received bill from Daily News for advertising"
     },
     {
        "date":"9/20/2010",
        "entry":[
           "-cash",
           "bsd",
           700
        ],
        "explanation":"Withdrew cash for personal use"
     },
     {
        "date":"9/30/2010",
        "entry":[
           "cash",
           "serRev",
           6200
        ],
        "explanation":"Received cash for services provided"
     }
  ]
}`

export default sampleSyntax
