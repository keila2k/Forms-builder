import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormsService} from '../services/forms.service';
import {Form} from '../Form';
import {FieldSubmission, Submission} from '../FieldSubmission';
declare const grecaptcha: any;

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css']
})
export class FormSubmitComponent implements OnInit {
  form: Form;
  submission: Submission = new Submission();

  constructor(private route: ActivatedRoute,
              private formsService: FormsService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
        const formId = params['id'];
        this.formsService.getForm(formId).subscribe( retForm => {
            this.form = retForm;
            retForm.fields.map(formField => {
              const fieldSubmit: FieldSubmission = ({field: formField, inputValue: '' });
              this.submission.fieldSubmissions.push(fieldSubmit);
            } );
          }
        );
      }
    );
  }

  onSubmit() {
    const response = grecaptcha.getResponse();
    this.formsService.addFormSubmission(response, this.form , this.submission).subscribe();
    // location.reload();
    // this.router.navigate(['']);
  }
}
