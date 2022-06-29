import { history } from "umi";
export function onRouteChange(route:any){
    const newPath=route.routes[0].routes.filter((item: any)=>item.path===route.location.pathname)
    /* console.log("newPath",newPath);
    console.log("route",route); */
    
    const islogin=localStorage.getItem("user")
    /* console.log("islogin",islogin===null); */
    if(route.location.pathname==="/"&&!islogin){
        history.push({
            pathname:'/login'
        })
    }
    if(newPath.length===1&&newPath[0].auth&&!islogin){
        history.push({
            pathname:'/login'
        })
    }
    
}