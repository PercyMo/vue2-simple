<template>
  <div class="goods">
    <div class="g-menu-wrapper" ref="menuScroll">
      <ul class="g-menu">
        <li class="g-menucategory border-1px" v-for="(item, index) in goods" :class="{'current': currentIndex===index}" @click="selectMenu(index, $event)">
          <span class="g-menucategory-in">
            <span class="g-menucategory-icon" v-if="goods[index].type > 0" :class="'icon-' + actMap[goods[index].type]"></span>
            {{ goods[index].name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="g-foods-wrapper" ref="foodsScroll">
      <ul class="g-foods">
        <li class="g-foods-category" v-for="item in goods" ref="foodCategory">
          <h3 class="g-foods-tit">{{ item.name }}</h3>
          <ul class="g-foods-list">
            <li class="g-foods-single border-1px" v-for="food in item.foods" @click="showDetail(food, $event)">
              <div class="food-icon">
                <img :src="food.icon" width="57" height="57" :alt="food.name" :title="food.name">
              </div>
              <div class="food-content">
                <h4 class="food-name">{{ food.name }}</h4>
                <p class="food-desc" v-if="food.description != ''">{{ food.description }}</p>
                <div class="food-sales">
                  <span class="food-sell-count">月售{{ food.sellCount }}份</span>
                  <span class="food-sell-rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="food-price">
                  <span class="food-price-newest">￥<strong>{{ food.price }}</strong></span>
                  <span class="food-price-old" v-if="food.oldPrice != ''">￥<strong>{{ food.oldPrice }}</strong></span>
                </div>
                <cart-controler :food="food"></cart-controler>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
    <food-detail ref="foodDetail" :food="currentFood"></food-detail>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import shopCart from '../shopCart/shopCart'
  import cartControler from '../cartControler/cartControler'
  import foodDetail from '../foodDetail/foodDetail'

  const ERR_OK = 0

  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        actMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        listHeight: [],
        scrollY: 0,
        currentFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let list = []
        this.goods.forEach((item) => {
          item.foods.forEach((food) => {
            if (food.count && food.count > 0) {
              list.push(food)
            }
          })
        })
        return list
      }
    },
    created () {
      this.$http.get('/api/goods').then(response => {
        response = response.body
        if ( response.errno === ERR_OK ) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let items = this.$refs.foodCategory
        let el = items[index]
        this.foodsScroll.scrollToElement(el, 500)
      },
      showDetail (food, event) {
        if (!event._constructed) {
          return
        }
        this.currentFood = food
        this.$refs.foodDetail.show()
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true,
          bounce: false
        })
        this.foodsScroll = new BScroll(this.$refs.foodsScroll, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight () {
        let height = 0
        let items = this.$refs.foodCategory
        this.listHeight.push(height)

        for (let i = 0; i < items.length; i++) {
          let itemHeight = items[i].clientHeight
          height += itemHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopCart,
      cartControler,
      foodDetail
    }
  }
</script>

<style lang="scss" type="text/css" scoped>

  @import '../../common/scss/_mixin';

  .goods {
    width: 100%;
    display: flex;
    position: absolute;
    top: 173px;
    bottom: 48px;
    overflow: hidden;
  }

  .g-menu-wrapper {
    padding-bottom: 10px;
    width: 80px;
    flex: 0 0 80px;
    background-color: #f3f5f7;
  }

  .g-menucategory {
    width: 100%;
    height: 54px;
    display: table;
    @include border-1px(7, 17, 27, .1);
    &:after {
      width: 56px;
      left: 12px;
    }
    &:last-child:after {
      border: none;
    }
    &.current {
      margin-top: -2px;
      position: relative;
      font-weight: 700;
      background: #fff;
      z-index: 10;
      &:after {
        border: none;
      }
    }
  }

  .g-menucategory-in {
    padding: 0 12px;
    display: table-cell;
    color: rgb(7, 17, 27);
    font-size: 12px;
    line-height: 14px;
    vertical-align: middle;
  }

  .g-menucategory-icon {
    margin-top: 1px;
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    background-repeat: no-repeat;
    background-size: 12px 12px;
    &.icon-decrease {
      @include bg-image('./decrease_3');
    }
    &.icon-discount {
      @include bg-image('./discount_3');
    }
    &.icon-special {
      @include bg-image('./special_3');
    }
    &.icon-invoice {
      @include bg-image('./invoice_3');
    }
    &.icon-guarantee {
      @include bg-image('./guarantee_3');
    }
  }

  .g-foods-wrapper {
    flex: 1;
  }

  .g-foods-tit {
    padding-left: 12px;
    height: 26px;
    color: rgb(147, 153, 159);
    font-size: 12px;
    line-height: 26px;
    background-color: #f3f5f7;
    border-left: 3px solid #d9dde1;
  }

  .g-foods-list {
    padding: 0 18px;
  }

  .g-foods-single {
    padding: 18px 0;
    display: flex;
    @include border-1px(7, 17, 27, .1);
    &:last-child:after {
      border: none;
    }

    .food-icon {
      margin-right: 10px;
      width:57px;
      height: 57px;
      flex: 0 0 57px;
    }

    .food-content {
      margin-top: 2px;
      flex: 1;
      position: relative;
    }

    .food-name {
      margin-bottom: 8px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }

    .food-desc {
      margin-bottom: 8px;
      color: rgb(147, 153, 159);
      font-size: 10px;
      line-height: 12px;
    }

    .food-sales {
      color: rgb(147, 153, 159);
      font-size: 10px;
    }

    .food-sell-count {
      margin-right: 10px;
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

    .cartControler {
      position: absolute;
      right: -6px;
      bottom: -6px;
    }
  }
</style>