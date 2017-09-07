<template>
  <div class="cartControler">
    <transition name="move">
      <span class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="removeCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </span>
    </transition>
    <span class="cartControler-count" v-show="food.count > 0">{{ food.count }}</span>
    <span class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></span>
  </div>
</template>

<script>

import Vue from 'vue'

  export default {
    name: 'cart-controler',
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      removeCart (event) {
        if (!event._constructed) {
          return
        }
        this.food.count--
      }
    }
  }
  </script>

<style lang="scss" type="text/css" scoped>
  .cartControler {
    font-size: 0;
    span {
      display: inline-block;
      line-height: 24px;
      vertical-align: top;
    }
  }

  .cart-decrease {
    padding: 6px;
    color: rgb(0, 160, 220);
    font-size: 24px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
      .inner {
        transform: rotate(0);
        transition: all .3s linear;
      }
    &.move-enter-active, &.move-leave-active {
      transition: all .3s linear;
    }
    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .cart-add {
    padding: 6px;
    color: rgb(0, 160, 220);
    font-size: 24px;
  }

  .cartControler-count {
    margin-top: 6px;
    min-width: 12px;
    color: rgb(147, 153, 159);
    font-size: 10px;
    text-align: center;
  }

</style>