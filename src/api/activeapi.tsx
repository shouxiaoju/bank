import axios from 'axios'

//登录
export function login(query:any){
   
    return axios({
        method: 'post',
        url: '/ipuser/login',
        baseURL: "/campus/campusweb",
        data: query
      })
      
            
}

//退出登录

export function logout(){
   
    return axios({
        method: 'post',
        url: '/ipuser/logout',
        baseURL: "/campus/campusweb",
      })
      
            
}

/* 获取1级菜单 */
export function firstmenu(){
   
    return axios({
        method: 'post',
        url: '/menu/listFirstLevelMenuForUser',
        baseURL: "/campus/campusweb",
      })
      
            
}

/* 获取2级菜单 */
export function othersmenu(query:any){
   
    return axios({
        method: 'post',
        url: '/menu/listOthersMenuForUser',
        baseURL: "/campus/campusweb",
        data: query
      })
      
            
}

