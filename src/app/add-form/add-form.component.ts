import { Component, OnInit } from '@angular/core';
import {Form} from '../Form';
import {Field, type} from '../Field';
import {FormsService} from '../services/forms.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  form: Form = new Form();
  field: Field = new Field();

  constructor(private formsService: FormsService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.form.fields.push(({fieldName: this.field.fieldName, type: this.field.type}));
  }

  addForm() {
    this.formsService.addForm(this.form).subscribe();
    location.reload();
    this.router.navigate(['']);

  }
}
