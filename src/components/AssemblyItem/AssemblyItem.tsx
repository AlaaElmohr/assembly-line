import React from 'react';
import cn from 'classnames';
/*
local files
*/
import { AssemblyItemProps } from './types';
import { BACKWARD, FORWARD } from 'config';
import { helpers } from 'utils';
import styles from './AssemblyItem.module.scss';

const AssemblyItem = ({ isHeader, title, onMoveTask }: AssemblyItemProps) => {
  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    if (event.type === 'click') {
      onMoveTask && onMoveTask(FORWARD);
    } else if (event.type === 'contextmenu') {
      onMoveTask && onMoveTask(BACKWARD);
    }
  };

  return (
    <button
      disabled={isHeader}
      onClick={onMove}
      onContextMenu={onMove}
      className={cn(styles.container, { [styles.header]: isHeader })}
      style={isHeader ? { borderColor: helpers.getColor(title) } : { borderWidth: 0 }}>
      <h4>{title}</h4>
    </button>
  );
};

export default AssemblyItem;
