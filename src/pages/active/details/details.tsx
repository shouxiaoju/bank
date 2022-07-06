import { useLocation } from "umi"
import { Tabs, Collapse,Row,Col,Image,Button } from 'antd';
import React,{useEffect,useState} from 'react';
import { activitylist } from "@/api/activeapi";
import  './index.less'


const { TabPane } = Tabs;
const { Panel } = Collapse;

const Details=(props:any)=>{

    const[datat,setDatat]:any=useState({})
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
    const  goactive=()=>{
        console.log(props);
        props.history.go(-1)
        
    }
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
                    <div style={{marginBottom:"30px"}}>
                        <span className="details_contspan1">日程安排</span>
                        {
                            datat.scheduleVOS? datat.scheduleVOS.map((item:any)=>{
                                return <span key={item.scheduleId} className="details_contspan2">{item.scheduleName} {item.scheduleDate}</span>
                            }):""
                        }
                    </div>
                    <Button type="primary" onClick={goactive}>返回</Button>
                </TabPane>
                <TabPane tab="活动信息" key="2">
                    <Collapse 
                        defaultActiveKey={['1','2']} 
                        onChange={oncollpane}
                        bordered={false}
                        expandIconPosition="end"
                        className=""
                    >
                        {
                        datat.activityVOS?datat.activityVOS.map((item:any)=>{
                                if(item.activityType==1){
                                  return  <Panel header="报名" key="1">
                                        <Row>
                                            <Col span={24} className="details_contentcol">
                                                <span className="details_contentcolspan1"></span> <span>基本信息</span> 
                                            </Col>
                                            <Col span={24}>
                                                <div className="details_div" >活动时间：
                                                    <span className="details_span">
                                                        {item.startDate} - {item.endDate}
                                                    </span>
                                                </div>
                                                <div className="details_div">报名人数：<span className="details_span">{item.numberLimit}</span></div>
                                            </Col>
                                            <Col span={24} className="details_contentcol">
                                                <span className="details_contentcolspan1"></span> <span>参加活动者填写的信息</span> 
                                            </Col>
                                            <Col span={24}>
                                                {
                                                    item.requiredEntryForms.map((itemk:any,index:any)=>{
                                                        return <span key={index} className="details_actuvespan">{itemk.key}</span>
                                                    })
                                                }
                                                
                                            </Col>
                                            <Col span={24} className="details_contentcol">
                                                <span className="details_contentcolspan1"></span> <span>补充项目</span> 
                                            </Col>
                                            <Col span={24}>
                                                <div  className="details_div">项目名称：{
                                                    item.optionalEntryForms.length>0?item.optionalEntryForms.map((itemke:any,index:any)=>{
                                                        return <span key={index} className="details_colspan">{itemke.key}</span>
                                                    }):""
                                                }</div>
                                            </Col>
                                        </Row>
                                    </Panel>
                                }
                                if(item.activityType==2){
                                    return <Panel header="投票" key="2">
                                    <Row style={{display:"block"}}>
                                        <Col span={24} className="details_contentcol">
                                            <span className="details_contentcolspan1"></span> <span>基本信息</span> 
                                        </Col>
                                        <Col span={24}>
                                            <div className="details_div" >活动时间：
                                                <span className="details_span">
                                                {item.startDate} - {item.endDate}       
                                                </span>
                                            </div>
                                            <div className="details_div">投票方式：<span className="details_span">{item.voteWay==1?"只可投一次":"可投多次"}</span></div>
                                        </Col>
                                        <Col span={24} className="details_contentcol">
                                            <span className="details_contentcolspan1"></span> <span>投票对象</span> 
                                        </Col>
                                        {
                                            item.voteObjectVOS.length>0?item.voteObjectVOS.map((item:any)=>{
                                                return <Row key={item.id}>
                                                <Col span={12} style={{marginBottom:"10px"}}>
                                                    <div className="details_div" >姓名：
                                                        <span className="details_span">
                                                            {item.name}        
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div className="details_div" >说明：
                                                        <span className="details_span">
                                                            {item.instructions}      
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col span={2}>
                                                    <div className="details_div">图片</div>
                                                </Col>
                                                
                                                <Col span={22}>
                                                <Image
                                                        width={200}
                                                        src={item.pictureUrl}
                                                    />
                                                </Col>
                                            </Row>
                                            }):""
                                        }
                                    </Row>
                                </Panel>
                                }
                            }):""
                        }
                        
                        
                        {/* <Panel header="This is panel header 3" key="3">
                            <p>3</p>
                        </Panel> */}
                    </Collapse>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Details