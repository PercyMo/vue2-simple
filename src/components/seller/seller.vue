<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="seller-overview">
        <h1 class="seller-title">{{ seller.name }}</h1>
        <div class="desc border-1px">
          <star-rating :size="36" :score="seller.score"></star-rating>
          <span class="rating-count">({{ seller.ratingCount }})</span>
          <span class="sell-count">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="remark-block">
            <h2>起送价</h2>
            <div class="remark-text">
              <span class="remark-text-num">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="remark-block">
            <h2>商家配送</h2>
            <div class="remark-text">
              <span class="remark-text-num">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="remark-block">
            <h2>平均配送时间</h2>
            <div class="remark-text">
              <span class="remark-text-num">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click.stop.prevent="toggleFavorite($event)"  :class="{active: favorite}">
          <i class="icon-favorite"></i>
          <span class="favorite-text">{{ favoriteText }}</span>
        </div>
      </div>
      <split></split>
      <div class="seller-bulletin">
        <h2 class="seller-title">公告与活动</h2>
        <p class="bulletin-text">{{ seller.bulletin }}</p>
        <ul class="supports">
          <li class="support-item border-1px" v-for="item in seller.supports">
            <span class="support-item-icon" :class="clsMap[item.type]"></span>
            <span class="support-item-desc">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="seller-scene">
        <h2 class="seller-title">商家实景</h2>
        <div class="list-wrapper" ref="picList">
          <ul class="pic-list" :style="{width: width + 'px'}">
            <li class="pic" v-for="item in seller.pics">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-infos">
        <h2 class="seller-title">商家信息</h2>
        <ul class="info-list">
          <li class="info-item border-1px" v-for="item in seller.infos">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import starRating from '../starRating/starRating'
  import split from '../split/split'

  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      starRating,
      split
    },
    data () {
      return {
        clsMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        favorite: false
      }
    },
    computed: {
      width () {
        let picWidth = 120
        let margin = 6
        let result = (picWidth + margin) * this.seller.pics.length - margin
        return result
      },
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    watch: {
      seller () {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
          this.picScroll = new BScroll(this.$refs.picList, {
            scrollX: true
          })
        })
      }
    },
    mounted () {
      this.$nextTick(() => { 
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
        this.picScroll = new BScroll(this.$refs.picList, {
          scrollX: true
        })
      })
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
      }
    }
  }
</script>

<style lang="scss" type="text/css" scoped>

  @import '../../common/scss/_mixin';

  .seller {
    width: 100%;
    position: absolute;
    top: 173px;
    bottom: 0;
    overflow: hidden;
  }

  .seller-title {
    margin-bottom: 8px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller-overview {
    padding: 18px;
    position: relative;

    .desc {
      margin-bottom: 18px;
      padding-bottom: 16px;
      color: rgb(77, 85, 93);
      font-size: 0;
      line-height: 18px;
      @include border-1px(7, 17, 27, .1);
    }

    .star-rating {
      margin: 1px 8px 0 0;
      height: 17px;
      display: inline-block;
      vertical-align: top;
    }

    .rating-count, .sell-count {
      display: inline-block;
      font-size: 10px;
    }

    .rating-count {
      margin-right: 12px;
    }

    .remark {
      margin: 0 -17px;
      display: flex;
    }

    .remark-block {
      flex: 1;
      text-align: center;
      border-right: 1px solid rgba(7, 17, 27, .1);

      h2 {
        margin-bottom: 4px;
        color: rgb(147, 153, 159);
        font-size: 10px;
        font-weight: normal;
      }
    }

    .remark-text {
      color: rgb(7, 17, 27);
      font-size: 10px;
      line-height: 24px;
    }

    .remark-text-num {
      font-size: 24px;
    }

    .favorite {
      width: 36px;
      position: absolute;
      top: 18px;
      right: 18px;
      text-align: center;
      &.active {
        .icon-favorite {
          color: rgb(240, 20, 20);
        }
        .favorite-text {
          color: rgb(77, 85, 93);
        }
      }

      .icon-favorite {
        display: block;
        color: #d4d6d9;
        font-size: 24px;
      }
    }

    .favorite-text {
      color: #93999f;
      font-size: 10px;
    }
  }

  .seller-bulletin {
    padding: 18px 18px 0;
    
    .bulletin-text {
      margin: 0 12px 16px;
      color: rgb(240, 20, 20);
      font-size: 12px;
      line-height: 24px;
    }
    
    .support-item {
      padding: 16px 12px;
      font-size: 0;
      @include border-1px(7, 17, 27, .1);
      &:after {
        top: 0;
        bottom: auto;
      }
    }

    .support-item-icon {
      margin-right: 6px;
      width: 16px;
      height: 16px;
      display: inline-block;
      background-repeat: no-repeat;
      background-size: 100%;
      vertical-align: top;
      &.decrease {
        @include bg-image('./decrease_4');
      }
      &.discount {
        @include bg-image('./discount_4');
      }
      &.special {
        @include bg-image('./special_4');
      }
      &.invoice {
        @include bg-image('./invoice_4');
      }
      &.guarantee {
        @include bg-image('./guarantee_4');
      }
    }

    .support-item-desc {
      height: 16px;
      color: rgb(7, 17, 27);
      font-size: 12px;
      line-height: 16px;
      vertical-align: top;
    }
  }

  .seller-scene {
    padding: 18px;

    .seller-title {
      margin-bottom: 12px;
    }

    .list-wrapper {
      margin: 0 -18px;
      padding: 0 18px;
      height: 90px;
      overflow: hidden;
    }

    .pic-list {
      height: 90px;
    }

    .pic {
      margin-right: 6px;
      float: left;
      &:last-child {
        margin-right: 0;
      }
      img {
        display: block;
      }
    }
  }

  .seller-infos {
    padding: 18px;

    .seller-title {
      margin-bottom: 12px;
    }

    .info-item {
      padding: 16px 12px;
      color: rgb(7, 17, 27);
      font-size: 12px;
      line-height: 16px;
      @include border-1px(7, 17, 27, .1);
      &:after {
        top: 0;
        bottom: auto;
      }
    }
  }
</style>