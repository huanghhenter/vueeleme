<template>
	<div class="carcontrol">
		<div class="decrease icon-remove_circle_outline" @click="carDecrease"  v-show="food.count>0"></div>
		<div class="food-count" v-show="food.count>0">{{food.count}}</div>
		<div class="car-add icon-add_circle" @click="add"></div>
	</div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';

	export default{

     props: {
     	food: {
     		type:Object,
     	}
     },
     methods:{
     	add(){
     		if(!this.food.count){
     			this.$set(this.food,'count',1)

     		}else{
     			this.food.count++;
     		}
     		
     	},
     	carDecrease(event){
     		if(this.food.count)
     		this.food.count--;
     		}
     }
	}


</script>

<style lang="stylus">
    .carcontrol
      font-size:0
      text-align:center
	  .decrease
	    display:inline-block
	    padding:6px
	    font-size:24px
	    color:rgb(0,160,220)
	  .food-count
	    display:inline-block
	    width:24px
	    height:24px
	    padding-top:6px
	    vertical-align:top
	    line-height:24px
	    font-size:10px
	    color:rgb(147,153,159)
	  .car-add
	    display:inline-block
	    padding: 6px
	    font-size:24px
	    color:rgb(0,160,220)
	    display:inline-block

</style>