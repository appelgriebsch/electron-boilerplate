// @flow
import React from 'react';
import Radium from 'radium'

import { Card, CardText, CardActions, CardTitle, CardMenu } from 'react-mdl';
import { Button, IconButton } from 'react-mdl';

/**
* Renders a component like Google Now Card.
*/
class PluginCard extends React.Component {

  pluginName: string;
  cardActionsButtonText: string;
  cardText: string;
  cardTitle: string;
  location: string;
  deletePlugin;

/** Creates a new Plugin Card component. */
  constructor(props) {
    super(props)
    this.pluginName = this.props.pluginName
    this.cardActionsButtonText = this.props.cardActionsButtonText
    this.cardText = this.props.cardText
    this.cardTitle = this.props.cardTitle
    this.location = this.props.location
    this.deletePlugin = this.props.onDelete.bind(this)
  }

  propTypes: {
    pluginName: React.PropTypes.string.isRequired,
    cardActionsButtonText: React.PropTypes.string.isRequired,
    cardText: React.PropTypes.string.isRequired,
    cardTitle: React.PropTypes.string.isRequired,
    loation: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  }

  render () {
    return (
      <div>
      <Card shadow={0} style={{width: '62%', margin: 'auto'}}>
      <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>{this.cardTitle}</CardTitle>
      <CardText>
      {this.cardText}
      </CardText>
      <CardActions border>
      {/*<Button colored value={this.pluginName}>{this.cardActionsButtonText}</Button>*/}
      </CardActions>
      <CardMenu style={{color: '#fff'}}>
      <IconButton name="delete" onClick={this.deletePlugin}/>
      </CardMenu>
      </Card>
      </div>
    );
  }
};

export default Radium(PluginCard)
// module.exports = PluginCard
