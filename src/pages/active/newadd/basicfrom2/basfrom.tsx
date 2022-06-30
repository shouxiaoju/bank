import { useState } from "react"
import { Collapse, Select } from 'antd';
import './index.less'
import {CloseOutlined} from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;
const Basfrom=()=>{

    const [icon,setIcon]=useState([])
    const dianji=(lab:any)=>{
        console.log(lab)
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
            console.log(arr);
            
            setIcon(arr)
        }
    }
  
    const onChange = (key: any) => {
        console.log(key);
        key.map((item:any)=>{
            if(!icon.includes(item)){
                setIcon((pericon):any=>{
                    let arr=[...pericon]
                    arr.push(item)
                   
                  return arr
                })
            }
        })
        
    };
    return(
        <div className="basfrom">
            <div className="basfrom_header">
                <div className="basfrom_headertab" style={{background:`${icon.includes("1")?"#1A267B":"#fff"}`,color:`${icon.includes("1")?"#fff":"#000"}`}}>
                    <span onClick={()=>{dianji("1")}}>报名</span>
                    <span style={{display:`${icon.includes("1")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("1")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("2")?"#1A267B":"#fff"}`,color:`${icon.includes("2")?"#fff":"#000"}`}}>
                    <span onClick={()=>{dianji("2")}}>投票</span>
                    <span style={{display:`${icon.includes("2")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("2")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("3")?"#1A267B":"#fff"}`,color:`${icon.includes("3")?"#fff":"#000"}`}}>
                    <span onClick={()=>{dianji("3")}}>门票</span>
                    <span style={{display:`${icon.includes("3")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("3")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("4")?"#1A267B":"#fff"}`,color:`${icon.includes("4")?"#fff":"#000"}`}}>
                    <span onClick={()=>{dianji("4")}}>签到</span>
                    <span style={{display:`${icon.includes("4")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("4")}}/>
                    </span>
                </div>
                <div className="basfrom_headertab" style={{background:`${icon.includes("5")?"#1A267B":"#fff"}`,color:`${icon.includes("5")?"#fff":"#000"}`}}>
                    <span onClick={()=>{dianji("5")}}>抽奖</span>
                    <span style={{display:`${icon.includes("5")?"block":"none"}`,color:"#000"}}>
                        <CloseOutlined  className="basfrom_headericon" onClick={()=>{react("5")}}/>
                    </span>
                </div>
            </div>
            <Collapse
                onChange={onChange}
                expandIconPosition="end"
                activeKey={icon}
            >
                <Panel header="报名" key="1" >
                    <div>1</div>
                </Panel>
                <Panel header="投票" key="2" >
                    <div>2</div>
                </Panel>
                <Panel header="门票" key="3" >
                    <div>3</div>
                </Panel>
                <Panel header="签到" key="4" >
                    <div>3</div>
                </Panel>
                <Panel header="抽奖" key="5" >
                    <div>3</div>
                </Panel>
      </Collapse>
        </div>
    )
}

export default Basfrom