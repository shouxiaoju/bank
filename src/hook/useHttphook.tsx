import { useState,useEffect } from "react";
import {  Toast } from 'antd-mobile'

let url = "http://cmb.beyondsofthz.com/campus/campusweb";
export default function useHttp(query:any){
    console.log(query,"query");
    
    const [result,setResult]=useState();
    const [loading,setLoading]=useState(true)
    function queryParse(query:any){
        let queryText = "";
        for(let key in query){
            queryText += `${key}=${query[key]}&`;
            }
        return queryText.slice(0,-1);
    }
    url += "?" + queryParse(query);
    async function Http(url:any){
        setLoading(true)
        const options = {method: "GET"}
        return new Promise((resolve,reject)=>{
            fetch(url, options)
            .then(res=>res.json())
            .then(json=>{
                if(json.code==="0000"){
                    resolve(json.data)
                    setLoading(false)
                    setResult(json.data)
                }else{
                    reject(json.desc)
                }
                console.log(json)
            })
            .catch((err=>{
            }))
            .finally(()=>{
                setLoading(false)
            })
        });
    }
    useEffect(()=>{
        Http(url)
    },[])

    return [result,loading]
}