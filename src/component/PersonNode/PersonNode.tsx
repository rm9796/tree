import { useMemo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PersonNode.scss';
import { SpouseNode, RenderNode } from 'types';
export interface PersonNodeProps {
  id: number;
  name: string;
  myChildren: number[];
  gender: string;
  isSpouse: boolean;
  getSpouse: (id: number) => SpouseNode | null;
  getChild: (id: number) => RenderNode | null;
}

export const PersonNode = ({
  id,
  name,
  myChildren,
  gender,
  isSpouse,
  getSpouse,
  getChild,
}: PersonNodeProps) => {
  const MySpouse = useMemo(() => {
    if (myChildren.length && !isSpouse) {
      return (
        <PersonNode
          {...(getSpouse(id) as SpouseNode)}
          getChild={getChild}
          getSpouse={getSpouse}
        />
      );
    }
    return null;
  }, [getChild, getSpouse, id, isSpouse, myChildren]);

  const ChildrenList = useMemo(() => {
    if (myChildren.length && !isSpouse) {
      return myChildren.map((childId) => {
        const childData = getChild(childId);
        if (childData) {
          return (
            <Fragment key={childId}>
              <PersonNode
                {...(getChild(childId) as RenderNode)}
                getChild={getChild}
                getSpouse={getSpouse}
              />
            </Fragment>
          );
        }
        return null;
      });
    }
    return null;
  }, [getChild, getSpouse, isSpouse, myChildren]);

  return (
    <div className='tree-container'>
      <div className='parents'>
        <div className={`my-node ${gender === 'male' ? 'male' : 'female'}`}>
          <span className='my-node__icon'>
            <FontAwesomeIcon icon='user' />
          </span>
          <span className='my-node__text'>{name}</span>
        </div>
        {MySpouse}
      </div>
      {isSpouse
        ? null
        : ChildrenList && <div className='children-list'>{ChildrenList}</div>}
    </div>
  );
};
