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
      ],
    },
    { path: '/login', component: '@/pages/login/login' },
  ],
  fastRefresh: {},
  proxy:{
    '/campus':{
      /* target:'http://cmb.beyondsofthz.com', */
      "target":"http://cmb.beyondsofthz.com",
      "changeOrigin":true,
     /*  'pathRewrite': { '^/campus' : '' }, */
    }
  }
});
