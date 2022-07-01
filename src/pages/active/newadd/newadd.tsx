import { Popover, Steps } from 'antd';
import type { StepsProps } from 'antd';
import Basicfrom from './basicfrom/basicfrom';
import Addfooter from './addfooter/addfooter';
import React,{useState,useRef} from 'react';
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
      const [total,setTotul]=useState([])
      const [nonefrom,setNonefrom]=useState("1")
      const tabfrom=(key:any)=>{
        setNonefrom(key)
      }
      const ceshiref1=useRef(null)
      /* 触发表单一的提交 */
      const getform1=()=>{
        ceshiref1.current.submit()
      }
       /* 获取表单1的数据 */
       const gettotal=(cont:any)=>{
        console.log("表单1的数据",cont);
        
      }
         /* 触发表单二的提交 */
      const ceshiref2=useRef(null)
      const getform2=()=>{
        console.log("ceshiref2",ceshiref2);
        ceshiref2.current.submit()
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
                <Basicfrom ref={ceshiref1} tabfrom={tabfrom} gettotal={gettotal}/>
              </div>
              <div style={{display:`${nonefrom==="2"?"block":"none"}`}}>
                <Basfrom ref={ceshiref2} getform1={getform1}/>
              </div>
            </div>
            <div className='newadd_footer'>
                <Addfooter nonefrom={nonefrom} tabfrom={tabfrom} />
            </div>
        </div>
    )
}

export default Newadd