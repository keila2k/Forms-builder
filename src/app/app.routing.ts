import { Routes, RouterModule } from '@angular/router';
import {FormsListComponent} from './forms-list/forms-list.component';
import {FormSubmitComponent} from './form-submit/form-submit.component';
import {FormSubmissionsComponent} from './form-submissions/form-submissions.component';
import {AddFormComponent} from './add-form/add-form.component';

export const appRoutes: Routes = [
  { path: '', component: FormsListComponent },
  { path: 'forms/submit/:id', component: FormSubmitComponent },
  { path: 'forms/submissions/:id', component: FormSubmissionsComponent },
  { path: 'addform', component: AddFormComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
