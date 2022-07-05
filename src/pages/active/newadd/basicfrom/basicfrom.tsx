import {  DatePicker, Form, Input,Row ,Col,Cascader,Button, Upload} from 'antd';
import { PlusOutlined ,MinusCircleOutlined} from '@ant-design/icons'
import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { address,address2 } from '@/api/activeapi';
import './basicfrom.less'
import moment from 'moment';

    const { RangePicker }:any = DatePicker;
    const { TextArea } = Input;

const Basicfrom = (props:any,ref:any) => {
    const {tabfrom,gettotal,goback}=props
    /* 处理城市接口数据 */
    const [options, setOptions] = useState([]);
    const [gobackcaty,setGobackcaty]=useState(false)
    /* 二级城市 */
    const caty2=(selectedOptions:any)=>{
        
        
        address2({"addressLevel":2,"parentId": selectedOptions[0].value}).then((res)=>{
            const{data:{code,data}}=res
            if(code===200){
                setOptions((pertreeData):any=>{
                    let arr1=[...pertreeData]
                    for(let i =0;i<arr1.length;i++){
                        if(arr1[i].value===data[0].parentId){
                            arr1[i]["children"]=data.map((item:any)=>{
                                return {
                                    value: item.addressCode,
                                    label: item.addressName ,
                                    isLeaf:true,
                                }
                            })
                            break
                        }
                    }
                    return arr1
                })
                
            }
        })
    }
    const loadData = (selectedOptions: any) => {
        caty2(selectedOptions)
    };
    /* 一级城市 */
    const caty=(goback:any)=>{
        address({"addressLevel":1}).then((res)=>{
            const{data:{code,data}}=res
            
            if(code===200){
                setOptions((pertreeData):any=>{
                    return data.map((item:any)=>{
                        if(item.addressName==="其他"){
                            item["isLeaf"]=true
                        }else{
                            item["isLeaf"]=false
                        }
                        return {
                            value: item.addressCode,
                            isLeaf:item.isLeaf,
                            label: item.addressName,
                        }
                    })
                })
                if(Object.keys(goback).length>0){
                    setGobackcaty(true)
                }
            }
        })
    }
    useEffect(()=>{
        caty({})
    },[])
    /* 表单1操作数据 */
    useImperativeHandle(ref,()=>{
        return {
            submit
        }
    })
    const [form] = Form.useForm();
    const submit=()=>{
        form.validateFields().then((value)=>{
            console.log("validateFields",value);
            gettotal(value)//将表单1的数据返回
            tabfrom("2")//展示活动信息
        })
        .catch((errorInfo)=>{
            console.log("errorInfo",errorInfo);
        })
    }
    /* 处理错误//如果是typescript, 那么参数写成 e: any */
    const normFile = (e:any) => {  
        if (Array.isArray(e)) {
        return e;
        }
        return e && e.fileList;
    };
    /* 活动图 */
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );
    
    /* 缩略图 */
    const uploadButton2 = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传图片</div>
      </div>
    );
    /* 回写 */
    useEffect(()=>{
        if(Object.keys(goback).length>0){
            
            caty2([{value:goback.provinceCode}])
        }
    },[gobackcaty])
    useEffect(()=>{
        if(goback["activityName"]){
            console.log("回填",goback);
            caty(goback)
            let arr:any=[]
            goback.scheduleVOS.length>0?goback.scheduleVOS.map((item:any)=>{
                arr.push({
                    "first":item.scheduleName,
                    "last":moment(item.scheduleDate)
                })
            }):""
            let obj:any={}
            obj["activityName"]=goback.activityName
            obj["cityCode"]=[goback.provinceCode,goback.cityCode]
            obj["activitySite"]=goback.activitySite
            obj["activityOrganizers"]=goback.activityOrganizers
            obj["activityContent"]=goback.activityContent
            obj["Date"]=[moment(goback.startDate),moment(goback.endDate)]
            obj["users"]=arr
            obj["pictureUrl"]=[{
                    "key":goback.pictureKey,
                    "url":goback.pictureUrl,
                    "response":{
                        "data":{
                            "imgKey":goback.pictureKey,
                            "imgUrl":goback.pictureUrl
                        }
                    }
            }]
            obj["thumbnailPictureUrl"]=[{
                    "key":goback.thumbnailPictureKey,
                    "url":goback.thumbnailPictureUrl,
                    "response":{
                        "data":{
                            "imgKey":goback.thumbnailPictureKey,
                            "imgUrl":goback.thumbnailPictureUrl
                        }
                    }
            }]
            form.setFieldsValue(obj)
        }
    },[goback])

    return (
        <div className='baisform'>
            <Form
                colon={false}
                layout="vertical"
                form={form}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="活动名称"
                            name="activityName"
                            rules={[{ required: true, message: '请输入活动名称' }]}
                        >
                            <Input placeholder="请输入活动名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="地区选择" 
                            name="cityCode"
                            rules={[{ required: true, message: '请选择活动所属地' }]}
                        >
                            <Cascader placeholder="请选择活动所属地" options={options} loadData={loadData} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="活动时间"
                            name="Date"
                            rules={[{ required: true, message: '请选择活动时间' }]}
                        >
                            <RangePicker locale={locale} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="活动地点"
                            name="activitySite"
                        >
                            <Input placeholder="请输入活动地点" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="活动主办方"
                            name="activityOrganizers"
                        >
                            <Input placeholder="请输入活动主办方" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="活动内容"
                            name="activityContent"
                            rules={[{ required: true, message: '请输入活动内容' }]}
                        >
                            <TextArea rows={4} placeholder="请输入活动内容" maxLength={6} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="活动图"
                            name="pictureUrl"
                            valuePropName="fileList" 
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: '请上传活动图片' }]}
                            extra={
                                <div>png格式</div>
                            }
                        >
                            <Upload
                                name="multipartFile"
                                action="/campus/campusweb/upload/pictureUpload"
                                listType="picture-card"
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="缩略图"
                            name="thumbnailPictureUrl"
                            valuePropName="fileList" 
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: '请上传缩略图' }]}
                            extra={
                            <div>png格式</div>
                            }
                        >
                            <Upload
                                name="multipartFile"
                                action="/campus/campusweb/upload/pictureUpload"
                                listType="picture-card"
                            >
                                {uploadButton2}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <div className='baisform_div'>
                            <span>请编辑活动日程规划</span><span>（可添加多条）</span>
                        </div>
                        <div style={{marginBottom:"10px"}}> 日程名称 </div>
                        <Form.List name="users">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key}>
                                        <Col span={12} >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'first']}  
                                                rules={[{ required: true, message: '请输入日程名称' }]}      
                                            >
                                                <Input placeholder="请输入日程名称" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'last']}
                                                rules={[{ required: true, message: '请选择日期' }]}
                                            >
                                                <DatePicker placeholder="请选择日程日期" locale={locale} />
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
        </div>
    );
};

export default forwardRef(Basicfrom);