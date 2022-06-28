import { defineConfig} from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/' ,
      component: '@/layouts/index' ,
      routes: [
        { path: '/active', 
          component: '@/pages/active/active',
          auth:true
        },
        { path: '/luck', 
          component: '@/pages/luck/luck',
          auth:true
        },
        { path: '/comment', 
          component: '@/pages/comment/comment',
          auth:true
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
