<script>
import Hydra from "hydra-synth";

export default {
  mounted() {
    const fh = new Hydra({
      canvas: document.getElementById("fire-canvas"),
      makeGlobal: false,
      detectAudio: false,
      width: 40,
      height: 15,
    }).synth;

    fh.noise(4, 0.2)
      .modulateScrollY(fh.osc(10), 0.4)
      .blend(fh.src(fh.o0).scale(1.1), 0.4)
      .color(0, 0.8, 1, 1)
      .out();
  },
};
</script>

<template>
  <footer>
    <div class="fire-container">
      <canvas id="fire-canvas" />
      <h3>~~ keep it cool ~~</h3>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@keyframes cursorSwap {
  0% {
    cursor: url("~/assets/fire-1.png"), auto;
  }

  25% {
    cursor: url("~/assets/fire-2.png"), auto;
  }

  50% {
    cursor: url("~/assets/fire-3.png"), auto;
  }

  75% {
    cursor: url("~/assets/fire-4.png"), auto;
  }

  100% {
    cursor: url("~/assets/fire-1.png"), auto;
  }
}

footer {
  margin-top: 12px;
  animation: cursorSwap 0.3s infinite;
  text-align: center;

  .fire-container {
    position: relative;
    bottom: 0;
    display: flex;
    height: 180px;
    flex-direction: column;

    canvas {
      position: relative;
      z-index: 0;
      width: 100%;
      height: 180px;
      margin-bottom: -180px;
    }

    h3 {
      position: relative;
      z-index: 1;
      height: 180px;
      margin: 2.5rem 0 0;
      background: url("~/assets/flames.gif") repeat-x center bottom;
      color: #fff;
      font-size: 1.5rem;
      text-shadow: #000 0 3px 0;
    }
  }
}

::-moz-selection {
  background: red;
  color: black;
  text-shadow: #fff 0 3px 0;
}
::selection {
  background: red;
  color: black;
  text-shadow: #fff 0 3px 0;
}
</style>
