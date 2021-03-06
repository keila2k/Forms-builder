import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Form} from '../Form';
import {Submission} from '../FieldSubmission';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>('http://localhost:3000/api/forms');
  }

  getForm(formId: number): Observable<Form> {
    return this.http.get<Form>(`http://localhost:3000/api/forms/${formId}`);
  }

  addFormSubmission(recaptchaResponse: string , form: Form, submission: Submission) {
    this.http.post(`http://localhost:3000/api/recaptcha`, recaptchaResponse).subscribe();
    // inside promise =>  (if error => return error , else execute the line underneath)
    // return this.http.post<Submission>(`http://localhost:3000/api/forms/${form.id}/submissions`, submission);
  }

  addForm(form: Form) {
    return this.http.post<Form>(`http://localhost:3000/api/forms/`, form);
  }
}
