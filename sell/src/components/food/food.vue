<template>
  <transition name="fade">
		<div v-show="showFlag" class="foodds " ref="foodds">
      <div cladd="total-wrapper">
  			<div class="food-image">
  				<img :src="food.image" class="image-wrapper">
          <div class="close" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
  			</div>
        <div class="food-content">
          <div class="food-name">
            {{food.name}}
          </div>
          <div class="food-detail">
            <span class="food-count">{{food.sellCount}}</span><span class="food-rating">{{food.rating}}</span>
          </div>
          <div class="food-price">
            <span class="now-price">{{food.price}}</span><span class="old-price">{{food.oldprice}}</span>
          </div>
          <div class='control'>
            <carcontrol :food="food"></carcontrol>
          </div>
          <div @click.stop.prevent="firstAdd(food)" class="enter" v-show="!food.count || food.count===0">加入购物车</div>
        </div>
        <split></split>
        <div class="tile">商家评价</div>
        <ratingselec :select-type="selectType" :only-content = 'onlyContent' :desc = 'desc'  @bigMon="bigMon" @only="only" :ratings='food.ratings'>
        </ratingselec>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length" class="rating">
            <li v-for="ratings in food.ratings" class="rating-item " v-show="needShow(ratings.rateType,ratings.text)">
              <div class="rating-time">
                <span class="time">{{ratings.rateTime}}</span>
              </div>
              <div class="rating-text">
                <span :class="{'icon-thumb_down':ratings.rateType===1,'icon-thumb_up':ratings.rateType===0}"></span>
                <span class="text">{{ratings.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
		</div>

	</transition>
</template>

<script type="text/esmascript-6">
  import carcontrol from '../carcontrol/carcontrol';
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import split from '../split/split';
  import ratingselec from '../ratingselec/ratingselec';

  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
	export default {
		props: {
			food: {
				type:Object
			}
		},
		data() {
			return {
				showFlag: false,
        selectType: ALL,
        onlyContent:true ,
        desc:{
            'all':'全部',
            'positive':'推荐',
            'negative':'吐槽',
        }
			};
	},
		methods: { 
		show() {
        	this.showFlag = true;
          this.selectType =ALL;
          this.onlyContent = false;
            this.$nextTick(function () {
              if(!this.scroll){
                  this.scroll = new BScroll(this.$refs.foodds,{
                    click:true

                     });
              }
                this.scroll.refresh();
              
            });
		 },
    hide() {
          this.showFlag=false;
    },
    firstAdd() {
         this.$set(this.food,'count',1)
    },
    bigMon(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
    only() {
     if(this.onlyContent==false){
      this.onlyContent=true;
     }else{
      this.onlyContent=false;
     }
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
     needShow(type,text){
      
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === type;
      }
     }

		},
    components:{
      carcontrol,
      split,
      ratingselec
    }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
  


  .foodds
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    width: 100%
    background: #fff
    z-index:20
    transition: all 0.5s
    border-1px:(rgba(7,17,27,0.1))
    &.fade-enter,&.fade-leave-active
      transform: translate3d(100%,0,0)
    .food-image
      position:relative
      width:100%
      height:0
      padding-top:100%
      .image-wrapper
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
      .close
        position:absolute
        top:16px
        left:0px
        .icon-arrow_lift
          display:block
          padding:10px
          font-size:20px
          color:#fff
    .food-content
      position:relative
      padding:18px
      .food-name
        font-size:14px
        color:rgb(7,17,27)
        line-height:14px
        font-weight:700
        margin-bottom:8px
      .food-count,.food-rating
        font-size:10px
        color:rgb(147,153,159)
        line-height:10px
      .food-count
        margin-right:12px
      .food-price
        .now-price
          font-size:14px
          font-weight:700
          color:rgb(240,20,20)
          line-height:24px
        .old-price
          font-size:10px
          color:rgb(147,153,159)
          line-height:24px
      .control
        position:absolute
        right:12px
        bottom:12px
      .enter
        position:absolute
        right:18px
        bottom:18px
        height:24px
        padding:0 12px
        line-height:24px
        border-radius: 12px
        color:#fff
        background:rgb(0,160,220)
    .tile
      margin-top:18px
      margin-left:18px
      line-height: 14px
      font-size: 14px
      font-weight:700
      color: rgb(7,17,27,)
    .rating-wrapper
      padding:0 18px
      .rating
        padding:0
        margin:0
        .rating-item
          padding:16px
          list-style:none
          border-bottom:1px solid rgba(7,17,27,0.1)
          .rating-time
            font-size:10px
            color:rgb(147,153,159)
            margin-bottom:6px
          .rating-text
            .icon-thumb_down
              font-size:12px
              color:rgb(147,153,159)
              height:24px
            .icon-thumb_up
              font-size:12px
              color:rgb(0,160,220)
            .text
              font-size:12px
              color:rgb(7,17,27)
        


</style>