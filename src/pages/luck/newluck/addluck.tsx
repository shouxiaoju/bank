import React,{useState,useEffect} from "react"
import './addluck.less'
import type { UploadProps } from 'antd';
import { getlucklist,gecandidatelist ,lucktemplate,uplucktemplate} from "@/api/activeapi"
import { Row,Col, Form, Table,Input ,Button,Space,message,Upload} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useSetState } from 'ahooks';


interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'userName',
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreated',
    },
  ];
  

const Addluck=(props:any)=>{

    const {location:{query}}=props
    const [data,setDate]:any=useState({})
    const status=["进行中","未开始","已驳回","已结束"]
    const [datalist,setDatalist]:any =useState([]);
    const [form] = Form.useForm();
    const[loading,setLoading]=useState(true)
    const[userName,setUserName]=useState("")
    const[mobile,setMobile]=useState(1)
    /* 分页配置 */
    const [pagination, setPagination] = useSetState({
        current: 1,
        pageSize: 10,
        total:0,
        showTotal:(total:any)=>`共 ${total} 条`,
        showQuickJumper:true,
        showSizeChanger:true
      })
      /* 加载数据 */
    useEffect(()=>{
        getlucklist({activityBasicId:query.activityBasicId}).then((res)=>{
            if(res.data.code===200){
                const {data:{data}}=res
                setDate(data)
            }
        })
        let obj={
            activityBasicId:query.activityBasicId,
            mobile:"",
            page:1,
            pageSize:10,
            userName:""
        }
        getaddlick(obj)
    },[])
    /* 调用接口 */
    const getaddlick=(obj:any)=>{
        setLoading(true)
        gecandidatelist(obj).then((res)=>{
            if(res.data.code===200){
                const {data:{data:{rows,total}}}=res
                let arr:any=[]
                rows.map((item:any)=>{
                    arr.push({
                        key: item.id,
                        userName: item.userName,
                        mobile: item.mobile,
                        gmtCreated: item.gmtCreated,
                      })
                })
                setDatalist(arr)
                setLoading(false)
                setPagination({ total:total })
            }
            
        })
    }
    /* 选择 */
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
/* 搜索 */
    const searchluck=()=>{
        let values=form.getFieldsValue()
        console.log(values);
        const obj={
            activityBasicId:query.activityBasicId,
            userName: "" ,
            mobile: "" ,
            page: pagination.current,
            pageSize: pagination.pageSize,
            
        }
        if(values.userName){
            setUserName(values.userName)
            obj.userName=values.userName
        }else{
            setUserName("")
            obj.userName=""
        }
        if(values.mobile){
            setMobile(values.mobile)
            obj.mobile=values.mobile
        }else{
            setMobile(1)
            obj.mobile=""
        }
        getaddlick(obj)
    }
/* 重置 */
    const resetvalue=()=>{
        form.resetFields()
        const obj={
            activityBasicId:query.activityBasicId,
            userName: "" ,
            mobile: "" ,
            page: 1,
            pageSize: 10,
        }
        getaddlick(obj)
    }
    /* 点击分页触发 */

    const handleTableChange = (newPagination:any) => {
        console.log(newPagination);
        const {current,pageSize} = newPagination
        
        let obj={
            activityBasicId:query.activityBasicId,
            activityName:userName,
            activityStatu:mobile,
            page:current,
            pageSize:pageSize
        }
         
         getaddlick(obj)
         setPagination({"current":current,"pageSize":pageSize})
    }



    /* 下载 */
    const template=()=>{
        lucktemplate().then((res:any)=>{
            console.log("下载",res);
            let headers=res.headers;
            let contentType=headers["content-type"]
            const blob = new Blob([res.data], { type: contentType });
            const contentDisposition = res.headers["content-disposition"];
            let fileName = "白名单模板.xlsx";
            if (contentDisposition) {
                fileName = window.decodeURIComponent(window.decodeURI(
                    res.headers["content-disposition"].split("=")[1]
                ));
            }
            downFile(blob,fileName)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    const downFile=(blob:any, fileName:any)=> {
        // 非IE下载
        if ("download" in document.createElement("a")) {
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob); // 创建下载的链接
            link.download = fileName; // 下载后文件名
            link.style.display = "none";
            document.body.appendChild(link);
            link.click(); // 点击下载
            window.URL.revokeObjectURL(link.href); // 释放掉blob对象
            document.body.removeChild(link); // 下载完成移除元素
        } else {
            // IE10+下载
           // window.navigator.msSaveBlob(blob, fileName);
        }
    }
    /* 上传 */
    const propsdata: UploadProps = {
        name: 'file',
        action: '/campus/campusweb/activity/candidate/importCandidates',
        showUploadList:false,
        data:(file) =>{
            console.log("file",file);
            
            return {
                file,
                activityBasicId:query.activityBasicId,
            }
        }
      };
    return (
        <div className="addluck">
            <div className="addluck_title">设置白名单</div>
            <div style={{marginBottom:"40px"}}>
                <div className="addluck_cont">
                    <span className="addluck_contspan1">活动名称：  </span>
                    <span className="addluck_contspan2">{data.activityName}</span>
                </div>
                <div className="addluck_cont">
                    <span className="addluck_contspan1">活动状态：</span>
                    <span className="addluck_contspan2">{status[data.activityStatus-1]}</span>
                </div>
                <div className="addluck_cont">
                    <span className="addluck_contspan1">抽奖活动时间：</span>
                    <span className="addluck_contspan2">{data.startDate} - {data.endDate}</span>
                </div>
                <div className="addluck_cont">
                    <span className="addluck_contspan1">公开方式：</span>
                    <span className="addluck_contspan2">白名单用户</span>
                </div>
            </div>
            <Form
                name="basic"
                autoComplete="off"
                form={form}
            >
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="姓名"
                            name="userName"
                        >
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="手机号"
                            name="mobile"
                        >
                             <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Button className='addluck_but' onClick={searchluck}>搜索</Button>
                        <Button onClick={resetvalue}>重置</Button>
                    </Col>
                </Row>
            </Form>
            <Space size={20} style={{marginBottom:"10px"}}>
                <Upload {...propsdata}>
                    <Button className='addluck_but'>导入</Button>
                </Upload>
                <Button>删除</Button>
                <span style={{color:"#1585FF"}} onClick={template}>下载导模板</span>
                <span style={{color:"#1585FF"}}>查看导入进度</span>
            </Space>
            <Table 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={datalist} 
                loading={loading} 
                pagination={pagination} 
                onChange={handleTableChange} 
            />




        </div>
    )
}

export default Addluck