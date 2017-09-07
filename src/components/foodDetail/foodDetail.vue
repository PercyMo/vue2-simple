<template>
  <transition name="slide">
    <div class="food-detail" v-show="detailShow" ref="detail">
      <div class="content">
        <div class="food-header">
          <img :src="food.image" alt="food.name" title="food.name">
          <div class="food-back" @click.stop.prevent="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="food-info">
          <h1 class="food-name">{{ food.name }}</h1>
          <div class="food-sales">
            <span class="food-sell-count">月售{{ food.sellCount }}份</span><span class="food-sell-rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="food-price">
            <span class="food-price-newest">￥<strong>{{ food.price }}</strong></span>
            <span class="food-price-old" v-if="food.oldPrice != ''">￥<strong>{{ food.oldPrice }}</strong></span>
          </div>
          <div class="cartControl-wrapper">
            <cart-controler :food="food"></cart-controler>
          </div>
          <transition name="buy">
            <div class="buy" @click.stop.prevent="addFirst($event)" v-if="!(food.count > 0)">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="food-intro" v-if="food.info">
          <p class="food-detail-tit">商品介绍</p>
          <p class="food-intro-text">{{ food.info }}</p>
        </div>
        <split v-if="food.info"></split>
        <div class="food-rating">
          <p class="food-detail-tit">商品评价</p>
          <rating-select
            v-if="food.ratings && food.ratings.length"
            @select="ratingType"
            @ratingSwitch="toggle"
            :selectType="selectType"
            :contentSwitch="contentSwitch"
            :ratings="food.ratings"
          ></rating-select>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li class="rating-item border-1px" v-for="rating in food.ratings" v-show="needRating(rating.rateType, rating.text)">
                <div class="user-info">
                  <span class="user-name">{{ rating.username }}</span>
                  <span class="user-avatar"><img :src="rating.avatar"></span>
                </div>
                <div class="rate-time">{{ rating.rateTime | formatDate}}</div>
                <div class="rate-text">
                  <i :class="{'icon-thumb_down': rating.rateType===1, 'icon-thumb_up': rating.rateType===0}"></i><span class="rate-text-in">{{ rating.text }}</span>
                </div>
              </li>
            </ul>
            <div class="rating-tip" v-if="!(food.ratings && food.ratings.length)">暂时还没有任何评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import cartControler from '../cartControler/cartControler'
  import split from '../split/split'
  import ratingSelect from '../ratingSelect/ratingSelect'
  import {formatDate} from '../../common/js/date'

  const ALL = 2

  export default {
    name: 'food-detail',
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false,
        selectType: ALL,
        contentSwitch: false
      }
    },
    filters: {
      formatDate (date) {
        let time = new Date(date)
        return formatDate(time, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      show () {
        this.detailShow = false,
        this.selectType = ALL,
        this.contentSwitch = false
        this.detailShow = true
        this.$nextTick(() => {
          if (!this.detailScroll) {
            this.detailScroll = new BScroll(this.$refs.detail, {
              click: true,
            })
          } else {
            this.detailScroll.refresh()
          }
        })
      },
      hide () {
        this.detailShow = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      ratingType (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.detailScroll.refresh()
        })
      },
      toggle() {
        this.contentSwitch = !this.contentSwitch
        this.$nextTick(() => {
          this.detailScroll.refresh()
        })
      },
      needRating (type, text) {
        if (this.contentSwitch && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      }
    },
    components: {
      cartControler,
      split,
      ratingSelect
    }
  }
</script>

<style lang="scss" type="text/css" scoped>

  @import '../../common/scss/_mixin';

  .food-detail {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    background-color: #fff;
    z-index: 40;
    transform: translate3d(0, 0, 0);
    &.slide-enter-active, &.slide-leave-active {
      transition: all .4s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    .food-header {
      padding-top: 100%;
      width: 100%;
      height: 0;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .food-back {
      padding: 6px;
      position: absolute;
      top: 10px;
      left: 10px;
      color: #fff;
      background: rgba(7, 17, 27, 0.4);
      border-radius: 50%;
      z-index: 10;

      .icon-arrow_lift {
        display: inline-block;
        vertical-align: top;
      }
    }

    .food-info, .food-intro, .food-rating {
      padding: 18px;
      background-color: #fff;
    }

    .food-info {
      position: relative;
    }

    .food-name {
      margin-bottom: 8px;
      color: rgb(7, 17, 27);
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
    }

    .food-sales {
      margin-bottom: 18px;
      color: rgb(147, 153, 159);
      font-size: 10px;
    }

    .food-sell-count {
      margin-right: 12px;
    }

    .food-price-newest {
      color: rgb(240, 20, 20);
      font-size: 10px;
      font-weight: normal;
      line-height: 24px;
      strong {
        font-size: 14px;
        font-weight: 700;
      }
    }

    .food-price-old {
      color: rgb(147, 153, 159);
      font-size: 10px;
      text-decoration: line-through;
    }
    
    .buy {
      width: 74px;
      height: 24px;
      position: absolute;
      right: 18px;
      bottom: 18px;
      color: #fff;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      background-color: rgb(0, 160, 220);
      border-radius: 12px;
      z-index: 2;
      &.buy-enter-active, &.buy-leave-active {
        transition: all .3s;
      }
      &.buy-enter, &.buy-leave-to {
        opacity: 0;
      }
    }

    .cartControl-wrapper {
      position: absolute;
      right: 12px;
      bottom: 12px;
      z-index: 1;
    }

    .food-detail-tit {
      margin-bottom: 6px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .food-rating {
      .food-detail-tit {
        margin-bottom: 18px;
      }
    }

    .food-intro-text, .rating-tip {
      color: rgb(77, 85,93);
      font-size: 12px;
      line-height: 24px;
    }

    .rating-item {
      padding: 16px 80px 16px 0;
      position: relative;
      @include border-1px(7, 17, 27, .1);
      &:last-child:after {
        border: none;
      }
    }

    .user-info {
      position: absolute;
      right: 0;
      top: 16px;
      font-size: 0;
    }

    .user-avatar {
      margin-left: 6px;
      display: inline-block;
      img {
        width: 12px;
        height: 12px;
        display: block;
        border-radius: 50%;
      }
    }

    .user-name {
      display: inline-block;
      color: rgb(147, 153, 159);
      font-size: 10px;
      line-height: 12px;
    }

    .rate-time {
      margin-bottom: 6px;
      color: rgb(147, 153, 159);
      font-size: 10px;
      line-height: 12px;
    }

    .rate-text-in {
      display: inline-block;
      color: rgb(7, 17, 27);
      font-size: 12px;
      line-height: 16px;
    }

    .icon-thumb_down, .icon-thumb_up {
      margin-right: 4px;
      display: inline-block;
      font-size: 12px;
      line-height: 24px;
    }

    .icon-thumb_down {
      color: rgb(147, 153, 159);
    }

    .icon-thumb_up {
      color: rgb(0, 160, 220);
    }
  }
</style>