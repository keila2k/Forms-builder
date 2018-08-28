import { Component, OnInit } from '@angular/core';
import {FormsService} from '../services/forms.service';
import {ActivatedRoute} from '@angular/router';
import {Form} from '../Form';
import {Submission} from '../FieldSubmission';

@Component({
  selector: 'app-form-submissions',
  templateUrl: './form-submissions.component.html',
  styleUrls: ['./form-submissions.component.css']
})
export class FormSubmissionsComponent implements OnInit {
  form: Form;
  submissions: Submission[];

  constructor(private route: ActivatedRoute, private formsService: FormsService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const formId = params['id'];
      this.formsService.getForm(formId).subscribe( retForm => {
        this.form = retForm;
        this.submissions = retForm.submissions;
      });

    });
  }
}
