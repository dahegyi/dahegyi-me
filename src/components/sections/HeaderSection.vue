<script setup>
const handleScroll = (target) => {
  const targetElement = document.getElementById(target);

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="header">
    <div class="logo">
      <h1 data-content="daniel hegyi">daniel hegyi</h1>
    </div>
    <h2>* professional front-end developer</h2>
    <div class="menu">
      <ul>
        <li @click="() => handleScroll('about')">about</li>
        <li @click="() => handleScroll('portfolio')">portfolio</li>
        <li @click="() => handleScroll('contact')">contact</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/styles/variables";

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 200% 0%;
  }
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3rem;
  user-select: none;

  .logo {
    display: flex;
    justify-content: center;
    margin: 3rem 0 -2rem;
    transform: scaleY(1.65);
    transform-origin: bottom;

    h1 {
      animation: gradient 12s linear infinite;
      background: linear-gradient(
        to left,
        #a104ad,
        #0b2be0,
        #329941,
        #f7f658,
        #f16412,
        #e92153,
        #aa04a7
      );
      -webkit-background-clip: text;
      background-clip: text;

      background-size: 200% auto;
      color: transparent;
      font-size: calc(2.2rem + 1vw);
      font-weight: 900;
      letter-spacing: 0.15rem;

      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 0.016em #eaeaea;

      &::before {
        position: absolute;
        z-index: -1;
        box-sizing: border-box;
        color: #cdcdcd;
        content: attr(data-content);
        -webkit-text-fill-color: #cdcdcd;
        -webkit-text-stroke: transparent;
        transform: rotateX(63deg) skew(60deg) scaleY(0.65)
          translate3d(2em, -2.15em, -1em);
      }
    }
  }

  h2 {
    color: #666;
    font-size: calc(1rem + 1vw);
    font-style: italic;
  }

  .menu {
    margin-top: 1rem;

    ul {
      justify-content: center;
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        padding: 0.4rem 1rem;
        border-width: 0 0 4px;
        border-style: solid;
        border-color: black;
        margin: 6px 0;
        background: yellow;
        color: black;
        cursor: pointer;
        font-family: "Pixelated MS Sans Serif", Arial, sans-serif;
        font-size: calc(0.9rem + 1vw);
        font-weight: bold;
        letter-spacing: 0.15rem;

        &:hover,
        &:focus {
          background: linear-gradient(to left, yellow, black);
          color: yellow;
        }
      }
    }
  }

  @include media-breakpoint-up(sm) {
    .logo {
      margin: 4rem 0 -5rem;

      h1 {
        font-size: 3.5rem;
      }
    }

    h2 {
      font-size: 1.8rem;
    }

    .menu {
      ul {
        $border-width: 2px;

        display: flex;
        border-width: 0 $border-width;

        background: repeating-linear-gradient(
          -45deg,
          yellow,
          yellow 15px,
          black 15px,
          black 30px
        );

        li {
          border-width: 0 $border-width;
          margin: 0;
          font-size: 1.5rem;
          line-height: 1.5rem;

          &:nth-child(1) {
            border-left-width: calc($border-width * 2);
          }

          &:nth-last-child(1) {
            border-right-width: calc($border-width * 2);
          }

          &:hover,
          &:focus {
            background: black;
            box-shadow: 0 0 0 4px yellow;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .logo {
      margin: 5rem 0 -6rem;

      h1 {
        font-size: 4rem;
      }
    }

    h2 {
      font-size: 2rem;
    }
  }
}
</style>
