import { history } from "umi";
export function onRouteChange(route:any){
    const newPath=route.routes[0].routes.filter((item: any)=>item.path===route.location.pathname)
    console.log("newPath",newPath);
    
    const islogin=localStorage.getItem("user")
    if(newPath.length===1&&newPath[0].auth&&!islogin){
        history.push({
            pathname:'/login'
        })
    }
    
}