import React, { useCallback, useMemo } from 'react';
import { PersonNode } from 'component';
import { familyTree } from 'lib/data';
import { FamilyNode } from 'types';
import './dashboard.scss';

export const Dashboard = () => {
  const getSpouse = useCallback((myId: number) => {
    const myNode: FamilyNode | undefined = familyTree.find(
      (treeNode: FamilyNode) => {
        return treeNode.id === myId;
      },
    );
    const myChildren: number[] = myNode?.children || [];
    for (let i = 0; i < myChildren.length; i++) {
      const tempFoundNode: FamilyNode | undefined = familyTree.find(
        (item: FamilyNode) => {
          return item.children.includes(myChildren[i]) && item.id !== myId;
        },
      );
      if (tempFoundNode) {
        return {
          parents: tempFoundNode.parents,
          name: tempFoundNode.name,
          id: tempFoundNode.id,
          myChildren: tempFoundNode.children,
          gender: tempFoundNode.gender,
          isSpouse: true,
        };
      }
    }
    return null;
  }, []);

  const getChild = useCallback((childId: number) => {
    const childNode: FamilyNode | undefined = familyTree.find(
      (treeNode: FamilyNode) => {
        return treeNode.id === childId;
      },
    );
    if (childNode) {
      return {
        name: childNode.name,
        id: childNode.id,
        myChildren: childNode.children || [],
        gender: childNode.gender,
        isSpouse: false,
      };
    }
    return null;
  }, []);

  const foundRoots = useMemo(() => {
    for (let i = 0; i < familyTree.length; i++) {
      if (!familyTree[i].parents.length) {
        const foundSpouseNode = getSpouse(familyTree[i].id);
        if (foundSpouseNode && !foundSpouseNode.parents.length) {
          return {
            id: familyTree[i].id,
            name: familyTree[i].name,
            myChildren: familyTree[i].children,
            gender: familyTree[i].gender,
            isSpouse: false,
          };
        }
      }
    }
    return null;
  }, [getSpouse]);

  return (
    <div className='dashboard-container'>
      {foundRoots ? (
        <PersonNode {...foundRoots} getChild={getChild} getSpouse={getSpouse} />
      ) : null}
    </div>
  );
};
