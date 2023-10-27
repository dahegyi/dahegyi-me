<script setup>
import { ref } from "vue";

import HeaderSection from "~/components/sections/HeaderSection";
import AboutSection from "~/components/sections/AboutSection";
import PortfolioSection from "~/components/sections/PortfolioSection";
import ContactSection from "~/components/sections/ContactSection";
import FooterSection from "~/components/sections/FooterSection";
import InfoModal from "~/components/InfoModal";

const modalState = ref(null);
const modalContent = ref(null);

const openModal = (content) => {
  modalState.value = "opened";
  modalContent.value = content;
};

const closeModal = () => {
  modalState.value = "closed";
};
</script>

<template>
  <main class="main">
    <div class="container">
      <HeaderSection />
      <AboutSection :open-modal="openModal" />
      <PortfolioSection :open-modal="openModal" />
      <ContactSection />
      <FooterSection />

      <InfoModal
        v-if="modalState"
        :modal-state="modalState"
        :modal-content="modalContent"
        :close="closeModal"
      />
    </div>
  </main>
  <canvas id="hydra-canvas" :height="height" :width="width" />
</template>

<script>
import Hydra from "hydra-synth";

export default {
  components: {
    InfoModal,
  },

  data() {
    return {
      height: (window.innerHeight * window.devicePixelRatio) / 16,
      width: (window.innerWidth * window.devicePixelRatio) / 16,
    };
  },

  mounted() {
    const hydra = new Hydra({
      canvas: document.getElementById("hydra-canvas"),
      detectAudio: false,
      height: this.height,
      width: this.width,
    }).synth;

    const { setFunction, osc, gradient, noise } = hydra;

    setFunction({
      name: "fireColor",
      type: "color",
      inputs: [],
      glsl: `
        float red = _c0.r;
        float green = _c0.g;

        if (green > red) {
          green = 0.0;
        }

        return vec4(red, green, 0, 1.0);
      `,
    });

    // fyeah
    osc(30, 0.05, 0.7)
      .rotate(1.5, 0)
      .modulate(noise(10, 0.1), 0.1)
      .add(
        osc(20, 0.05, 0.8)
          .rotate(0, 0.5)
          .modulate(noise(8, 0.5), 0.2)
          .mult(osc(40, 0.1, 0.9).color(1, 0, 0).rotate(1.5, 0)),
        1.2,
      )
      .scale(1, 1, 5)
      .modulate(osc(40, 0.1, 0.9).color(1, 0, 0).rotate(1.5, 0), 0.01)
      .add(
        gradient()
          .rotate(0.25)
          .invert(-0.9)
          .scale(1, 1.5, 1, -10)
          .saturate(0)
          .brightness(-1.1),
      )
      .fireColor()
      .out();
  },
};
</script>

<style scoped lang="scss">
$custom-breakpoint-desktop: 1000px;
.main {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden scroll;
  width: 100%;
  height: 100%;

  .container {
    display: flex;
    width: 1000px;
    max-width: 100%;
    min-height: 100vh;
    flex-direction: column;
    padding: 0;
    background: lightcyan;

    @media (min-width: $custom-breakpoint-desktop) {
      margin: 3rem auto;
      box-shadow:
        black 0 0 0 4px,
        yellow 0 0 0 8px,
        black 0 0 0 12px,
        black 0 0 20px 10px;
    }
  }
}

#hydra-canvas {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 100%;

  @media (min-width: $custom-breakpoint-desktop) {
    display: block;
  }
}
</style>
