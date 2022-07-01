import { useState,forwardRef,useImperativeHandle } from "react"
import { Collapse, Select,Col, Row,Form,Input,DatePicker,Button,Upload } from 'antd';
import { PlusOutlined ,LoadingOutlined,MinusCircleOutlined,DeleteOutlined} from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import Check from "./checkbox/checkbox";
import './index.less'
import {CloseOutlined} from '@ant-design/icons';
const { RangePicker }:any = DatePicker;
const { Panel } = Collapse;
const { Option } = Select;
const Basfrom=(props:any,ref:any)=>{
    const {getform1}=props
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
    const react=(key:any)=>{
        if(icon.includes(key)){
          let arr= icon.filter((item)=>{
                return item!==key
            })
            setIcon(arr)
        }
    }
  
    const onChange = (key: any) => {
        console.log(key);
    };
    /* 表单1 */
    const [form] = Form.useForm();
    useImperativeHandle(ref,()=>{
        return {
            submit
        }
    })
    const submit=()=>{
        form.validateFields().then((value)=>{
            console.log("validateFields",value);

        })
        .catch((errorInfo)=>{
            console.log("errorInfo",errorInfo);
            
        })
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



      /* 图片 */
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };
    const [loading2, setLoading2] = useState(false);
    const [imageUrl2, setImageUrl2] = useState<string>();

    const normFile = (e:any) => {  //如果是typescript, 那么参数写成 e: any
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
    const handleChange2: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log("info",info);
        
      if (info.file.status === 'uploading') {
        setLoading2(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, url => {
          setLoading2(false);
          setImageUrl2(url);
        });
      }
      if (info.file.status === 'removed'){
        setImageUrl2("")
      }
    };
  
    const uploadButton2 = (
      <div>
        {loading2 ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
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
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
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
                                    <Form.Item name="check" label=" " className="basfrom_fromitem">
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
                            /* onFinish={onFinish}
                            onFinishFailed={onFinishFailed} */
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Col span={24} className="basfrom_contentcol">
                                <span className="basfrom_contentcolspan1"></span> <span>基本信息</span> 
                            </Col>
                            <Row className="basfrom_col">
                                <Col span={12}>
                                    <Form.Item
                                        label="名称"
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
                                            <Option value="只可投一次">只可投一次</Option>
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
                                        >
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                onChange={handleChange2}
                                            >
                                                {imageUrl2 ?
                                                    <img src={imageUrl2}  style={{ width: '100%' }} />
                                                : uploadButton2}
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
                                                    >
                                                        <Upload
                                                            name="avatar"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            onChange={handleChange2}
                                                        >
                                                            {imageUrl2 ?
                                                                <img src={imageUrl2}  style={{ width: '100%' }} />
                                                            : uploadButton2}
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