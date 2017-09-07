<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="ratings-overview">
        <div class="ratings-overview-l">
          <div class="score">{{ seller.score }}</div>
          <div class="text">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="ratings-overview-r">
          <div class="item">
            <div class="item-title">服务态度</div>
            <div class="item-star-wrapper">
              <star-rating :size="36" :score="seller.serviceScore"></star-rating>
            </div>
            <div class="item-score">{{ seller.serviceScore }}</div>
          </div>
          <div class="item">
            <div class="item-title">菜品评价</div>
            <div class="item-star-wrapper">
              <star-rating :size="36" :score="seller.foodScore"></star-rating>
            </div>
            <div class="item-score">{{ seller.foodScore }}</div>
          </div>
          <div class="item">
            <div class="item-title">送达时间</div>
            <div class="item-text">{{ seller.deliveryTime }}分钟</div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="ratings-detail">
        <rating-select
          v-if="ratings && ratings.length"
          @select="ratingType"
          @ratingSwitch="toggle"
          :selectType="selectType"
          :contentSwitch="contentSwitch"
          :ratings="ratings"
          :desc="desc"
        ></rating-select>
        <div class="rating-wrapper">
          <ul v-if="ratings && ratings.length">
            <li class="rating-item border-1px" v-for="rating in ratings" v-show="needRating(rating.rateType, rating.text)">
              <div class="avatar"><img :src="rating.avatar"></div>
              <div class="user-info">
                <span class="user-name">{{ rating.username }}</span>
                <span class="rate-time">{{ rating.rateTime | formatDate }}</span>
              </div>
              <div class="score-warpper">
                <star-rating :size="24" :score="rating.score"></star-rating>
                <span class="delivery-time" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
              </div>
              <div class="rating-text">{{ rating.text }}</div>
              <div class="recommend-wrapper">
                <i :class="{'icon-thumb_down': rating.rateType===1, 'icon-thumb_up': rating.rateType===0}"></i>
                <span  v-if="rating.recommend.length" class="recommend-item" v-for="item in rating.recommend">{{ item }}</span>
              </div>
            </li>
          </ul>
          <div class="ratings-tip" v-if="!(ratings && ratings.length)">暂时还没有任何评论</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import starRating from '../starRating/starRating'
  import split from '../split/split'
  import ratingSelect from '../ratingSelect/ratingSelect'
  import {formatDate} from '../../common/js/date'

  const ALL = 2
  const ERR_OK = 0

  export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      starRating,
      split,
      ratingSelect,
      BScroll
    },
    data () {
      return {
        ratings: [],
        detailShow: false,
        selectType: ALL,
        contentSwitch: false,
        desc: {
          all: '全部',
          satisfied: '满意',
          dissatisfied: '不满意'
        }
      }
    },
    filters: {
      formatDate (date) {
        let time = new Date(date)
        return formatDate(time, 'yyyy-MM-dd hh:mm')
      }
    },
    created () {
      this.$http.get('/api/ratings').then(response => {
        response = response.body
        if ( response.errno === ERR_OK ) {
          this.ratings = response.data
          this.$nextTick(() => { 
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
    },
    methods: {
      ratingType (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggle () {
        this.contentSwitch = !this.contentSwitch
        this.$nextTick(() => {
          this.scroll.refresh()
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
    }
  }
</script>

<style lang="scss" type="text/css" scoped>

  @import '../../common/scss/_mixin';

  .ratings {
    width: 100%;
    position: absolute;
    top: 173px;
    bottom: 0;
    overflow: hidden;
  }

  .ratings-overview {
    padding: 18px 0;
    display: flex;
  }

  .ratings-overview-l {
    width: 130px;
    flex: 0 0 130px;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, 0.1);

    .score {
      margin-bottom: 6px;
      color: rgb(255, 153, 0);
      font-size: 24px;
      line-height: 28px;
    }

    .text {
      margin-bottom: 8px;
      color: rgb(7, 17, 27);
      font-size: 12px;
    }

    .rank {
      margin-bottom: 6px;
      color: rgb(147, 153, 159);
      font-size: 10px;
    }
  }

  .ratings-overview-r {
    padding: 0 20px;
    flex: 1;

    .item {
      margin-bottom: 8px;
      font-size: 0;
      line-height: 18px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    .item-title {
      margin-right: 12px;
      display: inline-block;
      color: rgb(7, 17, 27);
      font-size: 12px;
      vertical-align: top;
    }

    .item-star-wrapper {
      margin-right: 12px;
      display: inline-block;
      vertical-align: top;

      .star-rating {
        height: 15px;
      }
    }

    .item-score {
      display: inline-block;
      color: rgb(255, 153, 0);
      font-size: 12px;
      vertical-align: middle;
    }

    .item-text {
      display: inline-block;
      color: rgb(147, 153, 159);
      font-size: 12px;
      vertical-align: middle;
    }
  }

  .ratings-tip {
    color: rgb(77, 85,93);
    font-size: 12px;
    line-height: 24px;
  }

  .ratings-detail {
    padding: 18px 18px 0;

    .rating-item {
      padding: 18px 0 18px 40px;
      position: relative;
      @include border-1px(7, 17, 27, .1);
      &:last-child:after {
        border: none;
      }
    }

    .avatar {
      position: absolute;
      top: 18px;
      left: 0;

      img {
        width: 28px;
        height: 28px;
        display: block;
        border-radius: 50%;
      }
    }

    .user-info {
      margin-bottom: 4px;
      position: relative;
      font-size: 10px;
      line-height: 12px;
    }

    .user-name {
      display: block;
      color: rgb(7, 17, 27);
    }

    .rate-time {
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      color: rgb(147, 153, 159);
    }

    .score-warpper {
      margin-bottom: 8px;
      height: 12px;
      font-size: 0;
    }

    .star-rating {
      margin-right: 6px;
      height: 12px;
      display: inline-block;
      vertical-align: top;
    }

    .delivery-time {
      display: inline-block;
      color: rgb(147, 153, 159);
      font-size: 10px;
      line-height: 12px;
      vertical-align: top;
    }

    .rating-text {
      margin-bottom: 8px;
      color: rgb(7, 17, 27);
      font-size: 12px;
      line-height: 18px;
    }

    .recommend-wrapper {
      font-size: 0;

      .icon-thumb_down, .icon-thumb_up {
        margin-right: 8px;
        display: inline-block;
        font-size: 12px;
        line-height: 18px;
        vertical-align: top;
      }

      .icon-thumb_up {
        color: rgb(0, 160, 220);
      }

      .icon-thumb_down {
        color: rgb(183, 187, 191);
      }
    }

    .recommend-item {
      margin: 0 8px 4px 0;
      padding: 0 6px;
      display: inline-block;
      color: rgb(147, 153, 159);
      font-size: 9px;
      line-height: 16px;
      border: 1px solid rgba(7, 17, 27, .1);
      border-radius: 2px;
      vertical-align: top;
    }
  }
</style>