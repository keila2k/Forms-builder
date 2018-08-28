var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var fs = require('fs');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var forms;

/*
  fs.readFile('formsDB.json', JSON, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      forms = JSON.parse(data);
    }
  });
*/
/*var forms = [
  {
    "id": 0,
    "name": "magna voluptate",
    "submissions": [],
    "fields": [
      {
        "fieldName": "date",
        "type": "date"
      },
      {
        "fieldName": "email",
        "type": "email"
      }
    ]
  },
  {
    "id": 1,
    "name": "deserunt nostrud",
    "submissions": [],
    "fields": [
      {
        "fieldName": "color",
        "type": "color"
      },
      {
        "fieldName": "date",
        "type": "date"
      }
    ]
  },
  {
    "id": 2,
    "name": "sit eiusmod",
    "submissions": [],
    "fields": [
      {
        "fieldName": "number",
        "type": "number"
      },
      {
        "fieldName": "email",
        "type": "email"
      },
      {
        "fieldName": "color",
        "type": "color"
      }
    ]
  },
  {
    "id": 3,
    "name": "elit fugiat",
    "submissions": [],
    "fields": [
      {
        "fieldName": "tel",
        "type": "tel"
      },
      {
        "fieldName": "date",
        "type": "date"
      },
      {
        "fieldName": "color",
        "type": "color"
      }
    ]
  },
  {
    "id": 4,
    "name": "nisi esse",
    "submissions": [],
    "fields": [
      {
        "fieldName": "color",
        "type": "color"
      },
      {
        "fieldName": "date",
        "type": "date"
      },
      {
        "fieldName": "tel",
        "type": "tel"
      }
    ]
  },
  {
    "id": 5,
    "name": "dolor veniam",
    "submissions": [],
    "fields": [
      {
        "fieldName": "email",
        "type": "email"
      }
    ]
  },
  {
    "id": 6,
    "name": "ea incididunt",
    "submissions": [],
    "fields": [
      {
        "fieldName": "color",
        "type": "color"
      },
      {
        "fieldName": "email",
        "type": "email"
      },
      {
        "fieldName": "number",
        "type": "number"
      }
    ]
  },
  {
    "id": 7,
    "name": "pariatur incididunt",
    "submissions": [],
    "fields": [
      {
        "fieldName": "number",
        "type": "number"
      },
      {
        "fieldName": "tel",
        "type": "tel"
      }
    ]
  }
]*/;
/*==================== GET ====================*/
// Get forms
app.get('/api/forms', function (req, res) {
  res.send(forms);
});

// Get form
app.get('/api/forms/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  for( var i = 0; i < forms.length; i++){
    if(id === forms[i].id){
      res.status(200).send(forms[i]);
      return;
    }
  }
  res.status(500).send("Request Failed");
});

/*==================== Post ====================*/

// Add form
app.post('/api/forms', function (req, res) {
  const newForm= req.body
  newForm.id = forms.length
  if (forms.length !== forms.push(newForm)){
    res.status(200).send(newForm)
    fs.writeFileSync('formsDB.json', JSON.stringify(forms), 'utf8');
  } else {
    res.status(500).send('Error with form id')
  }
});

// Add submission to form
app.post('/api/forms/:id/submissions', function (req, res) {
  var found = false;
  var id = parseInt(req.params.id, 10);
  for( var i = 0; i < forms.length; i++) {
    if (id === forms[i].id) {
      const newSubmission = req.body
      forms[i].submissions.push(newSubmission);
      res.status(200).send(newSubmission);
      fs.writeFileSync('formsDB.json', JSON.stringify(forms), 'utf8');
      found = true;
    }
  }
  if (!found){
    res.status(500).send('There was an error with the submission');
  }
});

app.listen(3000, function () {
  forms = JSON.parse(fs.readFileSync('formsDB.json','utf8'));
  console.log("First API running on port 3000!");
});
