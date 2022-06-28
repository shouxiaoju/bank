import React,{useEffect,useState} from "react";
import { activity } from "@/api/activeapi";
import { Space, Table, Tag } from 'antd';
const Activity=(props:any)=>{
    const {tabname}=props

      const columns = [
        {
          title: '活动名称',
          dataIndex: 'activityName',
          key: 'activityName',
          render: (text: any) => {return text;},
        },
        {
          title: '创建人',
          dataIndex: 'creator',
          key: 'creator',
        },
        {
          title: '创建时间',
          dataIndex: 'gmtCreated',
          key: 'gmtCreated',
        },
        {
            title: '活动时间',
            dataIndex: 'Date',
            key: 'Date',
        },
        {
            title: '状态',
            dataIndex: 'activityStatus',
            key: 'activityStatus',
            render: (text:any) =>{
                let col=""
                let tex=""
                /* 1-待审核2-进行中3-未开始4-已驳回5，6-已结束 */
                switch(text){
                    case 1:
                        col="#0C9682"
                        tex="待审核"
                        break;
                    case 2:
                        col="#862DFB";
                        tex="进行中"
                        break;
                    case 3:
                        col="#A0A0A0"
                        tex="未开始"
                        break;
                    case 4:
                        col="#FE4D5C"
                        tex="已驳回"
                        break;
                    case 5:
                        col="#FE4D5C"
                        tex="已结束"
                        break;
                    case 6:
                        col="#FE4D5C"
                        tex="已结束"
                        break;
                    
                }
               return <div style={{color:`${col}`}}>{tex}</div>
            } ,
          },
          {
            title: '操作',
            key: 'action',
            render: (_:any, record:any) => (
              <Space size="middle">
                <div style={{color:"#1585FF"}}>详情 {record.name}</div>
              </Space>
            ),
          },
       
      ];
      
      const [data,setData]=useState([{
        creator:"",//创建人
        activityName:"",//名称
        gmtCreated:"",//创建时间
        Date:"",
        key: '',
        activityStatus:"1"
    }])


      useEffect(()=>{
        
        let obj={
            /* activityName:"",
            queryStartDate:"",
            queryEndDate:"", */
            activityStatus:[],
            page:1,
            pageSize:10,
            isDraft:0
        }
        if(tabname==="0"){
           delete obj.activityStatus
        }else if(tabname==="6"){
            obj.isDraft=1
        }else{
            obj.activityStatus=[Number(tabname)]
            obj.isDraft=0
        }
        activity(obj).then(res=>{
            console.log('res',res);
            const {data:{code,data:{rows}}}=res
            if(code===200){
                let arr1: {
                    creator: any; //创建人
                    activityName: any; //名称
                    gmtCreated: any; //创建时间
                    Date: string; 
                    activityStatus: any;
                    key:string
                }[]=[]
                
               rows.map((item:any)=>{
                    arr1.push({
                        key:item.id,
                        creator:item.creator,//创建人
                        activityName:item.activityName,//名称
                        gmtCreated:item.gmtCreated,//创建时间
                        Date:item.startDate+"-"+item.endDate,
                        activityStatus:item.activityStatus
                    })
                })
                console.log('列表数据',arr1);
                setData(arr1)
            }
            
        })
        

    },[])
    return(
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
export default Activity