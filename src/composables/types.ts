export enum Attr {
  Hunt = 'hunting',
  Eng = 'engineering',
  Cre = 'creativity',
  Med = 'medicine',
  Magic = 'magic',
  Charm = 'charismatic',
}

export interface UserAttributes {
  [Attr.Hunt]: number;
  [Attr.Eng]: number;
  [Attr.Cre]: number;
  [Attr.Med]: number;
  [Attr.Magic]: number;
  [Attr.Charm]: number;
  [key: string]: number;
}

export interface User {
  name: string;
  attrs: UserAttributes;
}
