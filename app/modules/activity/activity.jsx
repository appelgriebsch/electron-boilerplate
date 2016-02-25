import React from 'react'
import electron from 'electron'

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

export default class Activity extends React.Component {

  render() {
    return (
      <GridList
      cellHeight={200}>
      </GridList>
    );
  };
};