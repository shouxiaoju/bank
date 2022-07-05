import { Popover, Steps } from 'antd';
import type { StepsProps } from 'antd';
import Basicfrom from './basicfrom/basicfrom';
import Addfooter from './addfooter/addfooter';
import React,{useState,useRef,useEffect} from 'react';
import './newadd.less'
import Basfrom from './basicfrom2/basfrom';
import { activitylist } from '@/api/activeapi';

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
      const {location:{query}}=props
      const [total,setTotul]=useState({})
      const [nonefrom,setNonefrom]=useState("1")
      const [goback,setGoback]=useState({})

      useEffect(()=>{
        if(query["activityBasicId"]){
          activitylist({"activityBasicId":query.activityBasicId}).then((res)=>{
            const {data:{code,data}}=res
            if(code===200){
              setGoback(data)
            }
        })
        }
        
    },[])

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
         let arr=[{
          "scheduleName": cont.schedulesname,
          "scheduleDate":cont.schedulesdata?formatDateTime(cont.schedulesdata._d):""
         }]
         cont.users?cont.users.map((item:any)=>{
            arr.push({
              "scheduleName": item.first,
		          "scheduleDate": formatDateTime(item.last._d)
            })
         }):""
         let obj={
          "activityName": cont.activityName,
          "activityContent": cont.activityContent,
          "activitySite": cont.activitySite,
          "activityOrganizers": cont.activityOrganizers,
          "startDate":formatDateTime(cont.Date[0]._d),
          "endDate": formatDateTime(cont.Date[1]._d),
          "provinceCode": cont.cityCode[0],
          "cityCode": cont.cityCode[1],
          "scheduleVOS":arr,
          "pictureKey":cont.pictureUrl[0].response.data.imgKey,
          "pictureUrl":cont.pictureUrl[0].response.data.imgUrl,
          "thumbnailPictureKey":cont.thumbnailPictureUrl[0].response.data.imgKey,
          "thumbnailPictureUrl":cont.thumbnailPictureUrl[0].response.data.imgUrl,
         }
        console.log("表单1的数据",cont);
        console.log("表单1处理后的数据",obj);
        setTotul(obj)
      }
      /* 处理日期 */

      var formatDateTime = function (date:any) {
        var y = date.getFullYear(); 
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        var second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + d+' '+h+':'+minute; 
      }

        /* 触发表单二的提交 */
      const ceshiref2=useRef(null)
      const getform2=(key:any)=>{
        console.log("ceshiref2",ceshiref2);
        ceshiref2.current.submit(key)
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
                <Basicfrom ref={ceshiref1} tabfrom={tabfrom} gettotal={gettotal} goback={goback}/>
              </div>
              <div style={{display:`${nonefrom==="2"?"block":"none"}`}}>
                <Basfrom ref={ceshiref2} getform1={getform1} total={total} goback={goback} />
              </div>
            </div>
            <div className='newadd_footer'>
                <Addfooter nonefrom={nonefrom} getform1={getform1} getform2={getform2} tabfrom={tabfrom} />
            </div>
        </div>
    )
}

export default Newadd