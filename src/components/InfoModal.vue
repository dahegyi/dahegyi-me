<script setup>
import { MODAL_TYPES } from "~/constants";

import kiskisk from "~/assets/kiskisk.webp";
import consbar from "~/assets/consbar.gif";

defineProps({
  // not a boolean so the closing animation can be played
  modalState: {
    type: String,
    default: null,
  },

  modalContent: {
    type: String,
    default: null,
  },

  close: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <div :class="['backdrop', modalState]" />

  <div :class="['modal', modalState]">
    <div class="title-bar">
      <div class="title">
        <span v-if="modalContent === MODAL_TYPES.ABOUT">
          a lil' about myself
        </span>
        <span v-else> other stuff i worked on lately </span>
      </div>

      <a class="btn" @click="close">
        &times;
        <span>Close</span>
      </a>
    </div>

    <div class="body">
      <span v-if="modalContent === MODAL_TYPES.ABOUT">
        <img :src="kiskisk" alt="little me" class="littleme" />
        <p>
          i like to think that with five years of frontend development
          experience, i'm all about building sleek, efficient, and kick-ass user
          experiences.
        </p>
        <p>
          i specialize in web app development, although i'm currently trying to
          deepen my knowledge in low-level and 3d animations. i'm on a mission
          to blend code and art to create uis that are not just functional, but
          also insanely engaging.<br />
          i guess i've got the skills and the drive to create something that
          turns heads.
        </p>
        <p>
          i believe that the next big leap in frontend development is going to
          be about how we can make the user experience more interactive,
          dynamic, and responsive in real-time. and it's not just about making
          things look 'cool'—it's about utilizing animations to guide user flow,
          provide feedback, and make applications more accessible and intuitive
          to use.
        </p>
      </span>
      <span v-else class="construction">
        <img :src="consbar" alt="under construction" />
        <p>
          i'm still thinking about what to put here. i have a lot in mind,
          <a
            href="https://youtu.be/xNjyG8S4_kI"
            target="_blank"
            rel="noopener noreferrer"
          >
            please be patient.
          </a>
        </p>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/styles/variables";

$default-padding: 10px;

@mixin a11y-visually-hidden {
  position: absolute !important;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  word-wrap: normal;
}

.backdrop {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 100%;

  &.opened {
    display: block;
    animation: backdrop-open 0.2s ease-in-out forwards;
  }

  &.closed {
    animation: backdrop-close 0.3s ease forwards;
  }
}

.modal {
  $shadows: generate-shadows(#000066) + unquote(", 0 0 150px 0 black");
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;

  display: none;
  width: 600px;
  max-width: 80%;
  height: 650px;
  max-height: 80%;
  flex-direction: column;
  border: 7px solid #000;
  background: navy;
  box-shadow: $shadows;
  transform: translate(-50%, -50%);

  &.opened {
    display: flex;
    animation: modal-open 0.2s ease-in-out forwards;
  }

  &.closed {
    animation: modal-close 0.4s ease forwards;
  }

  .title-bar {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $default-padding;
    background: linear-gradient(90deg, navy, #1084d0);
    color: white;
    cursor: default;
    user-select: none;

    .title {
      font-size: 1rem;
      font-weight: 900;
    }
  }

  .body {
    flex-grow: 1;
    padding: $default-padding;
    background: white;
    font-size: 0.95rem;
    line-height: 1.2rem;
    overflow-y: auto;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-align: left;
    }

    // @todo clean this mess up
    .littleme {
      display: block;
      width: 100%;
      max-width: 200px;
      margin: 0 auto 2rem;
    }

    .construction {
      text-align: center;

      img {
        display: block;
        max-width: 100%;
        margin: 1rem auto;
      }
    }
  }

  .btn {
    display: flex;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    margin: 0;
    background: black;
    color: white;
    cursor: pointer;
    font-size: 1.3rem;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }

    span {
      @include a11y-visually-hidden;
    }
  }

  // @todo make use of this
  // .status-bar {
  //   padding: 4px $default-padding;
  //   background: navy;
  //   color: white;
  //   font-size: 0.75rem;
  // }
}

@keyframes modal-open {
  0% {
    display: flex;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes modal-close {
  0% {
    display: flex;
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes backdrop-open {
  0% {
    display: block;
    backdrop-filter: brightness(100%) blur(0);
  }
  100% {
    backdrop-filter: brightness(70%) blur(8px);
  }
}

@keyframes backdrop-close {
  0% {
    display: block;
    backdrop-filter: brightness(70%) blur(8px);
  }
  100% {
    backdrop-filter: brightness(100%) blur(0);
  }
}

::-moz-selection {
  background: #1084d0;
  color: white;
}

::selection {
  background: #1084d0;
  color: white;
}
</style>
