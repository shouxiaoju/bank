import {  DatePicker, Form, Input,Row ,Col,Cascader,Button, Upload,Space} from 'antd';
import { PlusOutlined ,LoadingOutlined,MinusCircleOutlined} from '@ant-design/icons'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React,{useState,useEffect,forwardRef,useImperativeHandle} from 'react';
import { address,address2 } from '@/api/activeapi';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './basicfrom.less'
const { RangePicker }:any = DatePicker;
const { TextArea } = Input;



const Basicfrom = (props:any,ref:any) => {
    /* 处理城市接口数据 */
    const [options, setOptions] = useState([]);
    const {tabfrom,gettotal}=props
    const onChange = (value:any , selectedOptions:any ) => {
        console.log("onChange",value, selectedOptions);
    };
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
                    console.log("城市",arr1);
                    
                    return arr1
                })
            }
            
        })
    };

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

    const [loading1, setLoading1] = useState(false);
    const [imageUrl1, setImageUrl1] = useState<string>();
  

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };
      

    const handleChange1: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        console.log("info",info);
        
      if (info.file.status === 'uploading') {
        setLoading1(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, url => {
          setLoading1(false);
          setImageUrl1(url);
        });
      }
      if (info.file.status === 'removed'){
        setImageUrl1("")
      }
    };
  
    const uploadButton1 = (
      <div>
        {loading1 ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    
    /* 缩略图 */

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

  return (
      <div className='baisform'>
        <Form
            /* name="basic" */
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
                >
                    <TextArea rows={4} placeholder="请输入活动内容" maxLength={6} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item 
                    label="活动图"
                    className='baisform_item1'
                    name="pictureUrl"
                    valuePropName="fileList1" 
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChange1}
                    >
                        {imageUrl1 ?
                            <img src={imageUrl1}  style={{ width: '100%' }} />
                        : uploadButton1}
                    </Upload>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item 
                    label="缩略图"
                    name="thumbnailPictureUrl"
                    className='baisform_item2'
                    valuePropName="fileList" 
                    getValueFromEvent={normFile}
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
            <Col span={24} >
                <div className='baisform_div'>
                    <span>请编辑活动日程规划</span><span>（可添加多条）</span>
                </div>
                <Row>
                    <Col span={12} >
                        <Form.Item label="日程名称" name="schedulesname">
                            <Input placeholder="请输入日程名称" />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label=" " name="schedulesdata">
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
                                    >
                                        <Input placeholder="请输入日程名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={6} >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'last']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
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