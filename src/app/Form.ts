import {Field} from './Field';
import {Submission} from './FieldSubmission';

export class Form {
  id: number;
  name: string;
  submissions: Submission[];
  fields: Field[];

  constructor(){
    this.submissions = new Array(<Submission>);
    this.fields = new Array(<Field>);
  }

}
