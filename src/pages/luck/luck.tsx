import { Button, Form, Input,Row,Col,Select,Table,Space } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useState,useEffect, SetStateAction } from 'react';
import { getluck } from '@/api/activeapi';
import { useSetState } from 'ahooks';
import './luck.less'
import { history } from "umi";
  
  

const { Option } = Select;

const Luckdraw=(props:any)=>{
    const {location:{pathname}}=props
    const columns:any = [
        {
          title: '活动名称',
          dataIndex: 'activityName',
          key: 'activityName',
          //render: (text:any) =><span>{text}</span>,
        },
        {
          title: '活动状态',
          dataIndex: 'activityState',
          key: 'activityState',
          render:(text:any)=>{
              let tex=""
              let col=""
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
            }
            return <div style={{color:`${col}`}}>{tex}</div>
          }
        },
        {
          title: '抽奖活动时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
            title: '公开方式',
            dataIndex: 'fangshi',
            key: 'fangshi',
        },
        {
          title: '操作',
          key: 'action',
          render: (_:any, record:any) => (
              <span onClick={()=>{goluck(record)}} style={{color:"#1585FF"}}>设置白名单</span>
          ),
        },
      ];

    const [form] = Form.useForm();
    const [data ,setData] = useState([])
    const[loading,setLoading]=useState(true)
    const[activityName,setActivityName]=useState("")
    const[activityState,setActivityState]=useState(1)
     /* 分页配置 */
     const [pagination, setPagination] = useSetState({
        current: 1,
        pageSize: 10,
        total:0,
        showTotal:(total:any)=>`共 ${total} 条`,
        showQuickJumper:true,
        showSizeChanger:true
        
            
      })

    const getList=(key:any)=>{
        setLoading(true)
        getluck(key).then((res:any)=>{
            if(res.data.code===200){
                let arr:any=[]
                const {data:{data:{rows,total}}}=res
                rows.map((item:any)=>{
                    arr.push({
                        key: item.activityBasicId,
                        activityName: item.activityName,
                        activityState: item.activityStatus,
                        time: item.startDate + " - " +item.endDate,
                        fangshi:"白名单用户"
                    })
                })
                setData(arr)
                setLoading(false)
                setPagination({ total:total })
            }
        })
    }

    useEffect(()=>{
        const obj={
            activityName: "" ,
            activityState: 1 ,//1 待审核 2进行中 3 未开始 4 已驳回 5已结束
            page: pagination.current,
            pageSize: pagination.pageSize,
            
        }
        getList(obj)
    },[])


    const searchluck=()=>{
        let values=form.getFieldsValue()
        const obj={
            activityName: "" ,
            activityState: 1 ,//1 待审核 2进行中 3 未开始 4 已驳回 5已结束
            page: pagination.current,
            pageSize: pagination.pageSize,
            
        }
        if(values.activityName){
            setActivityName(values.activityName)
            obj.activityName=values.activityName
        }else{
            setActivityName("")
            obj.activityName=""
        }
        if(values.activityState){
            setActivityState(values.activityState)
            obj.activityState=values.activityState
        }else{
            setActivityState(1)
            obj.activityState=1
        }
        getList(obj)
    }

    const resetvalue=()=>{
        form.resetFields()
        setActivityName("")
        setActivityState(1)
        const obj={
            activityName: "" ,
            activityState: 1 ,//1 待审核 2进行中 3 未开始 4 已驳回 5已结束
            page: pagination.current,
            pageSize: pagination.pageSize,
            
        }
        getList(obj)
    }

    

    const handleTableChange = (newPagination:any) => {
        console.log(newPagination);
        const {current,pageSize} = newPagination
        
        let obj={
             activityName:activityName,
             activityStatu:activityState,
             page:current,
             pageSize:pageSize
         }
         
         getList(obj)
         setPagination({"current":current,"pageSize":pageSize})
    }
    const goluck=(key:any)=>{
        history.push({
            pathname:'/luck/addluck',
            query:{activityBasicId:key.key}
        })
    }

    return(
        pathname==="/luck/addluck"?
        props.children:
        <div className='luck'>
            <Form
                name="basic"
                autoComplete="off"
                form={form}
            >
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="活动名称"
                            name="activityName"
                        >
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="活动状态"
                            name="activityState"
                        >
                            <Select
                                placeholder="请选择"
                                allowClear
                            >
                                <Option value={1}>待审核</Option>
                                <Option value={2}>进行中</Option>
                                <Option value={3}>未开始</Option>
                                <Option value={4}>已驳回</Option>
                                <Option value={5}>已结束</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Button className='luck_but' onClick={searchluck}>搜索</Button>
                        <Button onClick={resetvalue}>重置</Button>
                    </Col>
                </Row>
            </Form>
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

export default Luckdraw