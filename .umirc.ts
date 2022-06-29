import { defineConfig} from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/' ,
      component: '@/layouts/index' ,
      title:"/",
      routes: [
        { path: '/active', 
          component: '@/pages/active/active',
          auth:true,
          title:"创建活动",
            routes:[
              { path: '/active/details', 
                component: '@/pages/active/details/details',
                auth:true,
                title:"详情"
              },
              { path: '/active/newadd', 
                component: '@/pages/active/newadd/newadd',
                auth:true,
                title:"新建活动"
              },
            ],
        },
        
        { path: '/luck', 
          component: '@/pages/luck/luck',
          auth:true,
          title:"抽奖白名单"
        },
        { path: '/comment', 
          component: '@/pages/comment/comment',
          auth:true,
          title:"活动评论"
        },
        
        {component: '@/pages/404/index'}
      ],
    },
    { path: '/login', component: '@/pages/login/login' },
    
    
  ],
  fastRefresh: {},
  proxy:{
    '/campus':{
      "target":"http://cmb.beyondsofthz.com",
      "changeOrigin":true,
    }
  }
});
