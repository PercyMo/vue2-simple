<template>
  <div class="ratingSelect">
    <div class="rating-type border-1px">
      <span
        class="rating-type-item rating-type_all"  
        :class="{active: selectType === 2}"
        @click.stop.prevent="typeSelect(2, $event)"
      >
        {{ desc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span
        class="rating-type-item rating-type_satisfied"
        :class="{active: selectType === 0}"
        @click.stop.prevent="typeSelect(0, $event)"
      >
        {{ desc.satisfied }}
        <span class="count">{{ statisfied.length }}</span>
      </span>
      <span
        class="rating-type-item rating-type_dissatisfied"
        :class="{active: selectType === 1}"
        @click.stop.prevent="typeSelect(1, $event)"
      >
        {{ desc.dissatisfied }}
        <span class="count">{{ disstatisfied.length }}</span>
      </span>
    </div>
    <div class="rating-switch"
      :class="{active: contentSwitch === true}"
      @click.stop.prevent="ratingSwitch($event)"
    >
      <i class="rating-switch-icon icon-check_circle"></i><span class="rating-switch-text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>

  const ALL = 2
  const SATISFIED = 0
  const DISSATISFIED = 1

  export default {
    name: 'ratingSelect',
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      contentSwitch: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            satisfied: '推荐',
            dissatisfied: '吐槽'
          }
        }
      }
    },
    computed: {
      statisfied () {
        return this.ratings.filter((rating) => {
          return rating.rateType === SATISFIED
        })
      },
      disstatisfied () {
        return this.ratings.filter((rating) => {
          return rating.rateType === DISSATISFIED
        })
      }
    },
    methods: {
      typeSelect (type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('select', type)
      },
      ratingSwitch (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('ratingSwitch')
      }
    }
  }
</script>

<style lang="scss" type="text/css" scoped>

  @import '../../common/scss/_mixin';

  .ratingSelect {
    .rating-type {
      padding-bottom: 18px;
      font-size: 0;
      @include border-1px(7, 17, 27, .1);

      .rating-type-item {
        margin-right: 8px;
        padding: 8px 12px;
        display: inline-block;
        color: rgb(77, 85, 93);
        font-size: 12px;
        line-height: 16px;
        border-radius: 1px;
        background: rgba(0, 160, 220, .2);

        .count {
          margin-left: 2px;
          font-size: 8px;
        }

        &.active {
          color: #fff;
          background: rgb(0, 160, 220);
        }
      }

      .rating-type_dissatisfied {
        background: rgba(77, 85,93, .2);
        &.active {
          background-color: #93999f;
        }
      }
    }

    .rating-switch {
      margin: 0 -18px;
      padding: 12px 18px;
      height: 24px;
      color: rgb(147, 153, 159);
      font-size: 12px;
      line-height: 24px;
      vertical-align: top;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      &.active .rating-switch-icon {
        color: #00c850;
      }
    }

    .rating-switch-icon {
      margin-right: 4px;
      font-size: 24px;
    }

    .rating-switch-text {
      display: inline-block;
      vertical-align: top;
    }
  }
</style>