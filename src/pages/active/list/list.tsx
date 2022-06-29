import React,{useEffect,useState} from "react";
import { activity } from "@/api/activeapi";
import { Space, Table, Tag } from 'antd';
import { useSetState } from 'ahooks';
import { history } from "umi";
interface State {
    /* [activityStatus: number]: any;
    activityName:string,
    queryStartDate:string,
    queryEndDate:string,
            activityStatus:array, */
    page:number,
    pageSize:number,
    isDraft:number,
    [key: string]: any;
  }

const Activity=(props:any)=>{
    const {tabname,activityName,queryStartDate,queryEndDate}=props
    const[loading,setLoading]=useState(true)
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
                <div style={{color:"#1585FF"}} onClick={()=>{gotolist(record)}}>详情</div>
              </Space>
            ),
          },
       
    ];
      /* 列表数据 */
    const [data,setData]=useState([{
        creator:"",//创建人
        activityName:"",//名称
        gmtCreated:"",//创建时间
        Date:"",
        key: '',
        activityStatus:"1"
    }])
    /* 分页配置 */
    const [listobj,setListobj]=useSetState<State>({
            page:1,
            pageSize:10,
            isDraft:0
    })
    /* 加载数据 */
      useEffect(()=>{
        setLoading(true)
        let obj={
            activityName:activityName,
            queryStartDate:queryStartDate,
            queryEndDate:queryEndDate,
            activityStatus:[] as any[],
            page:1,
            pageSize:10,
            isDraft:0
        }
        if(tabname==="0"){
            obj.activityStatus=[]
        }else if(tabname==="6"){
            obj.isDraft=1
        }
        else{
            obj.activityStatus=[Number(tabname)]
            obj.isDraft=0
        }
        getlist(obj)
    },[tabname,activityName,queryStartDate,queryEndDate])

    
    /* 调用接口 */
    const getlist=(obj:any)=>{
        activity(obj).then(res=>{
            console.log('接口返回的列表内容',res);
            const {data:{code,data:{rows,total}}}=res
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
                        key:item.activityBasicId,
                        creator:item.creator,//创建人
                        activityName:item.activityName,//名称
                        gmtCreated:item.gmtCreated,//创建时间
                        Date:item.startDate+"-"+item.endDate,
                        activityStatus:item.activityStatus
                    })
                })
                setLoading(false)
                setPagination({ total:total  })
                console.log('处理后的列表数据',arr1);
                setData(arr1)
            }
        })
    }

    /* 分页配置 */
    const [pagination, setPagination] = useSetState({
        current: 1,
        pageSize: 10,
        total:0,
        showTotal:(total:any)=>`共 ${total} 条`,
        showQuickJumper:true
      })
    /* 点击分页 */
    const handleTableChange = (newPagination:any, filters:any, sorter:any) => {
        const{current,pageSize}=newPagination
        setLoading(true)
        setPagination({current:current,pageSize:pageSize})
        let obj={
             activityName:activityName,
             queryStartDate:queryStartDate,
             queryEndDate:queryEndDate,
             activityStatus:[] as any[],
             page:current,
             pageSize:pageSize,
             isDraft:0
         }
         if(tabname==="0"){
             obj.activityStatus=[]
         }else if(tabname==="6"){
             obj.isDraft=1
         }else{
             obj.activityStatus=[Number(tabname)]
             obj.isDraft=0
         }
         getlist(obj)
      };
    /* 详情 */
    const gotolist=(record:any)=>{
        console.log("详情",record);
        history.push({
            pathname:'/active/details',
            query:{activityBasicId:record.key}
        })
    }
    return(
        <div>
            <Table 
                columns={columns} 
                dataSource={data} 
                loading={loading} 
                pagination={pagination} 
                onChange={handleTableChange} 
            />
        </div>
    )
}
export default Activity
