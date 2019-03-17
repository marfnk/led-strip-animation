<template>
    <span class="led"
          v-bind:style="{
            backgroundColor: color.toHex8String(),
            boxShadow: '0px 0px ' + color.getBrightness() / 256 * 30 + 'px 0px ' + color.toHex8String()
          }"></span>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import tinycolor from 'tinycolor2';

    @Component
    export default class Led extends Vue {
        @Prop() private color!: tinycolor.Instance;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .led {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 1px;
  }
</style>
