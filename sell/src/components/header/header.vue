<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
					<img :src="headerSeller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span cladd="name">{{headerSeller.name}}</span>
				</div>
				<div class="description">
					{{headerSeller.description}}/{{headerSeller.deliveryTime}}分钟送达
				</div>
				<div v-if="headerSeller.supports" class="support">
					<span class="icon" :class="classMap[headerSeller.supports[0].type]"></span>
					<span class="text">{{headerSeller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="headerSeller.supports" @click="showDetail" class="support-count">
        		<span class="count">{{headerSeller.supports.length}}个</span>
        		<i class="icon-keyboard_arrow_right"></i>
      		</div>
	    </div>
		<div class="bulletin-wraaper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{headerSeller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
    <div class="background">
      <img :src="headerSeller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{headerSeller.name}}</h1>   
          <div class="star-wrapper">
              <star :size="48" :score="headerSeller.score"></star>
          </div> 
          <div class="favourable">
            <div class="line"></div>
            <div class="title">优惠信息</div>
            <div class="line"></div>
          </div> 
          <ul v-if="headerSeller.supports" class="supports">
            <li class="supports-item" v-for="(item,index) in headerSeller.supports">
              <span class="icon" :class="classMap[headerSeller.supports[index].type]"></span>
              <span class="text">{{headerSeller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="notice">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div v-if="headerSeller.bulletin" class="bulletin">
            <p class="content">{{headerSeller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'


	export default {
		props: {
			headerSeller: {
				type:Object
			}
		},
    data() {
      return {
        detailShow:false
      };
    },
    methods:{
      showDetail() {
        this.detailShow = true;
      }
    },
		created() {
			this.classMap=['decrease','discount','special','invoice','guarantee',];
		},
    components: {
    star
    },

	};
</script>

<style lang="stylus">
 @import "../../common/stylus/mixin.styl";
	.header
      position: relative
      overflow: hidden
      color: #fff
      background: rgba(7,17,27,0.5)
      .content-wrapper
        position: relative
        padding: 24px 12px 18px 24px
        font-size:0
        .avatar
          display: inline-block
          vertical-align: top
          border-radius: 2px
        .content
          display: inline-block
          margin-left: 16px
          font-size:14px
          .title
            margin: 2px 0 8px 0
            .brand
              display: inline-block
              width: 30px
              height: 18px
              vertical-align: top
              bg-image("brand")
              background-size: 30px 18px
              background-repeat: no-repeat
            .name
              margin-left: 6px
              font-size: 16px
              font-weight: bold
              line-height: 18px
          .description
            margin-bottom:10px
            line-height: 12px
            font-size: 12px
            font-weight: 200
          .support
            margin: 10px 0 2px 0
            font-size: 10px
            .icon
              display: inline-block
              margin-right: 4px
              vertical-align: top
              background-size: 12px 12px
              background-repeat: no-repeat
              &.discount
                bg-image("discount_1")
              &.decrease
                bg-image("decrease_1")
              &.guarantee
                bg-image("guarantee_1")
              &.invoice
                bg-image("invoice_1")
              &.special
                bg-image("special_1")
            .text
              line-height: 12px
              font-size:10px
        .support-count
          position: absolute
          right: 12px
          bottom: 14px
          padding: 0 8px
          height: 24px
          border-radius: 14px
          background: rgba(0,0,0,0.2)
          text-align: center
          .count
            vertical-align: top
            font-size: 10px
            line-height: 24px
          .icon-keyboard_arrow_right
            margin-left: 2px
            font-size: 10px
            line-height: 24px
	  .bulletin-wraaper
	    position:relative
	    height:28px
	    line-height:28px
	    padding:0 22px 0 12px
	    white-space:nowrap
	    overflow:hidden
	    text-overflow:ellipsis
	    background:rgba(7,17,27,0.2)
	    .bulletin-title
	      margin-top:7px
	      display:inline-block
	      vertical-align:top
	      width:22px
	      height:12px
	      bg-image('bulletin')
	      background-size:22px 12px
	      background-repeat:no reapeat
	    .bulletin-text
	      vertical-align:top
	      margin: 0 4px
	      font-size:10px
	    .icon-keyboard_arrow_right
	      position:absolute
	      font-size:10px
	      right:12px
	      height:8px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .detail 
      position:fixed
      top:0
      left:0
      z-index:10
      width:100%
      height:100%
      overflow:auto
      background:rgba(7,17,27,0.8)
      .detail-wrapper
        min-height:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            font-size:16px
            text-align:center
            color:rgb(255,255,255)
            line-height:16px
            font-weight:700
          .star-wrapper
            text-align:center 
          .favourable
            display:flex
            width:80%
            margin:30px auto 24px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            .title
              padding:0 12px 0 12px
              font-size:14px
          .supports
            width:80%
            margin:24px auto 28px auto
            font-size:0
            .supports-item
              list-style-type:none
              padding:0 12px
              margin-bottom:12px
              &:last-child
                margin-bottom:0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                vertical-align: middle
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size:12px
                color:rgb(255,255,255)
                line-height:12px
                font-weight:200
                vertical-align:middle
          .notice
            display:flex
            width:80%
            margin:0 auto
            .line
              flex:1
              position:relative
              top:-6
              border-bottom:1px solid rgba(255,255,255,0.2)
            .text
              font-size:14px
              line-height:14px
              padding:0 14px
              font-weight:700
              color:rgb(255,255,255)
          .bulletin
            width:80%
            margin:0 auto
            .content
              padding:24px 12px 0 12px
              font-size:12px
              line-height:24px
              font-weight:200px
              color:rgb(255,255,255)
      .detail-close
        position:relative
        width: 32px
        height:32px
        margin:-64px auto 0 auto
        clear:both
        font-size:32px
       


</style>