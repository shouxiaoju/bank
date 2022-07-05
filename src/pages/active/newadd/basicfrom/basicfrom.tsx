import {  DatePicker, Form, Input,Row ,Col,Cascader,Button, Upload,Modal} from 'antd';
import { PlusOutlined ,LoadingOutlined,MinusCircleOutlined} from '@ant-design/icons'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { address,address2 } from '@/api/activeapi';
import './basicfrom.less'
import moment from 'moment';

    const { RangePicker }:any = DatePicker;
    const { TextArea } = Input;

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

const Basicfrom = (props:any,ref:any) => {
    /* 处理城市接口数据 */
    const [options, setOptions] = useState([]);
    const [backdata,setBackdata]:any=useState({})
    const {tabfrom,gettotal,goback}=props
    /* 回写 */
    useEffect(()=>{
        if(goback["activityName"]){
            console.log("回填",goback);
            let obj:any={}
            obj["activityName"]=goback.activityName
            obj["cityCode"]=[goback.provinceName,goback.cityName]
            obj["activitySite"]=goback.activitySite
            obj["activityOrganizers"]=goback.activityOrganizers
            obj["activityContent"]=goback.activityContent
            obj["Date"]=[moment(goback.startDate),moment(goback.endDate)]
            obj["schedulesname"]=goback.scheduleVOS.length>0?goback.scheduleVOS[0].scheduleName:""
            obj["schedulesdata"]=moment(goback.scheduleVOS.length>0?goback.scheduleVOS[0].scheduleDate:"")
            obj["pictureUrl"]=[{
                    "key":goback.pictureKey,
                    "url":goback.pictureUrl,
                    "response":{
                        "dtat":{
                            "imgKey":goback.pictureKey,
                            "imgUrl":goback.pictureUrl
                        }
                    }
            }]
            form.setFieldsValue(obj)
        }
    },[goback])
    
    const onChange = (value:any , selectedOptions:any ) => {
        console.log("onChange",value, selectedOptions);
    };
    /* 二级城市 */
    const loadData = (selectedOptions: any) => {
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
    };
    /* 一级城市 */
    useEffect(()=>{
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
            }
        })
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
            gettotal(value)
            tabfrom("2")
        })
        .catch((errorInfo)=>{
            console.log("errorInfo",errorInfo);
            
        })
    }

    /* 活动图 */
    /* 处理错误//如果是typescript, 那么参数写成 e: any */
    const normFile = (e:any) => {  
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
    const handlePreview = async (file: UploadFile) => {
        
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
    

    /* 缩略图 */
    const [previewVisible2, setPreviewVisible2] = useState(false);
    const [previewImage2, setPreviewImage2] = useState('');
    const [previewTitle2, setPreviewTitle2] = useState('');
    const [fileList2, setFileList2] = useState<UploadFile[]>([]);
    const handleCancel2 = () => setPreviewVisible(false);
    const handlePreview2 = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage2(file.url || (file.preview as string));
        setPreviewVisible2(true);
        setPreviewTitle2(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    const handleChange2: UploadProps['onChange'] = ({ fileList: newFileList }) =>
      setFileList2(newFileList);
    const uploadButton2 = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    
  return (
    <div className='baisform'>
        <Form
            colon={false}
            layout="vertical"
            form={form}
            /* initialValues={backdata} */
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
                        <Cascader placeholder="请选择活动所属地" options={options} loadData={loadData} onChange={onChange}  />
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
                        valuePropName="fileList1" 
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: '请上传活动图片' }]}
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
                <Col span={12}>
                    <Form.Item 
                        label="缩略图"
                        name="thumbnailPictureUrl"
                        valuePropName="fileList" 
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: '请上传缩略图' }]}
                        extra={
                            <Modal visible={previewVisible2} title={previewTitle2} footer={null} onCancel={handleCancel2}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage2} />
                            </Modal>
                        }
                    >
                        <Upload
                            name="multipartFile"
                            action="/campus/campusweb/upload/pictureUpload"
                            listType="picture-card"
                            /* fileList={fileList2} */
                            onPreview={handlePreview2}
                            onChange={handleChange2}
                        >
                            {fileList2.length >= 1 ? null : uploadButton2}
                        </Upload>
                        
                    </Form.Item>
                </Col>
                <Col span={24} >
                    <div className='baisform_div'>
                        <span>请编辑活动日程规划</span><span>（可添加多条）</span>
                    </div>
                    <Row>
                        <Col span={12} >
                            <Form.Item label="日程名称" name="schedulesname" rules={[{ required: true, message: '请输入日程名称' }]}>
                                <Input placeholder="请输入日程名称" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label=" " name="schedulesdata" rules={[{ required: true, message: '请选择日期' }]}>
                                <DatePicker placeholder="请选择日程日期" locale={locale}/>
                            </Form.Item>
                        </Col>
                    </Row>
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