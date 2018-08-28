export enum type {
  text,
  color,
  date,
  email,
  tel,
  number,
}

export class Field {
  fieldName: string;
  type: type;
  constructor() {
}
}
