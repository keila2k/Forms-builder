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
  console.log("Form builder API running on port 3000!");
});
