import { useState,forwardRef,useImperativeHandle, useEffect } from "react"
import { history } from "umi";
import { Collapse, Select , Col , Row , Form ,Input , DatePicker , Button , Upload , Modal , message} from 'antd';
import { PlusOutlined,MinusCircleOutlined,DeleteOutlined,CloseOutlined} from '@ant-design/icons'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './index.less'
import Check from "./checkbox/checkbox";
import { addactivitylist,addasaveDrafts } from "@/api/activeapi";
import moment from 'moment';
    const { RangePicker }:any = DatePicker;
    const { Panel } = Collapse;
    const { Option } = Select;

const Basfrom=(props:any,ref:any)=>{
    const {total,goback}=props
  



    /* 展示对应列表 */
    const [icon,setIcon]=useState([])
    const dianji=(lab:any)=>{
        if(!icon.includes(lab)){
            setIcon((pericon):any=>{
                let arr=[...pericon]
                arr.push(lab)
               console.log(arr);
              return arr
            })
        }
    }
    /* 隐藏对应的列表 */
    const react=(key:any)=>{
        if(icon.includes(key)){
          let arr= icon.filter((item)=>{
                return item!==key
            })
            setIcon(arr)
        }
    }
    
    useEffect(()=>{
        settotaldata((predata:any)=>{
            let arr={...predata}
            arr["isSignUp"]=icon.includes("1")?true:false 
            arr["isVote"]= icon.includes("2")?true:false
            arr["isRobTickets"]= icon.includes("3")?true:false
            arr["isSignIn"]= icon.includes("4")?true:false
            arr["isLuckyDraw"]= icon.includes("5")?true:false
           return arr
        })
    },[icon])



    /* 表单2-1 */
    const [form1] = Form.useForm();
    const [form2]=Form.useForm()
    const [totaldata,settotaldata]:any=useState({})

    useImperativeHandle(ref,()=>{//暴露给父组件的方法用来触发表单提交
        return {
            submit
        }
    })
    /* 得到表单1中的数据 */
    useEffect(()=>{
        settotaldata((perdata:any)=>{
            let arr={...perdata,...total}
            return arr
        })
    },[total])

     function  submit(key:any){
         console.log("提交",key);
         
        let arr=[]
        for(let i=0;i<icon.length;i++){
            if(icon[i]==="1"){
                arr.push(form1.validateFields())
            }else if(icon[i]==="2"){
                arr.push(form2.validateFields())
            }
        }
        Promise.all(arr).then((res)=>{
            console.log("promise.all",res);
            let newarr={...totaldata}
            for(let i=0;i<res.length;i++){
                if(res[i]["activityName"]){
                    let arr1:any=[]
                    res[0].check.checkcount.length>0?res[0].check.checkcount.map((item:any)=>{
                        arr1.push({
                            "key":item,
                        })
                    }):""
                    let arr2:any=[{
                        key:res[0].activityName
                    }]
                    res[0].users? res[0].users.map((item:any)=>{
                        arr2.push({
                            "key":item.first,
                        })
                    }):""
                    newarr["activityVOS"]=newarr["activityVOS"]?[...newarr.activityVOS]:[]
                        newarr["activityVOS"].push({
                            "activityType": 1,
                            "startDate": formatDateTime(res[0].datatime[0]._d),
                            "endDate": formatDateTime(res[0].datatime[1]._d),
                            "numberLimit":Number(res[0].catynum),
                            "requiredEntryForms":arr1,
                            "optionalEntryForms":arr2
                        })
                    console.log("表单2-1处理后的数据",newarr);
                }else if(res[i]["ovceName"]){
                    let arr1:any=[{
                        "instructions": res[i].ovceSey,
                         "pictureKey": res[i].ovceImg[0].response.data.imgKey,
                        "pictureUrl": res[i].ovceImg[0].response.data.imgUrl,
                        "name": res[i].ovceName,
                    }]
                    res[i].users?res[i].users.map((item:any)=>{
                        arr1.push({
                            "instructions": item.true,
                            "pictureKey": item.three[0].response.data.imgKey,
                            "pictureUrl": item.three[0].response.data.imgUrl,
                            "name": res[i].one,
                        })
                    }):""
                    newarr["activityVOS"]=newarr["activityVOS"]?[...newarr.activityVOS]:[]
                  
                        newarr["activityVOS"].push({
                            "activityType": 2,
                            "startDate": formatDateTime(res[i].ovteTime[0]._d),
                            "endDate": formatDateTime(res[i].ovteTime[1]._d),
                            "voteWay": res[i].ovteWay,
                            "voteObjectVOS":arr1
                        })
                    console.log("表单2-2处理后的数据",newarr);
                }
            }

            console.log("表单处理后的总数据",newarr);
            if(key==="发布"){
                addactivitylist(newarr).then((res):any=>{
                    console.log("新增成功",res);
                    const{data:{code}}=res
                    if(code===200){
                        message.success('发布成功')
                        history.push({
                            pathname:'/active'
                        })
                    }else{
                        message.error(res.data.message);
                    }
                    
                }).catch((erray):any=>{
                    console.log("新增失败",erray);
                })
            }else if(key==="保存草稿"){
                addasaveDrafts(newarr).then((res):any=>{
                    console.log("保存草稿成功",res);
                    const{data:{code}}=res
                    if(code===200){
                        message.success('保存草稿箱成功')
                        history.push({
                            pathname:'/active'
                        })
                    }else{
                        message.error(res.data.message);
                    }
                }).catch((erray):any=>{
                    console.log("保存草稿成功",erray);
                    
                })
            }
        })
    }
    /* 处理日期 */
    const formatDateTime = function (date:any) {
        let y = date.getFullYear(); 
        let m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        let h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        let minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        let second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + d+' '+h+':'+minute; 
    }

    /* 图片 */
    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    /* 处理上传组件报错 */
    const normFile = (e:any) => {  //如果是typescript, 那么参数写成 e: any
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
      setFileList(newFileList);
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );


      /* 回填 */
      useEffect(()=>{
          
        console.log("表单2回填",goback);
        if(goback["isSignUp"]){
            if(goback.isSignUp){
                setIcon((pericon):any=>{
                    let arr=[...pericon]
                    arr.push("1")
                  return arr
                })
                
            }
             if(goback.isVote){
                setIcon((pericon):any=>{
                    let arr=[...pericon]
                    arr.push("2")
                  return arr
                })
              }
            
        }
      },[goback])
    const onChange = (key: any) => {
        console.log(key);
        let obj1:any={}
        let newarr:any=[]
                goback.activityVOS[0].requiredEntryForms.map((item:any)=>{
                    newarr.push(item.key)
                })
                obj1["datatime"]=[moment(goback.activityVOS[0].startDate),moment(goback.activityVOS[0].endDate)]
                obj1["catynum"]=goback.activityVOS[0].numberLimit
                obj1["check"]= newarr,
                
                form1.setFieldsValue(obj1)
    };
    return(
        <div className="basfrom">
            <div className="basfrom_title">选择你想要创建的活动
            <span>( 可多选 )</span>
            </div>
            <div className="basfrom_header">
                <div className="basfrom_headertab" style={{background:`${icon.includes("1")?"#1A267B":"#fff"}`,color:`${icon.includes("1")?"#fff":"#000"}`}}>
                    <span className="basfrom_headerspan" onClick={()=>{dianji("1")}}>报名</span>
                    <span style={{display:`${icon.includes("1")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("1")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("2")?"#1A267B":"#fff"}`,color:`${icon.includes("2")?"#fff":"#000"}`}}>
                    <span className="basfrom_headerspan" onClick={()=>{dianji("2")}}>投票</span>
                    <span style={{display:`${icon.includes("2")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("2")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("3")?"#1A267B":"#fff"}`,color:`${icon.includes("3")?"#fff":"#000"}`}}>
                    <span className="basfrom_headerspan" onClick={()=>{dianji("3")}}>门票</span>
                    <span style={{display:`${icon.includes("3")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("3")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("4")?"#1A267B":"#fff"}`,color:`${icon.includes("4")?"#fff":"#000"}`}}>
                    <span className="basfrom_headerspan" onClick={()=>{dianji("4")}}>签到</span>
                    <span style={{display:`${icon.includes("4")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("4")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("5")?"#1A267B":"#fff"}`,color:`${icon.includes("5")?"#fff":"#000"}`}}>
                    <span className="basfrom_headerspan" onClick={()=>{dianji("5")}}>抽奖</span>
                    <span style={{display:`${icon.includes("5")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("5")}}/>
                    </span>
                </div>
            </div>
            <Collapse
                onChange={onChange}
                expandIconPosition="end"
                bordered={false}
                /* activeKey={icon} */
            >
                <Panel header="报名" key="1" style={{display:`${icon.includes("1")?"block":"none"}`}}>
                    <Row>
                        <Form
                            name="basic1"
                            form={form1}
                            autoComplete="off"
                            layout="vertical"
                            initialValues={{
                                check: {
                                    checkcount: [],
                                },
                              }}
                        >
                            <Col span={24} className="basfrom_contentcol">
                                <span className="basfrom_contentcolspan1"></span> <span>基本信息</span> 
                            </Col>
                            <Row className="basfrom_col">
                                <Col span={12}>
                                    <Form.Item
                                        label="活动时间"
                                        name="datatime"
                                        rules={[{ required: true, message: '请选择活动时间' }]}
                                    >
                                        <RangePicker locale={locale} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="活动人数"
                                        name="catynum"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Col span={24} className="basfrom_contentcol">
                                <span className="basfrom_contentcolspan1"></span> <span>选择您希望活动参加者填写的信息</span> 
                            </Col>
                            <Row className="basfrom_col">
                                <Col span={24}>
                                    <Form.Item name="check"  className="basfrom_fromitem">
                                        <Check />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Col span={24} className="basfrom_contentcol">
                                <span className="basfrom_contentcolspan1"></span> <span>可添加补充项目</span> 
                            </Col>
                            <Row className="basfrom_col">
                                <Col span={24}>
                                    <Form.Item
                                       name="activityName" 
                                       label="项目名称"
                                       rules={[{ required: true, message: '请输入项目名称' }]}                    
                                    >
                                        <Input placeholder="请输入项目名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                <Form.List name="users">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Row key={key}>
                                                <Col span={12} >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}        
                                                    >
                                                        <Input placeholder="请输入日程名称" />
                                                    </Form.Item>
                                                </Col>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Row>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                添加
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            </Col>
                            </Row>
                            
                        </Form>
                    </Row>
                </Panel>
                <Panel header="投票" key="2" style={{display:`${icon.includes("2")?"block":"none"}`}}>
                <Row>
                        <Form
                            name="basic2"
                            form={form2}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Col span={24} className="basfrom_contentcol">
                                <span className="basfrom_contentcolspan1"></span> <span>基本信息</span> 
                            </Col>
                            <Row className="basfrom_col">
                                <Col span={12}>
                                    <Form.Item
                                        label="活动时间"
                                        name="ovteTime"
                                        rules={[{ required: true, message: '请选择活动时间' }]}
                                    >
                                        <RangePicker locale={locale} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="投票方式"
                                        name="ovteWay"
                                        rules={[{ required: true, message: '请选择投票方式' }]}
                                    >
                                        <Select
                                            placeholder="请选择投票方式"
                                            allowClear
                                        >
                                            <Option value="1">只可投一次</Option>
                                            <Option value="female">female</Option>
                                            <Option value="other">other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Col span={24} className="basfrom_contentcol">
                                <span className="basfrom_contentcolspan1"></span> <span>可添加补充项目</span> 
                            </Col>
                            <Row className="basfrom_col">
                                <Col span={12}>
                                    <Form.Item
                                       name="ovceName" 
                                       label="名称"   
                                       rules={[{ required: true, message: '请输入投票对象的名字' }]}                 
                                    >
                                        <Input placeholder="请输入投票对象的名字" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="ovceSey" 
                                        label="说明"                    
                                        >
                                            <Input placeholder="请输入投票对象的说明" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="ovceImg" 
                                        label="图片" 
                                        valuePropName="fileList" 
                                        getValueFromEvent={normFile}
                                        rules={[{ required: true, message: '请上传图片' }]}  
                                        extra={
                                            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        }                    
                                    >
                                        <Upload
                                            name="multipartFile"
                                            action="/campus/campusweb/upload/pictureUpload"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                        >
                                            {fileList.length >= 1 ? null : uploadButton}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.List name="users">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (       
                                            <Row key={key} className="basfrom_col">
                                            <Col span={12}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'one']} 
                                                    label="名称"   
                                                    rules={[{ required: true, message: '请输入投票对象的名字' }]}                 
                                                >
                                                    <Input placeholder="请输入投票对象的名字" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'true']} 
                                                    label="说明"                    
                                                >
                                                    <Input placeholder="请输入投票对象的说明" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'three']} 
                                                    label="图片" 
                                                    valuePropName="fileList" 
                                                    getValueFromEvent={normFile}
                                                    rules={[{ required: true, message: '请上传图片' }]}  
                                                    extra={
                                                        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                        </Modal>
                                                    }                  
                                                >
                                                    <Upload
                                                        name="multipartFile"
                                                        action="/campus/campusweb/upload/pictureUpload"
                                                        listType="picture-card"
                                                        fileList={fileList}
                                                        onPreview={handlePreview}
                                                        onChange={handleChange}
                                                    >
                                                        {fileList.length >= 2 ? null : uploadButton}
                                                    </Upload>
                                                </Form.Item>
                                            </Col>
                                                <Col span={24} className="over_colicon">
                                                    <DeleteOutlined className="ovce_icon" onClick={() => remove(name)} />
                                                </Col>
                                            </Row>
                                        ))}
                                        <Form.Item className="ovce_item">
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                添加
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Form>
                    </Row>
                </Panel>
                <Panel header="门票" key="3" style={{display:`${icon.includes("3")?"block":"none"}`}}>
                    <div>3</div>
                </Panel>
                <Panel header="签到" key="4" style={{display:`${icon.includes("4")?"block":"none"}`}}>
                    <div>3</div>
                </Panel>
                <Panel header="抽奖" key="5" style={{display:`${icon.includes("5")?"block":"none"}`}}>
                    <div>3</div>
                </Panel>
      </Collapse>
        </div>
    )
}

export default forwardRef(Basfrom)