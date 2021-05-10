import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PersonNode.scss';
export interface PersonNodeProps {
  id: number;
  name: string;
  myChildren: number[];
  gender: string;
  isSpouse: boolean;
  getSpouse: (id: number) => any;
  getChild: (id: number) => any;
}

export const PersonNode = (props: PersonNodeProps) => {
  const { name, id, myChildren, gender, isSpouse, getSpouse, getChild } = props;

  const MySpouse = useMemo(() => {
    if (myChildren && myChildren.length !== 0 && !isSpouse) {
      return (
        <PersonNode
          {...getSpouse(id)}
          getChild={getChild}
          getSpouse={getSpouse}
        />
      );
    }
    return null;
  }, [getChild, getSpouse, id, isSpouse, myChildren]);

  const ChildrenList = useMemo(() => {
    if (myChildren && myChildren.length !== 0 && !isSpouse) {
      return myChildren.map((childId) => {
        const childData = getChild(childId);
        if (childData) {
          return (
            <PersonNode
              {...getChild(childId)}
              getChild={getChild}
              getSpouse={getSpouse}
            />
          );
        }
        return null;
      });
    }
    return null;
  }, [getChild, getSpouse, isSpouse, myChildren]);

  return (
    <div className='tree-container'>
      {isSpouse ? (
        <>
          <div className={`my-node ${gender === 'male' ? 'male' : 'female'}`}>
            <span className='my-node__icon'>
              <FontAwesomeIcon icon='user' />
            </span>
            <span className='my-node__text'>{name}</span>
          </div>
          {MySpouse}
        </>
      ) : (
        <div className='parents'>
          <div className={`my-node ${gender === 'male' ? 'male' : 'female'}`}>
            <span className='my-node__icon'>
              <FontAwesomeIcon icon='user' />
            </span>
            <span className='my-node__text'>{name}</span>
          </div>
          {MySpouse}
        </div>
      )}
      {isSpouse ? null : <div className='children-list'>{ChildrenList}</div>}
    </div>
  );
};
