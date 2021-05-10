export interface FamilyNode {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
}

export interface ChildNode {
  id: number;
  name: string;
  myChildren: number[];
  gender: string;
  isSpouse: boolean;
}

export interface SpouseNode extends ChildNode {
  parents: number[];
}
