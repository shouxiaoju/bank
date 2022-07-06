import React ,{useEffect,useState} from "react"
import useTime from "@/hook/useTime"
import { Col, Row,Avatar,Image,Button } from 'antd';
import useThrottle from "@/hook/useThrottle";
import './comment.less'
const cardDataList = [
    {
        brandName: '弄堂里',
        brandLogo:'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
        distanceDesc: '500m',
        campImage:'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
        promoLogo: [
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*y6CTRo9L2oEAAAAAAAAAAAAAARQnAQ',
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
        ],
        voucherDesc: '弄堂里14元超值优惠券包x2',
        benefitAmount: '1',
        oriPriceAmount: '28',
        discountDesc: '0.6折',
        voucherStockNum: '库存888份',
     },
     {
        brandName: '弄堂里',
        brandLogo:'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ',
        distanceDesc: '500m',
        campImage:'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ',
        promoLogo: [
            'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ',
        ],
        voucherDesc: '弄堂里14元超值优惠券包x2',
        benefitAmount: '1',
        discountDesc: '0.6折',
    },
    {
        brandName: '飞猪',
        brandLogo:'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*dCL5Q4oBaQsAAAAAAAAAAAAAARQnAQ',
        campImage:'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*MZ7VSaNZXRYAAAAAAAAAAAAAARQnAQ',
        promoLogo:'https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*90WEQLmnKdkAAAAAAAAAAAAAARQnAQ',
        voucherDesc: '南方航空20元优惠券',
        benefitAmount: '20',
     },
    ];

const Activecomment=()=>{
    const [time]=useTime(10)
    const [disabled,setDisabled]=useState(true)
    const[visibili,setVisibility]=useState([])
    useEffect(()=>{
        if(time===0){
            setDisabled(false)
        }
    },[time])

    const add=(item:any,index:any)=>{
        console.log(item,index);
        setVisibility((perdata):any=>{
            let arr=[...perdata]
            arr.push(index)
            return arr
        })
        let p = new Promise(function(resolve, reject){
            //做一些异步操作
            setTimeout(function(){
                resolve('抢购成功');
            }, 2000);
        });
        p.then((res)=>{
            console.log(res);
        })
    }

    return (
        <div className="comment">
            <div>{time===0?"开始抢购":"倒计时"+time+"s"}</div>
            {
                cardDataList.map((item:any,index:number)=>{
                    return <Row key={index} className="comment_Row">
                    <Col span={24}>
                        <Avatar src={item.brandLogo} />
                        <span>{item.brandName}</span>
                    </Col>
                    <Col span={4}>
                        <Image
                            width={100}
                            src={item.campImage}
                        />
                    </Col>
                    <Col span={12}>
                        {
                           Array.isArray(item.promoLogo)?item.promoLogo.map((item:any,index:number)=>{
                               return <Image key={index}
                               height={20}
                               src={item}
                           />
                           }):<Image
                           height={20}
                           src={item.promoLogo}
                       />
                        }
                        <div>{item.voucherDesc}</div>
                        <div>{item.benefitAmount}</div>
                    </Col>
                    <Col span={8}>
                        {
                           visibili.includes(index)? <div>已抢购</div>:<Button type="primary" danger disabled={disabled} onClick={()=>{add(item,index)}}>抢购</Button>
                        }
                        
                        
                    </Col>
                </Row>
                })
            }
            
        </div>
    )
}

export default Activecomment