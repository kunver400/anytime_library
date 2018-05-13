import React from 'react';
import {Layout,Icon} from 'antd';

const {Footer} = Layout;

const FooterWrapper = () => {
    return(
        <Footer style={{'color':'#baf5ff61', textAlign: 'center', fontSize: '12px'}}>
          Anytime Library ©2018 by kunal verma
          <a href="https://github.com/kunver400/anytime_library" style={{paddingLeft: '10px'}}><Icon type="github" /> github</a>
      </Footer>
    )
}

export default FooterWrapper;