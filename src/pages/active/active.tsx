import './active.less'
import { Tabs,Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Actsear from './search/actsearch';
import Activity from './list/list';
const { TabPane } = Tabs;
import React,{useState,useEffect} from 'react';
import Details from './details/details';
import { history } from "umi";


const Active=(props:any)=>{
    
    const {location:{pathname},route}=props
    const[tabname,setTabname]:any=useState("0")
    const[activityName,setActivityName]=useState("")
    const[queryStartDate,setQueryStartDate]=useState("")
    const[queryEndDate,setQueryEndDate]=useState("")

    useEffect(()=>{
      let tex= tabname?tabname:"0"
    },[])
    /* 切换 */
    const onChange = (key: any) => {
        setTabname(key)
      };
    /* 新增 */
    const newadd=()=>{
        history.push({
            pathname:'/active/newadd',
        })
        
    }
    /* 搜索 */
    const onsearch=(name:any)=>{
        setActivityName(name.name)
        if(name.time){
            setQueryStartDate(formatDate(name.time[0]._d))
            setQueryEndDate(formatDate(name.time[1]._d))
        }
    }

    /* 重置 */
    const onrest=()=>{
        setActivityName("")
        setQueryStartDate("")
        setQueryEndDate("")
    }

    const formatDate = (date:any) => {
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + '-' + m + '-' + d;  
      }
      
      
    return(
        pathname==="/active/details" ||pathname==="/active/newadd"?
        props.children:
        <div className="active">
            <div className="active_title">
                创建活动
            </div>
            <Tabs defaultActiveKey="0" onChange={onChange} >
                <Actsear onsearch={onsearch} onrest={onrest} />
                <TabPane tab="全部" key="0" >
                    <Button className='active_but' icon={<PlusOutlined /> }style={{marginBottom:"10px"}} onClick={newadd}>创建活动</Button>
                    <Activity activityName={activityName} queryStartDate={queryStartDate} queryEndDate={queryEndDate}  tabname={tabname}/>
                </TabPane>
                <TabPane tab="待审核" key="1">
                    <Button className='active_but' icon={<PlusOutlined /> }style={{marginBottom:"10px"}} onClick={newadd}>创建活动</Button>
                    <Activity activityName={activityName} queryStartDate={queryStartDate} queryEndDate={queryEndDate}   tabname={tabname}/>
                </TabPane>
                <TabPane tab="进行中" key="2">
                    <Button className='active_but' icon={<PlusOutlined /> }style={{marginBottom:"10px"}} onClick={newadd}>创建活动</Button>
                    <Activity activityName={activityName} queryStartDate={queryStartDate} queryEndDate={queryEndDate}  tabname={tabname}/>
                </TabPane>
                <TabPane tab="未开始" key="3">
                    <Button className='active_but' icon={<PlusOutlined /> }style={{marginBottom:"10px"}} onClick={newadd}>创建活动</Button>
                    <Activity activityName={activityName} queryStartDate={queryStartDate} queryEndDate={queryEndDate}  tabname={tabname}/>
                </TabPane>
                <TabPane tab="已驳回" key="4">
                    <Button className='active_but' icon={<PlusOutlined /> }style={{marginBottom:"10px"}} onClick={newadd}>创建活动</Button>
                    <Activity activityName={activityName} queryStartDate={queryStartDate} queryEndDate={queryEndDate}  tabname={tabname}/>
                </TabPane>
                <TabPane tab="已结束" key="5">
                    <Button className='active_but' icon={<PlusOutlined /> }style={{marginBottom:"10px"}} onClick={newadd}>创建活动</Button>
                    <Activity activityName={activityName} queryStartDate={queryStartDate} queryEndDate={queryEndDate}  tabname={tabname}/>
                </TabPane>
                <TabPane tab="草稿箱" key="6">
                    <Button className='active_but' icon={<PlusOutlined /> }style={{marginBottom:"10px"}} onClick={newadd}>创建活动</Button>
                    <Activity activityName={activityName} queryStartDate={queryStartDate} queryEndDate={queryEndDate}  tabname={tabname}/>
                </TabPane>
            </Tabs>
            
        </div>
    )
}

export default Active