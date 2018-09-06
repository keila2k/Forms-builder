var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var fs = require('fs');
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Http = new XMLHttpRequest();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var forms;
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

// recaptcha
app.post('/api/recaptcha', function (req, res) {
  const recaptchaResponse = req.body;

  //post request with the requested parameters
  var params = 'secret=6Lebtm4UAAAAAJXxW5RgNrpA1QlgeOk0QHNDw3zW&response=' + recaptchaResponse;
  console.log(params);
  Http.open('POST', 'https://www.google.com/recaptcha/api/siteverify');
  Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  Http.send(params);
  // according to this post response return positive/ negative callback for the client (forms.service)
});


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
  console.log("Form builder running on port 3000!");
});
