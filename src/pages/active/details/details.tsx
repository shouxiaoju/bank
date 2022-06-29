import { useLocation } from "umi"
import { Tabs } from 'antd';
import React,{useEffect,useState} from 'react';
import { activitylist } from "@/api/activeapi";
import  './index.less'


const { TabPane } = Tabs;

const Details=(props:any)=>{

    const[datat,setDatat]=useState({
        activityName:"",
        activitySite:"",
        startDate:"",
        endDate:"",
        activityContent:""

    })
    const onChange = (key: string) => {
        console.log(key);
      };
    const {location:{query}}=props
    useEffect(()=>{
        console.log("query",props);
        activitylist({"activityBasicId":query.activityBasicId}).then((res)=>{
            const {data:{code,data}}=res
            console.log(res);
            if(code===200){
                setDatat(data)
            }
            
        })
    },[])
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
                        <span className="details_contspan2">{datat.startDate}-{datat.endDate}</span>
                    </div>
                    <div>
                        <span className="details_contspan1">活动内容：</span>
                        <span className="details_contspan2">{datat.activityContent}</span>
                    </div>
                    <div>
                        <span className="details_contspan1">日程安排</span>
                        <span className="details_contspan2"></span>
                    </div>
                </TabPane>
                <TabPane tab="活动信息" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Details