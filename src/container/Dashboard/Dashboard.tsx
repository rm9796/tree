import { PersonNode } from 'component';
import { treeService } from 'lib/treeService';
import './dashboard.scss';

export const Dashboard = () => {
  const foundRoots = treeService.getRoots();

  return (
    <div className='dashboard-container'>
      {foundRoots ? (
        <PersonNode
          {...foundRoots}
          getChild={treeService.getChild}
          getSpouse={treeService.getSpouse}
        />
      ) : null}
    </div>
  );
};
