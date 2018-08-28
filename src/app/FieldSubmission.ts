import {Field} from './Field';

export class FieldSubmission {
  field: Field
  inputValue: any;
}

export class Submission {
  fieldSubmissions: FieldSubmission[];

  constructor() {
    this.fieldSubmissions = [];
  }
}
