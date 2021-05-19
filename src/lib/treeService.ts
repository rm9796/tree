import { FamilyNode, RenderNode, SpouseNode } from 'types';
import { familyTree } from 'lib/data';

export class TreeService {
  treeNode: FamilyNode[];

  constructor(node: FamilyNode[]) {
    this.treeNode = node;
  }

  findNodeById = (id: number): FamilyNode | undefined => {
    return this.treeNode.find((treeNode: FamilyNode) => {
      return treeNode.id === id;
    });
  };

  getSpouse = (id: number): SpouseNode | null => {
    const myNode = this.findNodeById(id);
    const myChildren: number[] = myNode?.children || [];
    for (const childId of myChildren) {
      const foundSpouse = this.treeNode.find((item: FamilyNode) => {
        return item.children.includes(childId) && item.id !== id;
      });
      if (foundSpouse) {
        return {
          id: foundSpouse.id,
          name: foundSpouse.name,
          gender: foundSpouse.gender,
          myChildren: foundSpouse.children,
          parents: foundSpouse.parents,
          isSpouse: true,
        };
      }
    }
    return null;
  };

  getChild = (id: number): RenderNode | null => {
    const childNode: FamilyNode | undefined = this.findNodeById(id);
    return childNode
      ? {
          id: childNode.id,
          name: childNode.name,
          gender: childNode.gender,
          myChildren: childNode.children || [],
          isSpouse: false,
        }
      : null;
  };

  getRoots = (): RenderNode | null => {
    for (const familyNode of this.treeNode) {
      if (!familyNode.parents.length) {
        const foundSpouseNode = this.getSpouse(familyNode.id);
        if (foundSpouseNode && !foundSpouseNode.parents.length) {
          return {
            id: familyNode.id,
            name: familyNode.name,
            gender: familyNode.gender,
            myChildren: familyNode.children,
            isSpouse: false,
          };
        }
      }
    }
    return null;
  };
}

export const treeService = new TreeService(familyTree);
