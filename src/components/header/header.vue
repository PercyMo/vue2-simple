<template>
  <div class="header">
    <div class="h-shop-bg"><img :src="seller.avatar"></div>
    <div class="h-shop-main">
      <div class="h-shop-avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="h-shop-content">
        <div class="h-shop-title">
          <span class="h-shop-title-brand"><img src="" alt=""></span>
          <h2>{{ seller.name }}</h2>
        </div>
        <div class="h-shop-delivery">{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</div>
        <div v-if="seller.supports" class="h-shop-activities">
          <span class="h-shop-activities-icon" :class="actMap[seller.supports[0].type]"></span>
          <span class="h-shop-activities-desc">{{ seller.supports[0].description }}</span>
          <span class="h-shop-activities-count" @click="showDetail">5个<i class="icon-keyboard_arrow_right"></i></span>
        </div>
      </div>
    </div>
    <div class="h-shop-bulletin" @click="showDetail">
      <span class="h-shop-bulletin-icon"></span>
      <span class="h-shop-bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="h-shop-detail">
        <div class="detail-main">
          <h2 class="detail-headding">{{ seller.name }}</h2>
          <star-rating :size="48" :score="seller.score"></star-rating>
          <div class="detail-subtit">
            <div class="detail-subtit-line"></div>
            <div class="detail-subtit-text">优惠信息</div>
            <div class="detail-subtit-line"></div>
          </div>
          <ul v-if="seller.supports" class="detail-support-list">
            <li class="detail-support-item" v-for="(item, index) in actMap">
              <i class="icon" :class="'icon-' + actMap[seller.supports[index].type]"></i>
              <span class="text">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
          <div class="detail-subtit">
            <div class="detail-subtit-line"></div>
            <div class="detail-subtit-text">商家公告</div>
            <div class="detail-subtit-line"></div>
          </div>
          <p class="detail-bulletin">{{ seller.bulletin }}</p>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  import starRating from '../starRating/starRating'

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'star-rating': starRating
    },
    data () {
      return {
        actMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false,
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      closeDetail () {
        this.detailShow = false
      }
    }
  }
</script>

<style lang="scss" type="text/css" scoped>
  
  @import '../../common/scss/_mixin';

  .header {
    height: 134px;
    position: relative;
    color: #fff;
    overflow: hidden;
    background-color: rgba(7, 17, 27, .5);
  }

  .h-shop-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(10px);
    z-index: -1;

    img {
      margin-top: -25%;
      width: 100%;
      display: block;
    }
  }

  .h-shop-main {
    padding: 24px 12px 18px 24px;
    display: flex;
  }

  .h-shop-avatar {
    margin-right: 16px;
    width: 64px;
    height: 64px;

    img {
      border-radius: 2px;
    }
  }

  .h-shop-content {
    margin-top: 2px;
    flex: 1;
  }

  .h-shop-title {
    margin-bottom: 8px;
    font-size: 0;
  }

  .h-shop-title-brand {
    margin-right: 6px;
    width: 30px;
    height: 18px;
    display: inline-block;
    @include bg-image('./brand');
    background-size: 30px 18px;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  .h-shop-title h2 {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
  }

  .h-shop-delivery {
    margin-bottom: 10px;
    font-size: 12px;
  }

  .h-shop-activities {
    position: relative;
    font-size: 0;
  }

  .h-shop-activities-icon {
    margin-right: 4px;
    width: 12px;
    height: 12px;
    display: inline-block;
    vertical-align: top;
    background-size: 12px 12px;
    background-repeat: no-repeat;

    &.decrease {
      @include bg-image('./decrease_1');
    }
    &.discount {
      @include bg-image('./discount_1');
    }
    &.special {
      @include bg-image('./special_1');
    }
    &.invoice {
      @include bg-image('./invoice_1');
    }
    &.guarantee {
      @include bg-image('./guarantee_1');
    }
  }

  .h-shop-activities-desc {
    font-size: 10px;
    line-height: 12px;
  }

  .h-shop-activities-count {
    padding: 0 8px;
    height: 24px;
    position: absolute;
    top: -5px;
    right: 0;
    font-size: 10px;
    line-height: 24px;
    background: rgba(0, 0, 0, .2);
    border-radius: 12px;

    .icon-keyboard_arrow_right {
      margin-left: 2px;
      line-height: 24px;
      vertical-align: middle;
    }
  }

  .h-shop-bulletin {
    padding: 0 28px 0 12px;
    height: 28px;
    position: relative;
    font-size: 10px;
    line-height: 28px;
    background: rgba(7, 17, 27, .2);
    display: flex;

    .icon-keyboard_arrow_right {
      height: 28px;
      position: absolute;
      top: 0;
      right: 12px;
      line-height: 28px;
    }
  }

  .h-shop-bulletin-icon {
    margin: 8px 4px 0 0;
    width: 22px;
    height: 12px;
    display: inline-block;
    vertical-align: top;
    @include bg-image('./bulletin');
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }

  .h-shop-bulletin-text {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .h-shop-detail {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-flow: column;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(7, 17, 27, .8);
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 100;
    backdrop-filter: blur(10px);

    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }

    &.fade-enter-active, &.fade-leave-active {
      transition: all .3s;
    }

    .detail-main {
      padding: 64px 36px;
      flex: 1;
    }

    .detail-headding {
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }

    .star-rating {
      margin-top: 16px;
      padding: 2px 0;
      text-align: center;
    }

    .detail-subtit {
      margin: 28px 0 24px;
      display: flex;
    }

    .detail-subtit-line {
      flex: 1;
      position: relative;
      top: -7px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
    }

    .detail-subtit-text {
      padding: 0 12px;
      font-weight: 700;
      font-size: 14px;
    }

    .detail-support-list {
      margin: 0 12px;
    }

    .detail-support-item {
      margin-bottom: 12px;
      font-size: 0;
      &:last-child {
        margin-bottom: 0;
      }

      .icon {
        margin-right: 6px;
        width: 16px;
        height: 16px;
        display: inline-block;
        background-size: 16px 16px;
        background-repeat: no-repeat;
      }

      .text {
        height: 16px;
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        vertical-align: top;
      }

      .icon-decrease {
        @include bg-image('./decrease_2');
      }
      .icon-discount {
        @include bg-image('./discount_2');
      }
      .icon-special {
        @include bg-image('./special_2');
      }
      .icon-invoice {
        @include bg-image('./invoice_2');
      }
      .icon-guarantee {
        @include bg-image('./guarantee_2');
      }
    }

    .detail-bulletin {
      margin: 0 12px;
      font-size: 12px;
      line-height: 24px;
    }

    .detail-close {
      margin: 32px 0;
      font-size: 32px;
      text-align: center;
    }
  }
</style>
