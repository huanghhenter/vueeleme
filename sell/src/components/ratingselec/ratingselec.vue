<template>
	<div>
		<div class="selectype border-1px">
			<span @click='select(2)' class="select positive" :class="{active:selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click='select(0)' class="select positive" :class="{active:selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click='select(1)' class="select negative" :class="{active:selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="chooseContent" class="onlycontent border-1px" :class="{on:onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const ALL = 2;
	const POSITIVE = 0;
	const NEGATIVE = 1;

	export default{
		props: {
			ratings:{
				type:Array,
				default() {
			        return [];
			      }
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
		   	   type:Boolean,
		   	   default:false
		   },
		   desc:{
		   	type:Object,
		   	default() {
		   		return {
                 all: '全部' ,
                 positive: '满意',
                 negative: '不满意'
		   		}
		   	}
		   },
		},
		computed:{
			positives(){
                   return this.ratings.filter((rating) =>{
                   	return rating.rateType===POSITIVE
                   })
			},
			negatives(){
				 return this.ratings.filter((rating) =>{
                 	return rating.rateType===NEGATIVE
                   })
			}
		},
		methods: {
			select(type){
				this.$emit('bigMon',type)
				click:true;


			},
			chooseContent()	{
				this.$emit('only')
				click:true;
			}  
	}
		}

</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl";

  .selectype
    padding:18px 0
    margin:0 18px
    border-1px(rgba(7,17,27,0.1))
    .select
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      border-radius: 1px
      line-height: 16px
      font-size: 12px
      color: rgb(77,85,93)
      &.active
        color: #fff
      .count
        margin-left: 2px
        font-size: 10px
      &.positive
        background: rgba(0,160,220,0.2)
        &.active
          background: rgb(0,160,220)
      &.negative
        background: rgba(77,85,93,0.2)
        &.active
          background: rgba(77,85,93,0.5)
  .onlycontent
    border-1px(rgba(7,17,27,0.1))
    padding:12px 18px
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display:inline-block
      vertical-align:top
      font-size:24px
      line-height:24px
      color:rgb(147,153,159)
    .text
      display:inline-block
      vertical-align:top
      font-size:12px
      color:rgb(147,153,159)
      line-height:24px

  

</style>