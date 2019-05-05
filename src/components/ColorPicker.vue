<template>
  <div class="color-picker">
    <ul class="swatches">
      <li
        :key="index"
        v-for="(swatch, index) in swatches"
        :style="{ background: `#${swatch}` }"
        class="swatch"
        :class="[
          { active: index === activeSwatch },
          { light: isLight(swatch) }
        ]"
        @click="activeSwatch = index"
      >
        <check-icon />
      </li>
    </ul>
    <div class="color">
      <button
        :key="index"
        v-for="(mode, index) in colorModes"
        class="color-mode"
        :class="[{ active: index === activeMode }, `color-mode-${mode}`]"
        @click="activeMode = index"
      >
        {{ mode }}
      </button>
    </div>
    <div class="color-code">{{ activeCode }}</div>
  </div>
</template>

<script>
import { rgb, hex, hsl, isLight } from '@/utils/color'
import CheckIcon from '@/assets/check.svg'

const modes = { rgb, hex, hsl }

export default {
  components: { CheckIcon },
  props: {
    swatches: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeSwatch: 0,
      activeMode: 0,
      colorModes: ['hex', 'rgb', 'hsl'],
      isLight
    }
  },
  computed: {
    activeCode() {
      const activeColor = this.swatches[this.activeSwatch]
      const activeMode = this.colorModes[this.activeMode]
      return modes[activeMode](activeColor)
    }
  }
}
</script>

<style>
.color-picker {
  background-color: #fff;
  border: 1px solid #dae4e9;
  border-radius: 0.125rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  color: #596a73;
  font-family: BlinkMacSystemFont, Helvetica Neue, sans-serif;
  padding: 1rem;
}

.swatches {
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: -0.25rem -0.25rem 0.75rem;
  padding: 0;
}

.swatch {
  border-radius: 0.125rem;
  cursor: pointer;
  height: 2rem;
  margin: 0.25rem;
  position: relative;
  width: 2rem;
}

.swatch::after {
  border-radius: 0.125rem;
  bottom: 0;
  box-shadow: inset 0 0 0 1px #dae4e9;
  content: '';
  display: block;
  left: 0;
  mix-blend-mode: multiply;
  position: absolute;
  right: 0;
  top: 0;
}

.swatch svg {
  display: none;
  color: #fff;
  fill: currentColor;
  margin: 0.5rem;
}

.swatch.active svg {
  display: block;
}

.swatch.light svg {
  color: #606f7b;
}

.color {
  display: flex;
  font-size: 1rem;
  letter-spacing: 0.05rem;
  margin: 0 -0.25rem 0.75rem;
}

.color-mode {
  background: none;
  border: none;
  color: #9babb4;
  cursor: pointer;
  display: block;
  font-weight: 700;
  margin: 0 0.25rem;
  padding: 0;
  text-transform: uppercase;
}

.color-mode.active {
  color: #364349;
}

.color-mode:focus {
  color: #364349;
  outline: 0;
}

.color-code {
  border: 1px solid #dae4e9;
  border-radius: 0.125rem;
  color: #364349;
  text-transform: uppercase;
  padding: 0.75rem;
}
</style>
