<template>
    <div class="led-strip" v-bind:style="{
            width: circleSize + 'px',
            height: circleSize + 'px'
          }">

        <Led v-bind:color="color" v-for="(color, index) in colors" v-bind:style="{
          transform: 'rotate(' +  getRotationFor(index) + 'deg) translate(' + circleSize / 2 + 'px)'
        }"/>

    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import tinycolor from 'tinycolor2';
    import Led from '@/components/Led.vue';
    @Component({
        components: { Led }
    })
    export default class LedStrip extends Vue {
        @Prop() private colors!: tinycolor.Instance[];
        private circleSize: number;

        private created() {
          this.circleSize = this.colors.length * 7;
        }

        private getRotationFor(i: number) {
          return (360 / this.colors.length) * i;
        }
    }


    // CIRCLE ARRANGEMENT: https://codepen.io/anon/pen/rRpjjX
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @mixin on-circle($item-size) {
    position: relative;
    border-radius: 50%;
    padding: 0;
    list-style: none;

    > * {
      display: block;
      position: absolute;
      top:  50%;
      left: 50%;
      margin: -($item-size / 2);
      width:  $item-size;
      height: $item-size;

      &:first-of-type:after {
        content: "☞";
        position: absolute;
        left: -30px;
        top: -8px;
        font-size: 26px;
      }

    }
  }

  .led-strip {
    @include on-circle($item-size: 20px);
    margin: 1em auto 0;
    border: none;

    Led {
      display: block;
      max-width: 100%;
      border-radius: 50%;
    }
  }
</style>

