<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-wrapper">
			<div class="rating-wrapper">
				<div class="rating-left">
				  <div class="score">{{seller.score}}</div>
				  <div class="text">商家评分</div>
				  <div class="compare">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="star-right">
					<div class="attitude">
					  <span class="text">服务态度</span>
					  <span class="icon"><star :size="36" :score=seller.score></star></span>
					  <span class="number">{{seller.score}}</span>
					</div>
					<div class="attitude same">
						<span class='text'>服务态度</span>
						<span class="icon"><star :size="36" :score=seller.serviceScore></star></span>
						<span class="number">{{seller.serviceScore}}</span>
					</div>
           <div class="attitude same">
              	<span class="text">送达时间</span>
              	<span class="need-time">{{seller.deliveryTime}}</span>
          </div>
				</div>
			</div>
      <split></split>
      <ratingselec :ratings="ratings" :select-type="selectType" :only-content="onlyContent" @bigMon="bigMon" @only="only"></ratingselec>
      <ul class="rating-list">
        <li class="rate-details" v-for="rating in ratings" v-show=needShow(rating.rateType,rating.text)>
            <div class="avatar" >
              <img src="rating.avatar" width="28px" height="28px">
            </div>
            <div class="rating-content">
              <div class="username">{{rating.username}}</div>
              <star :size="36" :score=rating.score></star>
              <div class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</div>
              <div class="text">{{rating.text}}</div>
            </div>
       
        </li>
      </ul>
		</div>
    // <shopcar :min-price="seller.minPrice" :delivery-price="seller.deliveryPrice"></shopcar>
    </div>
</template>

<script type="text/esmascript-6">

  import split from '../split/split';
  import star from '../star/star';
  import ratingselec from '../ratingselec/ratingselec';
  import shopcar from'../shopcar/shopcar';
  import BScroll from 'better-scroll';
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ERR_OK=0;
	export default{
		props:{
			seller:{},
     
		},
		data(){
		return{
      ratings:[],
      selectType:ALL,
      onlyContent:true,
    }
		},
  created() {
    this.$http.get('api/ratings').then(response => {
    response=response.body;
    if(response.errno===ERR_OK){
      this.ratings=response.data;
      this.$nextTick(() => {
        console.log(this.$refs.ratings)
         this.scroll=new BScroll(this.$refs.ratings,{
        click:true
      })

     
      })
    }
  });
  },
		methods:{

      bigMon(type){
        this.selectType=type
         this.$nextTick(() => {
        this.scroll.refresh();
      })
      },
      needShow(type,text){
      if(this.onlyContent===true && !text){
          return false;
      }
      if(this.selectType===ALL){
        return true;
      }
      else{
        return this.selectType===type;
      }
      },
      only(){
        if(this.onlyContent==false){
          this.onlyContent=true;
        }
        else{
          this.onlyContent=false;
        }
         this.$nextTick(() => {
        this.scroll.refresh();
      })
      }

    },

		components:{
			split,
			star,
      ratingselec,
      shopcar
		},
	};
</script>

<style lang="stylus" rel="stylesheet/stylus"> 
.ratings
  position:absolute
  top:180px
  bottom:48px
  left:0
  width:100%
  overflow:hidden
  .rating-wrapper
    display:flex
    margin:18px 0
    padding:0 24px
    .rating-left
      flex:0 0 137px
      width:137px
      padding: 6px 0
      border-right:1px solid rgba(7,17,27,0.3)
      .score
        font-size:24px
        color:rgb(255,153,0)
        line-height:28px
        text-align:center
        margin-bottom:6px
      .text
        font-size:12px
        color:rgb(7,17,27)
        line-height:12px
        text-align:center
        margin-bottom:6px
      .compare
        text-align:center
        font-size:10px
        line-height:10px
        color:rgba(7,17,27,0.7)
    .star-right
      flex:1
      padding-left:24px
      .attitude
        &.same
          margin-top:8px
        .text
          margin-right:12px
          font-size:12px
          color:rgb(7,17,27)
          line-height:18px
        .icon
          vertical-align:middle
          margin-right:12px
        .number
          font-size:12px
          color:rgb(255,153,0)
          line-height:18px
        .need-time
          font-size:12px
          color:rgb(147,153,159)
          line-height:18px  
  .rating-list  
    margin:0 
    padding:0       
    .rate-details
      list-style:none
      display:flex
      padding:18px 0
      margin:0 18px
      border-bottom:1px solid rgba(7,17,27,0.1)
      .avatar
        flex:0 0 40px
      .rating-content
        flex:1
        .username
          font-size:10px
          color:rgb(7,17,27)
          line-height:12px
        .star
          display:inline-block
          margin:4px 6px 6px 0
        .deliveryTime
          display:inline-block
          font-size:10px
          color:rgb(147,153,159)
        .text
          font-size:12px
          color:rba(7,17,27)
          line-height:18px



</style>