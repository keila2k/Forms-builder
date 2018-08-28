import { Component, OnInit } from '@angular/core';
import {FormsService} from '../services/forms.service';
import {Form} from '../Form';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  forms: Form[];

  constructor(private formsService: FormsService) { }

  ngOnInit() {
    this.getForms();
  }

  private getForms() {
    this.formsService.getForms().subscribe( retForms => this.forms = retForms);
  }
}
