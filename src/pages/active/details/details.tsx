import { useLocation } from "umi"
import { Tabs, Collapse } from 'antd';
import React,{useEffect,useState} from 'react';
import { activitylist } from "@/api/activeapi";
import  './index.less'


const { TabPane } = Tabs;
const { Panel } = Collapse;

const Details=(props:any)=>{

    const[datat,setDatat]:any=useState({
       /*  activityName:"",
        activitySite:"",
        startDate:"",
        endDate:"",
        activityContent:"" */

    })
    const onChange = (key: string) => {
        console.log(key);
      };
    const {location:{query}}=props
    useEffect(()=>{
        activitylist({"activityBasicId":query.activityBasicId}).then((res)=>{
            const {data:{code,data}}=res
            console.log("详情数据",res);
            if(code===200){
                setDatat(data)
            }
        })
    },[])
    const oncollpane = (key: string | string[]) => {
        console.log(key);
      };
    return(
        <div className="details">
            <p className="details_title">详情</p>
            <Tabs defaultActiveKey="1" className="styles.details_tab" tabBarGutter={30} tabBarStyle={{fontSize:"22px !important"}} onChange={onChange} >
                <TabPane tab="基本信息" key="1" >
                    <div className="details_cont">
                        <span className="details_contspan1">活动名称：</span>
                        <span className="details_contspan2">{datat.activityName}</span>
                    </div>
                    <div>
                        <span className="details_contspan1">活动地点：</span>
                        <span className="details_contspan2">{datat.activitySite}</span>
                    </div>
                    <div>
                        <span className="details_contspan1">活动时间：</span>
                        <span className="details_contspan2">{datat.startDate} - {datat.endDate}</span>
                    </div>
                    <div>
                        <span className="details_contspan1">活动内容：</span>
                        <span className="details_contspan2">{datat.activityContent}</span>
                    </div>
                    <div>
                        <span className="details_contspan1">日程安排</span>
                        {
                            datat.scheduleVOS? datat.scheduleVOS.map((item:any)=>{
                                return <span key={item.scheduleId} className="details_contspan2">{item.scheduleName} {item.scheduleDate}</span>
                            }):""
                        }
                    </div>
                </TabPane>
                <TabPane tab="活动信息" key="2">
                    <Collapse defaultActiveKey={['1']} onChange={oncollpane}>
                        <Panel header="This is panel header 1" key="1">
                            <p>1</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2">
                            <p>2</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3">
                            <p>3</p>
                        </Panel>
                    </Collapse>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Details