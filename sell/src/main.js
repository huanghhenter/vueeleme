// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import sellers from './components/sellers/sellers';

import './common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const routes=[
	{
		path:'/goods',
		 component:goods
	},
	{
		path:'/ratings',
		component:ratings
	},
	{
		path:'/sellers',
		component:sellers
	}
];

const router =new VueRouter({
	routes
});

// Vue.use(VueRouter)

// const router = new VueRouter({
//   routes: [
    
//     {
//       path: '/ratings',
//       component: ratings
//     }
//   ]
// })	
const app= new Vue({
	router:router,
	// APP组件渲染
	render: h => h(App)
	// 手动挂载
}).$mount('#app');
// 显示的第一个页面
router.push('/goods');



