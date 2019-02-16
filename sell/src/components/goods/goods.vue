<template>
<div class="total">
	<div class="goods">
		<div class="menu-wrapper" ref="menu">
			<ul class="menu">
			  <li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex===index}" @click="select(index,$event)">
			    <span class="title border-1px"><span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
			  	</span>
			  </li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foods">
			<ul class="foods">
				<li v-for="item in goods" class="foods-item foods-list-hook">
					<h1 class="text">{{item.name}}</h1>
					<ul class="food">
						<li @click="selectfood(items)" v-for="items in item.foods" class="food-item">
							<div class="icon">
								<img :src="items.icon" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{items.name}}</h2>
								<div class="description">{{items.description}}</div>
								<div class="extra">
									<span class="sellcount">月售{{items.sellcount}}</span>
									<span class="ratings">好评率{{items.rating}}%</span>
								</div>
								<div class="price">
									<span class="new">¥{{items.price}}</span>
								    <span v-if="items.oldprice>0" class="old">¥{{items.oldprice}}</span>
								</div>
								<div class="control-wrapper">
									<carcontrol :food="items"></carcontrol>
						        </div>
							</div>
							
						</li>
					</ul>	
				</li>
			</ul>
		</div>
		<shopcar :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcar>
		
    </div>
        <food :food="selectedFood" ref="food"></food>
        </div>
</template>

<script type="text/esmascript-6">
	import BScroll from 'better-scroll';
	import shopcar from '../shopcar/shopcar';
    import carcontrol from '../carcontrol/carcontrol';
    import food from '../food/food';
	const ERR_OK=0;
	export default{ 

		props:{
			seller:{}
		},
		
		data() {
			return {
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood: {}
			};
		},

		computed: {
			currentIndex() {
				for (let i=0;i<this.listHeight.length;i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i+1];
					if (!height2 ||(this.scrollY >=height1 && this.scrollY<height2)) {
						return i;
					}
				}
				return 0;
			},
			 selectFoods() {
                  let foods = [];
      			    this.goods.forEach(good => {
       					 good.foods.forEach(items => {
          				if (items.count) {
           					 foods.push(items);
                }
           })
          });
			return foods   
		}
	},
		created() {
			this.classMap=['decrease','discount','special','invoice','guarantee',];

			this.$http.get('/api/goods').then((response) => {

				if(response.data.errno === ERR_OK) {
					this.goods = response.data.data;
					console.log(response.data)
					this.$nextTick(()=> {
						this._initScroll();
						this.calcHeight();
					});

				}
               
			});
            
		},

		methods: {
			select(index,event) {
				// 派发事件的默认属性constructed
				if(!event._constructed){
					return;
				}
				let foodList = this.$refs.foods.getElementsByClassName('foods-list-hook');
				let el=foodList[index];
				this.foodScroll.scrollToElement(el,300);
				

			},
			// 初始化滚动插件
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menu,{
					click:true
				});

				this.foodScroll = new BScroll(this.$refs.foods,{
					probeType:3,
					click:true
					
				});

				this.foodScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));
				});

			},
		
			calcHeight() {
				let foodList = this.$refs.foods.getElementsByClassName('foods-list-hook');
				let height = 0;
			 	this.listHeight.push(height);
      			for (let i = 0; i < foodList.length; i++) {
        				height += foodList[i].clientHeight;
       			 		this.listHeight.push(height);
      			}
    		},
    		selectfood(items) {
    		
    			this.selectedFood = items;

    			this.$refs.food.show();
    		}
		},
		components: {
			shopcar,
			carcontrol,
			food
		}

	};
</script>

<style lang="stylus" rel="stylesheet/stylus"> 
	 @import "../../common/stylus/mixin.styl";
  
	.goods
	  display:flex
	  position:absolute
	  width:100%
	  top:174px
	  bottom:48px
	  overflow:hidden
	  .menu-wrapper
	    flex: 0 0 80px
	    background:#f3f5f7
	    .menu
	      margin:0
	      padding:0
	      .menu-item
	        list-style-type:none
	        text-align:center
	        font-weight:200
	        &.current
	          position:relative
	          z-index:10
	          margin-top:-1px
	          background:#fff
	          font-weight:700
	          .title
	            border-none()
	        .title
	          display:inline-block
	          padding:20px 0px
	          width:56px
	          font-size:12px
	          color:rgb(7,17,27);
	          line-height:14px
	          border-1px:(rgba(7,17,27,0.1))
	          .icon
	            display:inline-block
	            width:12px
	            height:12px
	            background-size:12px 12px
	            background-repeat:no-repeat
	            &.decrease
                  bg-image("decrease_3")
	            &.discount
                  bg-image("discount_3")
                &.invoice
                  bg-image("invoice_3")   
                &.guarantee
                  bg-image("guarantee_3")
                &.special
                  bg-image("special_3")
	  .foods-wrapper
	    flex:1 
	    .foods
	      padding:0
	      margin:0
	      .foods-item
	        list-style-type:none
	        .text
	          font-size:14px
	          padding-left:14px
	          height:26px
	          color:rgb(147,153,159)
	          line-height:26px
	          border-left:2px solid #d9dde1
	          background:#f3f5f7
	         .food
	           padding:0
	           .food-item
	             display:flex
	             margin:0 18px
	             border-1px(rgba(7,17,27,0.1))
	             padding:18px 0
	             &:last-child
	               border-none()
	             .icon
	               flex:0 0 57px
	               margin-right:10px
	             .content
	               position:relative
	               flex:1
	               .name
	                 font-size:14px
	                 margin:0
	                 margin:2px 0 8px 0
	                 height:14px
	                 line-height:14px
	                 color: rgb(7,17,27)
	               .description
	                 font-size:10px
	                 color:rgb(147,153,159)
	                 line-height:10px
	                 margin-bottom:8px
	               .extra
	                 font-size:10px
	                 color:rgb(147,153,159)
	                 line-height:10px
	                 margin-bottom:8px
	                 .sellcount
	                   margin-right:12px
                   .price
                     font-weight:700
                     font-size:24px
                     .new
                       margin-right:8px
                       font-size:14px
                       line-height:24px
                       color: rgb(240,20,20)
                     .old 
                       text-decoration:line-through
                       font-size:10px
                       color: rgb(147,153,159)
                 .control-wrapper
                   position:absolute  
                   bottom:-12px
                   right:18px                   



</style>