// @flow
import React from 'react';
import Radium from 'radium'

import { Card, CardText, CardActions, CardTitle, CardMenu } from 'react-mdl';
import { Button, IconButton } from 'react-mdl';


/**
* Renders a component like Google Now Card.
*/
class PluginCard extends React.Component {

/** Creates a new Plugin Card component. */
  constructor(props) {
    super(props)
    this.deletePlugin = this.deletePlugin.bind(this)
  }

  propTypes: {
    pluginName: React.PropTypes.string.isRequired,
    cardActionsButtonText: React.PropTypes.string.isRequired,
    cardText: React.PropTypes.string.isRequired,
    cardTitle: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    banner: React.PropTypes.string.isRequired,
    removable: React.PropTypes.bool.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  }

  deletePlugin(event)
  {
    console.log('location ' + this.props.location);
    this.props.onDelete(this.props.location)
  }

  render () {

    const bannerStyle = {
      color: '#fff',
      height: '176px',
      background: `url(file://${this.props.location}/${this.props.banner}) center / cover`
    }

    const deleteVisible = {
      visibility: this.props.removable ? 'visible' : 'hidden'
    }

    return (
      <Card shadow={0} style={{ width: '62%', margin: 'auto', marginBottom: '2em' }}>
        <CardTitle style={bannerStyle}>{this.props.cardTitle}</CardTitle>
        <CardText>{this.props.cardText}</CardText>
        <CardActions border>
          {/*<Button colored value={this.pluginName}>{this.cardActionsButtonText}</Button>*/}
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
          <IconButton name='delete' style={deleteVisible} onClick={this.deletePlugin}/>
        </CardMenu>
      </Card>
    );
  }
};

// module.exports = PluginCard
export default Radium(PluginCard)
// export PluginCard
