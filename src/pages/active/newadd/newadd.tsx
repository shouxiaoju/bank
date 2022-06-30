
import { Popover, Steps } from 'antd';
import type { StepsProps } from 'antd';
import Basicfrom from './basicfrom/basicfrom';
import Addfooter from './addfooter/addfooter';
import React,{useState} from 'react';
import './newadd.less'
import Basfrom from './basicfrom2/basfrom';
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


const Newadd=(props:any)=>{
      
      const [nonefrom,setNonefrom]=useState("1")
      const tabfrom=(key:any)=>{
        setNonefrom(key)
    }
    return(
        <div className="newadd">
            <div className="title">
              创建活动
            </div>
            <div className="newadd_header">
              <Steps current={Number(nonefrom)} progressDot={customDot}>
                  <Step title="基本信息" />
                  <Step  />
                  <Step title="活动信息" />
              </Steps>
            </div>
            <div className='newadd_form'>
              <div style={{display:`${nonefrom==="1"?"block":"none"}`}}>
                <Basicfrom/>
              </div>
              <div style={{display:`${nonefrom==="2"?"block":"none"}`}}>
                <Basfrom/>
              </div>
            </div>
            <div className='newadd_footer'>
                <Addfooter nonefrom={nonefrom} tabfrom={tabfrom}/>
            </div>
        </div>
    )
}

export default Newadd