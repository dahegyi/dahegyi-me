<script setup>
import { ref, onMounted } from "vue";
import Typed from "typed.js";

import meImage from "~/assets/kisk.webp";

defineProps({
  openModal: {
    type: Function,
    default: () => {},
  },
});

const isButtonVisible = ref(false);

const typedString = `
    <h3 style="margin-top:2px;">less is more, but not here.</h3>
    in a world where so many hesitate at the threshold of the unknown, i find my footing.<br />
    thriving on unpredictability, i embrace life's chaotic elements as the raw material for growth.<br />
    to me, every curveball is an invitation to step up to the plate and turn challenges into achievements.
  `;

onMounted(() => {
  const options = {
    startDelay: 700,
    strings: [typedString],
    typeSpeed: 30,
    showCursor: false,
    onComplete: () => {
      setTimeout(() => {
        isButtonVisible.value = true;
      }, 1500);
    },
  };

  new Typed(".typed-output", options);
});
</script>

<template>
  <div id="about" class="row px-sm-5">
    <div class="portrait col-5 px-md-5 d-none d-sm-block">
      <img :src="meImage" alt="this me" class="ps-md-2" />
    </div>
    <div class="col pe-md-5">
      <h2>&raquo; story time</h2>

      <p>think of me as the dj of code -- spinning bugs into features.</p>

      <div class="speech-bubble my-3">
        <div class="hidden-text" v-html="typedString" />

        <div class="typed-output" />

        <button
          :class="isButtonVisible ? '' : 'hidden'"
          @click="() => openModal('about')"
        >
          read more...
        </button>
      </div>

      <img :src="meImage" alt="this me" class="mt-5 mb-4 d-sm-none" />
    </div>

    <div class="motto col-12 my-4">
      <p><strong>~ my motto is:</strong></p>

      <blockquote>
        Uncaught SyntaxError: expected expression, got ';'
      </blockquote>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/styles/variables";

#about {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.portrait {
  display: flex;
  align-items: center;
}

img {
  display: block;
  width: 100%;
  max-width: 200px;
  height: auto;
  margin: 0 auto;
  user-select: none;

  @include media-breakpoint-up(md) {
    max-width: none;
  }
}

.row {
  padding: 0 2rem;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  text-align: left;

  @include media-breakpoint-up(sm) {
    font-size: 1.8rem;
  }

  @include media-breakpoint-up(md) {
    font-size: 2.2rem;
  }
}

p {
  font-size: 14px;
  line-height: 20px;
}

.speech-bubble {
  $spacing: 1rem;

  position: relative;
  z-index: 1;
  padding: $spacing;
  border-radius: 10px;
  background: #ffcccc;
  box-shadow: 0 0 0 2px black;
  color: black;
  font-family: "Pixelated MS Sans Serif", Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;

  &::before {
    position: absolute;
    z-index: -1;
    bottom: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top: 0;
    border-bottom-color: black;
    border-left: 0;
    margin-left: 20px;
    content: "";
    transform: rotate(-45deg);
  }

  .hidden-text {
    opacity: 0;
    pointer-events: none;
  }

  .typed-output {
    position: absolute;
    top: $spacing;
    right: $spacing;
    left: $spacing;

    ::-moz-selection {
      background: hotpink;
      color: black;
    }
    ::selection {
      background: hotpink;
      color: black;
    }
  }

  button {
    display: block;
    margin-top: 1rem;
    transition: opacity 0.8s linear;

    &.hidden {
      opacity: 0;
    }
  }

  @include media-breakpoint-up(sm) {
    max-width: 480px;
    margin: 0 0 0 10px;

    &::before {
      top: 20%;
      left: 0;
      margin-left: -10px;

      transform: rotate(45deg);
    }
  }
}

.motto {
  width: 100%;
  max-width: 550px;
  margin: 0 auto;

  blockquote {
    $shadow-color: #660000;

    padding: 20px;
    background: #cc0000;
    box-shadow: generate-shadows($shadow-color);
    color: #fff;
    font-family: Georgia, serif;
    font-size: 1rem;
    line-height: 2.5rem;
    margin-inline-end: 0;
    margin-inline-start: 0;
    quotes: "“" "”" "‘" "’";
    text-align: center;

    &::-moz-selection {
      background-color: black;
      color: white;
    }

    &::selection {
      background-color: black;
      color: white;
    }

    &::before,
    &::after {
      font-size: 2.5rem;
      vertical-align: -0.5rem;
    }

    &::before {
      content: open-quote;
    }

    &::after {
      content: close-quote;
    }
  }

  @include media-breakpoint-up(sm) {
    blockquote {
      font-size: 1.1rem;
      margin-inline-end: 10px;
      margin-inline-start: 10px;
    }
  }

  @include media-breakpoint-up(md) {
    max-width: 650px;

    blockquote {
      font-size: 1.2rem;
      margin-inline-end: 50px;
      margin-inline-start: 50px;
    }
  }
}

::-moz-selection {
  background: hotpink;
  color: white;
}
::selection {
  background: hotpink;
  color: white;
}
</style>
