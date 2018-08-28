import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import {FormsService} from './services/forms.service';
import {HttpClientModule} from '@angular/common/http';
import { FormSubmitComponent } from './form-submit/form-submit.component';
import {RouterModule} from '@angular/router';
import {appRoutes, routing} from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormSubmissionsComponent } from './form-submissions/form-submissions.component';
import { AddFormComponent } from './add-form/add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsListComponent,
    FormSubmitComponent,
    FormSubmissionsComponent,
    AddFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
