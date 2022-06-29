
import { Popover, Steps } from 'antd';
import type { StepsProps } from 'antd';
import Basicfrom from './basicfrom/basicfrom';
import React from 'react';
import './newadd.less'
const { Step } = Steps;
const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );


const Newadd=()=>{

    return(
        <div className="newadd">
            <div className="title">
              创建活动
            </div>
            <div className="newadd_header">
              <Steps current={1} progressDot={customDot}>
                  <Step title="基本信息" />
                  <Step  />
                  <Step title="活动信息" />
              </Steps>
            </div>
            <div className='newadd_form'>
              <Basicfrom/>
            </div>
            <div></div>
        </div>
    )
}

export default Newadd