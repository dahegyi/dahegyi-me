<script setup>
import { onMounted } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ACTIONS, PORTFOLIO_ITEMS } from "~/constants";

defineProps({
  openModal: {
    type: Function,
    default: () => {},
  },
});

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // const resizeEvent = () => {
  const target = document.getElementById("portfolio");
  const parent = target.parentElement;

  const parentWidth = parent.clientWidth;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const isInView = entry.boundingClientRect.top <= window.innerHeight / 2;

        if (isInView) {
          gsap.to(target, {
            width: window.innerWidth,
            paddingLeft: (window.innerWidth - parentWidth) / 2,
            paddingRight: (window.innerWidth - parentWidth) / 2,
            left: -(window.innerWidth - parentWidth) / 2,
            duration: 1,
            ease: "power2.out",
          });
        } else {
          gsap.to(target, {
            width: `${parentWidth}px`,
            paddingLeft: 0,
            paddingRight: 0,
            left: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      });
    },
    {
      threshold: new Array(101).fill(0).map((_, i) => i / 100),
    },
  );

  observer.observe(target);
});
</script>

<template>
  <div id="portfolio" class="mt-4 pt-2 pb-4">
    <h3 class="my-5">stuff i do on the web</h3>

    <div class="card-container">
      <swiper
        :modules="[Navigation]"
        :slides-per-view="1"
        :navigation="true"
        :loop="true"
      >
        <swiper-slide v-for="(card, index) in PORTFOLIO_ITEMS" :key="index">
          <div :id="`card${index + 1}`" class="card my-5">
            <video autoplay muted loop playsinline>
              <source :src="card.video" type="video/mp4" />
            </video>

            <div class="content">
              <h4 class="title">{{ card.title }}</h4>

              <div class="description">
                <p>{{ card.description }}</p>

                <button
                  v-if="card.actions.includes(ACTIONS.OPEN_MODAL)"
                  @click="() => openModal(card.key)"
                >
                  read more...
                </button>

                <a
                  v-if="card.actions.includes(ACTIONS.OPEN_GITHUB)"
                  class="button"
                  :href="card.github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open github
                </a>

                <a
                  v-if="card.actions.includes(ACTIONS.OPEN_WEBSITE)"
                  class="button"
                  :href="card.website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open project
                </a>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style>
:root {
  --swiper-navigation-size: 33px;
  --swiper-navigation-color: cyan;
  --swiper-theme-color: cyan;
  --swiper-navigation-sides-offset: 20px;
}
</style>

<style scoped lang="scss">
#portfolio {
  position: relative;
  backdrop-filter: invert(1);
  color: white;
}

h3 {
  color: cyan;
  font-size: calc(1.5rem + 1vw);
  text-shadow:
    cyan 0 0 10px,
    cyan 0 0 25px;

  @include media-breakpoint-up(md) {
    font-size: 1.7rem;
  }
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.card-container {
  .card {
    width: 500px;
    height: 280px;
    box-shadow: 0 30px 400px 100px #700c3e;
    text-align: center;
    transition:
      transform 0.35s ease-out,
      opacity 0.4s ease-out;
    user-select: none;

    video {
      width: 100%;
      height: 100%;
      filter: saturate(0.7) brightness(0.8);
      object-fit: cover;
      transition: filter 0.25s ease-in-out;
    }

    .content {
      position: relative;
      top: -140px;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        position: absolute;
        font-size: 1.35rem;
        font-weight: 700;
        text-shadow: 0 3px 0 black;
        transition: opacity 0.2s ease-in-out;
      }

      .description {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4rem;
        font-size: 1rem;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;

        button,
        .button {
          padding: 8px 30px;
          margin-top: 0.8rem;
        }
      }
    }

    &:hover,
    &:focus {
      video {
        filter: saturate(0.5) brightness(0.2);
      }
      .title {
        opacity: 0;
      }
      .description {
        opacity: 1;
      }
    }
  }
}
</style>
