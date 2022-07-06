import React, { useState, useEffect, useRef } from 'react';
function useTime(number: any) {
    // 定义状态
    const [n, setN] = useState(number)  
    //定义一个函数对n做减法
    const changeCount = (number: number) => {
      const timer = setTimeout(() => {
        let current = --number; 
        setN(current)
      }, 1000);
      return timer;
    }
    useEffect(() => {
      const timer = changeCount(n);
      if (n === 0) {
        setN(0);
        clearTimeout(timer);//清除定时器
      }
      return () => {//清除定时器
        clearTimeout(timer);
      }
    }, [n])
  
    // 返回状态
    return [n];
  }

  export default useTime