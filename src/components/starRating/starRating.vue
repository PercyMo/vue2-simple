<template>
  <div class="star-rating" :class="starType">
    <span
      class="star-rating-item"
      :class="item"
      v-for="item in items"
    ></span>
  </div>
</template>

<script>

const LENGTH = 5
const LCS_ON = 'star_on'
const CLS_HALF = 'star_half'
const CLS_OFF = 'star_off'

export default {
  name: 'star-rating',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
    starType () {
      return 'star-rating' + this.size
    },
    items () {
      let result = []
      //判断是否具有大于.5的小数
      let score = Math.floor(this.score * 2) / 2
      let hasPoint = score % 1 !== 0
      let starCount = Math.floor(this.score)

      for ( let i = 0; i < starCount; i++) {
        result.push(LCS_ON)
      }

      if (hasPoint) {
        result.push(CLS_HALF)
      }

      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }

      return result
    }
  }
}
</script>

<style lang="scss" type="text/css" scoped>

  @import '../../common/scss/_mixin';

  .star-rating-item {
    display: inline-block;
    background-size: 100% auto;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  .star-rating48 {
    .star-rating-item {
      margin-right: 22px;
      width: 20px;
      height: 20px;
      &:last-child {
        margin-right: 0;
      }
    }

    .star_on {
       @include bg-image('./star48_on');
    }

    .star_half {
       @include bg-image('./star48_half');
    }

    .star_off {
       @include bg-image('./star48_off');
    }
  }

  .star-rating36 {
    .star-rating-item {
      margin-right: 6px;
      width: 15px;
      height: 15px;
      &:last-child {
        margin-right: 0;
      }
    }

    .star_on {
       @include bg-image('./star36_on');
    }

    .star_half {
       @include bg-image('./star36_half');
    }

    .star_off {
       @include bg-image('./star36_off');
    }
  }

  .star-rating24 {
    .star-rating-item {
      margin-right: 3px;
      width: 10px;
      height: 10px;
      &:last-child {
        margin-right: 0;
      }
    }

    .star_on {
       @include bg-image('./star24_on');
    }

    .star_half {
       @include bg-image('./star24_half');
    }

    .star_off {
       @include bg-image('./star24_off');
    }
  }

</style>