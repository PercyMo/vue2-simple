<template>
  <div class="shopCart">
    <div class="shopCart-icon" @click="toggleList">
      <span class="icon-shopping_cart" :class="{active: totalCount != 0}"></span>
      <span class="shopCart-icon-num" v-if="totalCount > 0">{{ totalCount }}</span>
    </div>
    <div class="shopCart-mid" @click="toggleList">
      <span class="shopCart-price" :class="{active: totalPrice != 0}">￥{{ totalPrice }}</span><span v-if="deliveryPrice != undefined" class="shopCart-desc">另需配送费￥{{ deliveryPrice }}</span>
    </div>
    <div class="shopCart-accounts" :class="payClass" @click="pay">{{ accounts }}</div>
    <transition name="fold">
      <div class="shopCart-list" v-show="listShow">
        <div class="shopCart-list-head">
          <span class="list-tit">购物车</span>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="foodsList">
          <ul class="foods-list">
            <li class="foods-item border-1px" v-for="food in selectFoods">
              <div class="foods-item-name">{{ food.name }}</div>
              <cart-controler :food="food"></cart-controler>
              <div class="foods-item-price">￥<strong>{{ food.price * food.count }}</strong></div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="shopCart-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import cartControler from '../cartControler/cartControler'

  export default {
    name: 'shop-cart',
    props: {
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        fold: true
      }
    },
    computed: {
      totalPrice () {
        let price = 0
        this.selectFoods.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      accounts () {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '起送'
        } else if (this.totalPrice < this.minPrice) {
          let differ = this.minPrice - this.totalPrice
          return '还差￥' + differ + '起送'
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if ( !this.totalCount ) {
          this.fold = true
          return false
        }
        if (!this.fold) {
          this.$nextTick(() => {
            if (!this.listScroll) {
              this.listScroll = new BScroll(this.$refs.foodsList, {
                click: true,
                bounce: false
              })
            }else {
              this.listScroll.refresh()
            }
          })
        }
        return !this.fold
      }
    },
    methods: {
      toggleList () {
        if ( !this.totalCount ) {
          return
        }
        this.fold = !this.fold
      },
      hideList () {
        this.fold = true
      },
      empty () {
        this.selectFoods.forEach((item) => {
          item.count = 0
        })
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        } else {
          alert(`支付${this.totalPrice}元`)
        }
      }
    },
    components: {
      cartControler
    }
  }
</script>

<style lang="scss" type="text/css">

  @import '../../common/scss/_mixin';

  .shopCart {
    width: 100%;
    height: 48px;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
  }

  .shopCart-icon {
    padding: 0 12px;
    width: 80px;
    flex: 0 0 80px;
    position: relative;
    box-sizing: border-box;
    background-color: #141d27;

    .icon-shopping_cart {
      width: 44px;
      height: 44px;
      display: block;
      position: relative;
      top: -10px;
      color: rgba(255, 255, 255, .4);
      font-size: 24px;
      line-height: 44px;
      text-align: center;
      background: #2b343c;
      border: 6px solid #141d27;
      border-radius: 50%;
      &.active {
        color: #fff;
        background-color: #00a0dc;
      }
    }
  }

  .shopCart-icon-num {
    width: 24px;
    height: 16px;
    display: block;
    position: absolute;
    top: -10px;
    right: 12px;
    color: #fff;
    font-size: 9px;
    font-weight: bold;
    text-align: center;
    line-height: 16px;
    background-color: #f02626;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
  }

  .shopCart-mid {
    padding: 12px 0;
    flex: 1;
    background-color: #141d27;
  }

  .shopCart-price {
    padding-right: 12px;
    display: inline-block;
    color: rgba(255, 255, 255, .4);
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    border-right: 1px solid rgba(255, 255, 255, .1);
    &.active {
      color: #fff;
    }
  }

  .shopCart-desc {
    padding: 0 12px;
    display: inline-block;
    color: rgba(255, 255, 255, .4);
    font-size: 10px;
    line-height: 24px;
  }

  .shopCart-accounts {
    width: 105px;
    flex: 0 0 105px;
    color: rgba(255, 255, 255, .4);
    font-size: 12px;
    font-weight: 700;
    line-height: 48px;
    text-align: center;
    background-color: #2b333b;
    &.enough {
      color: #fff;
      background-color: #00b43c;
    }
  }

  .shopCart-list {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active, &.fold-leave-active {
      transition: all .4s;
    }
    &.fold-enter, &.fold-leave-to {
      transform: translate3d(0, 0, 0);
    }

    .list-content {
      max-height: 218px;
      overflow: hidden;
    }

    .foods-list {
      padding: 0 18px 22px;
      background-color: #fff;
    }

    .foods-item {
      padding: 12px 0;
      height: 24px;
      @include border-1px(7, 17, 27, .1);
    }

    .foods-item-name {
      height: 24px;
      float: left;
      color: rgb(7, 17, 27);
      font-size: 14px;
      line-height: 24px;
    }

    .foods-item-price {
      margin: 0 12px 0 18px;
      float: right;
      color: rgb(240, 20, 20);
      font-size: 10px;
      line-height: 24px;
      strong {
        font-size: 14px;
        font-weight: 700;
      }
    }

    .cartControler {
      margin: -6px -4px 0 0;
      float: right;
    }
  }

  .shopCart-list-head {
    padding-left: 18px;
    height: 39px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);

    .list-tit {
      float: left;
      color: rgb(7, 17, 27);
      font-size: 14px;
      line-height: 39px;
    }

    .empty {
      padding: 0 18px;
      float: right;
      color: rgb(0, 160, 220);
      font-size: 12px;
      line-height: 39px;
    }
  }

  .shopCart-mask {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(10px);
    background: rgba(7, 17, 27, .6);
    z-index: -2;
    &.mask-enter-active, &.mask-leave-active {
      transition: all .4s;
      opacity: 1;
    }
    &.mask-enter, &.mask-leave-to {
      opacity: 0;
    }
  }

</style>