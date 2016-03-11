import React from 'react'
import electron from 'electron'
import { App, Split, Sidebar, Header, Article, Section } from 'grommet'

const appCfg = electron.remote.app.sysConfig();

export default class Shell extends React.Component {

  render() {
    return (
       <App centered={false}>
         <Split flex="right" fixed={true}>
           <Sidebar size="small" fixed={true} primary={true}>
            <Header>Navigation</Header>
           </Sidebar>
           <Article>
            <Header>Content</Header>
            <Section>{ this.props.children }</Section>
           </Article>
         </Split>
       </App>
    );
  };
};
