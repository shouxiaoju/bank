import './active.less'
import { Tabs} from 'antd';
import Actsear from './search/actsearch';
import Activity from './list/list';
const { TabPane } = Tabs;
import React,{useState} from 'react';


const Active=()=>{
    const[tabname,setTabname]=useState("0")
    const onChange = (key: any) => {
        console.log(key);
        setTabname(key)
      };
    return(
        <div className="active">
            <div className="active_title">
                创建活动
            </div>
            <Tabs defaultActiveKey="0" onChange={onChange} >
                <Actsear />
                <TabPane tab="全部" key="0" >
                    <Activity tabname={tabname}/>
                </TabPane>
                <TabPane tab="待审核" key="1">
                    <Activity tabname={tabname}/>
                </TabPane>
                <TabPane tab="进行中" key="2">
                    <Activity tabname={tabname}/>
                </TabPane>
                <TabPane tab="未开始" key="3">
                    <Activity tabname={tabname}/>
                </TabPane>
                <TabPane tab="已驳回" key="4">
                    <Activity tabname={tabname}/>
                </TabPane>
                <TabPane tab="已结束" key="5">
                    <Activity tabname={tabname}/>
                </TabPane>
                <TabPane tab="草稿箱" key="6">
                    <Activity tabname={tabname}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Active