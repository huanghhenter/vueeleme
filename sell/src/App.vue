<template>
	<div id="app">
    	<v-header :header-seller="seller"></v-header>
    	<div class="tab border-1px">
    		<div class="tab-item">
    			<router-link to="/goods" active-class="active">商品</router-link>
    		</div>
    		<div class="tab-item">
    			<router-link to="/ratings" active-class="active">评论</router-link>
    		</div>
    		<div class="tab-item">
    			<router-link to="/sellers" active-class="active">商家</router-link>
    		</div>
    	</div>
    	<keep-alive>
      		<router-view :seller="seller" ></router-view>
      	</keep-alive>
    	
    </div>
</template>
<script type="text/ecmascript-6">
	import header from './components/header/header.vue';
	import shopcar from './components/shopcar/shopcar.vue';
	const ERR_OK=0;

	export default {
		data(){
           return {
           	seller: {} ,
           //定义一个对象
           };
		},
		created() {
			this.$http.get('/api/seller').then((re) => {
				re=re.body;
				// console.log(re);
				if(re.errno === ERR_OK) {
					this.seller = re.data;

				}

			});
			// this.$http.get('api/ratings').then((response)=>{
			// 	response=response.body;
			// 	console.log(response)
			// 	if(response.errno===ERR_OK){
			// 		this.ratings=response.data;
			// 	}
			// })
		},
		 computed: {
         selectedFoods() {
        return this.$store.state.foods;
    }
  },
		components:{ 
			'v-header':header,
			 shopcar
			
		}
	};
</script>
<style lang="stylus" rel="stylesheet/stylus"> 
	@import "./common/stylus/mixin.styl"
	#app
	  .tab
	    display:flex
	    width:100%
	    height:40px
	    line-height:40px
	    border-1px(rgba(7,17,27,0.1))
	    .tab-item
	      flex:1
	      text-align:center
	      & > a
	       display:block
	       text-decoration:none
	       font-size:14px
	       color: rgb(77,85,93)
	       &.active
	         color:rgb(240,20,20)

</style>
