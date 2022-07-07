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

/* 获取城市 */
export function address(query:any){
   
  return axios({
      method: 'post',
      url: '/address/queryAddressForFourLinkage',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

export function address2(query:any){
   
  return axios({
      method: 'post',
      url: '/address/queryAddressForFourLinkage',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/* 活动列表 */
export function activity(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/pageConditionQueryByCreatorId',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/* 活动详情 */

export function activitylist(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/queryByUpdate',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/* 创建活动 */

export function addactivitylist(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/addActivity',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/*保存草稿  /activity/saveDrafts*/

export function addasaveDrafts(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/saveDrafts',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/* 获取白名单列表 */
export function getluck(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/pageConditionQueryActivityByCreatorId ',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/* 获取白名单详情 */
export function getlucklist(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/queryByActivityBasicId ',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/* 白名单列表查询 */
export function gecandidatelist(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/candidate/pageByCandidateQuery ',
      baseURL: "/campus/campusweb",
      data: query
    })       
}

/* 下载 */
export function lucktemplate(){
   
  return axios({
      method: 'post',
      url: '/activity/candidate/downloadCandidateTemplate',
      baseURL: "/campus/campusweb",
      responseType: "blob" 
     
    })       
}

/* 导入 */
export function uplucktemplate(query:any){
   
  return axios({
      method: 'post',
      url: '/activity/candidate/importCandidates',
      baseURL: "/campus/campusweb",
      data: query
    })       
}