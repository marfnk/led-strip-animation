<template>
  <div id="app">
    <label for="animation">Animation</label>
    <select id="animation" v-model="selectedAnimation" :disabled="playing">
      <option v-for="a in ANIMATIONS" v-bind:value="a">{{a.name}}</option>
    </select>
    <label for="duration">Duration:</label>
    <input type="number" id="duration" v-model="duration" :disabled="playing"/>ms
    <label for="easing">Easing</label>
    <select id="easing" v-model="selectedEasing" :disabled="playing">
      <option v-for="e in easings" v-bind:value="e">{{e.name}}</option>
    </select>

    <br>
    <button @click="play()" :disabled="playing || !selectedAnimation">play</button>
    <button @click="stop()">stop</button>
    <button @click="clear()">clear</button>

    <LedStrip v-bind:colors="colors" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import LedStrip from '@/components/LedStrip.vue';
  import tinycolor from 'tinycolor2';
  import { ColorBuffer } from 'led-strip-animation';
  import { ANIMATIONS, NUMBER_OF_LEDS } from './animation-config';
  import { NamedAnimation } from './named-animation';
  import eases = require('eases');

  @Component({
    components: {
      LedStrip
    }
  })
  export default class App extends Vue {
    public colors: tinycolor.Instance[] = Array(NUMBER_OF_LEDS).fill(tinycolor('white'));
    public selectedAnimation: NamedAnimation = ANIMATIONS[0];
    public playing: boolean = false;
    public duration: number = 2000;
    public ANIMATIONS = ANIMATIONS;
    private easings = [eases.backInOut, eases.backIn, eases.backOut, eases.bounceInOut,
      eases.bounceIn, eases.bounceOut, eases.circInOut, eases.circIn, eases.circOut,
      eases.cubicInOut, eases.cubicIn, eases.cubicOut, eases.elasticInOut, eases.elasticIn,
      eases.elasticOut, eases.expoInOut, eases.expoIn, eases.expoOut, eases.linear,
      eases.quadInOut, eases.quadIn, eases.quadOut, eases.quartInOut, eases.quartIn,
      eases.quartOut, eases.quintInOut, eases.quintIn, eases.quintOut, eases.sineInOut,
      eases.sineIn, eases.sineOut];
    private selectedEasing: (t: number) => number = eases.linear;
    private colorBuffer: ColorBuffer = new ColorBuffer(NUMBER_OF_LEDS, this.setColors.bind(this));


    constructor() {
      super();
    }

    public async play() {
      this.playing = true;
      await this.selectedAnimation.animation.play(
        this.duration,
        (nextColors: tinycolor.Instance[]) => this.colorBuffer.onColorChange(nextColors),
        this.selectedEasing);
      this.playing = false;
    }

    public setColors(nextColors: tinycolor.Instance[]) {
      this.colors = nextColors;
    }

    public clear() {
      this.colorBuffer.onColorChange(Array(NUMBER_OF_LEDS).fill(tinycolor('black')));
    }

    public stop() {
      if (this.playing) {
        this.selectedAnimation.animation.stop();
      }
    }
  }
</script>

<style lang="scss">
  body {
    background: #2c3e50;
    color: #fff;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 60px;

    .animation-select {
      margin-bottom: 40px;
    }
  }
</style>
