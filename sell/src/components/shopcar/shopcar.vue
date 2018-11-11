<template>
<div>
	<div class="shopcar">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
				<div class="desc">另需配送费{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<span class="pay" :class="payClass" @click.stop.prevent="toPay">{{pay}}</span>
			</div>
		</div>
		<div class="shopcar-list" v-show="listShow">
          <div class="list-header">
           <span class="empty" @click="empty">清空</span>
           <div class="title">购物车</div>
           
          </div>
          <div class="list-content" ref="list">
            <ul class="liststyle">
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.count*food.price}}</span>
                </div>
                <div class="carcontrol-wrapper">
                	<carcontrol :food="food"></carcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
	</div>
	<div class="listmask" v-show="listShow" transition="fade"></div>
</div>
</template>

<script type="text/ecmascript-6">
    import carcontrol from '../carcontrol/carcontrol';
    import BScroll from 'better-scroll';
	export default{
		data() {
			return{
			fold:true
		 };
		},
		props:{
			deliveryPrice:{
				type:Number,
				default:0

			},
 			minPrice: {
 				type: Number,
 				default:0
 			},
 			selectFoods: {
               type: Array,
                default() {
                 return [
                 ];
                 }
               
    },
		},
		computed:{
			totalPrice(){
				let price =0;
				this.selectFoods.forEach(food=>{
				price += food.count*food.price;  
					
				});
				return price;

				},
		    totalCount() {
		    	let count = 0;
		    	this.selectFoods.forEach(food=>{
		    		count += food.count
		    	});
				return count;
		    },

		    pay(){
				if(this.totalPrice===0) {
					return `${this.minPrice}元起送`;
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice-this.totalPrice
					return `还差¥${diff}元起送`
				}else{
					return '去结算'
				}


				},
			payClass() {
				if(this.totalPrice<this.minPrice){
					return 'not-enough';
				}else{
					return 'enough'
				}
			},
			listShow() {
     			 if (!this.totalCount) {
        		  	this.fold = true; 
        		  	// 折叠
       			    return false;
     			 }
     			 let show =! this.fold;
     			 if(show){
     			 	this.$nextTick(function () {
     			 		if(!this.scroll){
     			  			this.scroll = new BScroll(this.$refs.list,{
     			  				click:true

        		      	 })
     			 		}else{
                          this.scroll.refresh();
     			 		}
     			 	});
     			 }
		         return show;
		    },

        },
        methods:{
        	toggleList(){
        		if(!this.totalCount){
        			return;
        		}
        		this.fold = !this.fold
        	},
        	empty(){
        		this.selectFoods.forEach(food => {
        			if(food.count){
        				food.count = 0
        			}

        		})
        		

        		
        	},
        	toPay() {
        		if(this.totalPrice<this.minPrice){
                 return;
        		}
                alert(`支付${this.totalPrice}元`)
        	}
        	
        },
        components: {
        	carcontrol
			
		}

        }
	

</script>
<style lang="stylus" rel="stylesheet/stylus">
   
   @import "../../common/stylus/mixin.styl";

    .listmask
      position:fixed
      bottom: 0
      left: 0
      width:100%
      height:100%
      z-index: 200
      backdrop-filter:blur(10px)
      transition:all 0.5s
      opacity:1
      background:rgba(7,17,27,0.6)
      &.fade-enter,$.fade-leave-active
        opacity:0
        background:rgba(7,17,27,0)
	.shopcar
	  position:fixed
	  bottom:0
	  left:0
	  height:48px
	  width:100%
	  z-index:250
	  .content
	    height:48px
	    display:flex
	    background:#141d27
	    font-size:0
	    .content-left
	      flex:1
	      .logo-wrapper
	        display:inline-block
	        vertical-align:top
	        position:relative
	        top:-10px
	        margin:0 12px
	        padding:6px
	        width:56px
	        height:56px
	        box-sizing: border-box
	        border-radius: 50%
	        background:#141d27
	        .logo
	          width:100%
	          height:100%
	          border-radius:50%
	          background: rgba(0,0,0,0.2)
	          text-align:center
	          &.highlight
	            background:rgb(0,160,220)
	          .icon-shopping_cart
	            font-size:24px
	            line-height:44px
	            color:rgba(255,255,255,0.4)
	            &.highlight
	              color:#fff
	        .num
	          position:absolute
	          top:0px
	          right:0
	          text-align:center
	          width:24px
	          height:16px
	          line-height:16px
	          font-size:9px
	          color:#fff
	          font-weight:700
	          background: rgb(240,20,20)
	          border-radius:16px
	      .price
	        display:inline-block
	        margin:12px 0
	        padding:0 12px
	        height:24px
	        font-size:16px
	        line-height:24px
	        font-weight:700
	        color: rgba(255,255,255,0.2)
	        border-right:1px solid rgba(255,255,255,0.1)
	        &.highlight
	          color:#fff
	      .desc
	        display:inline-block
	        vertical-align:top
	        margin:12px 0
	        padding:0 12px
	        font-size:16px
	        line-height:24px
	        font-weight:700
	        color:rgba(255,255,255,0.4)
	    .content-right
	      flex:0 0 105px
	      text-align:center
	      .pay
	        display:inline-block
	        width:105px
	        height:100%
	        color:rgba(240,240,240,0.4)
	        font-weight:700
	        line-height:44px
	        font-size:12px
	        background:#2b333b
	        &.not-enough
	          background:#2b333b
	        &.enough 
	          background:#00b43c
	  .shopcar-list
	    position:absolute
	    bottom:48px
	    left:0
	    width:100%
	    z-index:-1
	    .list-header
	      height:40px
	      line-height:40px
	      background: #f3f5f7
	      padding:0 18px
	      border－bottom:1px solid (rgba(7,17,27,0.1))
	      .title
	        width:50px
	        float:left
	        font-size:14px
	        color:rgb(7,17,27)
	      .empty
	        float:right
	        font-size:12px
	        color:rgb(0,160,220)
	    .list-content
	      background:#fff
	      padding:0 12px
	      overflow:hidden
	      max-height:217px
	      .liststyle
	        list-style-type:none
	        .food
              position: relative
              padding: 12px 0
              box-sizing: border-box
              border-1px(rgba(7,17,27,0.1))
              .name
                line-height: 24px
                font-size: 12px
                color: rgb(7,17,27)
              .price
                position: absolute
                right: 102px
                bottom: 12px
                line-height: 24px
                font-size: 14px
                font-weight: 700
                color: rgb(240,20,20)
              .carcontrol-wrapper
                position: absolute
                right: 0
                bottom: 6px




</style>   
        
