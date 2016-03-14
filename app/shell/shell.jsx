import React from 'react'
import electron from 'electron'
import { App, Split, Sidebar, Header, Article, Section, Icons, Box, Title, Menu } from 'grommet'

const appCfg = electron.remote.app.sysConfig();

export default class Shell extends React.Component {

  render() {
    return (
       <App centered={false}>
         <Split flex="right" fixed={true}>
           <Sidebar size="small" colorIndex="grey-1" fixed={true}>
              <Header pad={{horizontal: 'small'}}>
                <Icons.Base.Menu/>
              </Header>
              <Menu>
              </Menu>
           </Sidebar>
           <Article>
            <Header size="small" justify="between" colorIndex="grey-1" pad="small">
              <Title>
                { appCfg.app.name } { appCfg.app.version }
              </Title>
            </Header>
            <Section>{ this.props.children }</Section>
           </Article>
         </Split>
       </App>
    );
  };
};
