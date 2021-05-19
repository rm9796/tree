export interface FamilyNode {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
}

export interface RenderNode {
  id: number;
  name: string;
  gender: string;
  myChildren: number[];
  isSpouse: boolean;
}

export interface SpouseNode extends RenderNode {
  parents: number[];
}
