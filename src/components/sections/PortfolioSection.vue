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
        const isInView =
          entry.boundingClientRect.top + window.innerHeight / 2 <=
            window.innerHeight &&
          entry.boundingClientRect.bottom >= window.innerHeight - 100;

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

  // card container height
  const cardContainer = target.querySelector(".card-container");

  cardContainer.style.height = `${PORTFOLIO_ITEMS.length * 200}px`;
  cardContainer.parentElement.style.height = `${
    PORTFOLIO_ITEMS.length * PORTFOLIO_ITEMS.length * 250
  }px`;

  // card container vertical centering
  const cards = cardContainer.querySelectorAll(".card");
  const cardHeight = cards[0].offsetHeight;

  cardContainer.style.top = `${window.innerHeight / 2 - cardHeight}px`;

  // behaviour of cards on scroll
  const rotationStep = 8;

  cards.forEach((card, index) => {
    gsap.set(card, {
      rotation: index * rotationStep,
    });
  });

  const cardAnimation = (currentPhase = 0) => {
    const rotationStep = 15;

    cards.forEach((card, index) => {
      const rotation = index * rotationStep - currentPhase * rotationStep;
      const xBase = cardContainer.offsetWidth / 2 - card.offsetWidth / 2;

      // stop animating if the last card is reached
      if (currentPhase >= PORTFOLIO_ITEMS.length) {
        return;
      }

      const isCurrentPhase = index === currentPhase;
      const positionRelativeToCurrentPhase = Math.abs(index - currentPhase);

      gsap.set(card, {
        opacity: isCurrentPhase ? 1 : 0,
        pointerEvents: isCurrentPhase ? "auto" : "none",
        rotation: rotation,
        x: xBase + rotation * 50,
        y: positionRelativeToCurrentPhase * 100,
        zIndex: PORTFOLIO_ITEMS.length - positionRelativeToCurrentPhase,
        filter: `blur(${positionRelativeToCurrentPhase * 5}px)`,
      });
    });
  };

  // initial animation
  cardAnimation();

  ScrollTrigger.create({
    trigger: cardContainer,
    scroller: ".main",
    scrub: true,
    pin: true,
    pinType: "fixed",
    pinSpacing: true,
    start: "top 10%",
    end: "bottom -10%",
    onUpdate: (self) => {
      const totalPhases = Math.ceil(1 / (1 / cards.length));
      const currentPhase = Math.floor(self.progress * totalPhases);

      cardAnimation(currentPhase);
    },
  });
  // };

  // resizeEvent();

  // addEventListener("resize", () => {
  //   resizeEvent();
  // });
});
</script>

<template>
  <div id="portfolio" class="mt-4 pt-2 pb-4">
    <h3 class="my-5">stuff i do on the web</h3>

    <div class="card-container">
      <div
        v-for="(card, index) in PORTFOLIO_ITEMS"
        :id="`card${index + 1}`"
        :key="index"
        class="card my-5"
      >
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#portfolio {
  position: relative;
  overflow: hidden;
  // @todo change the background to some funky ass animated thing
  background: linear-gradient(to bottom, #d85897, #b43775);
  color: white;
  // @todo better scrolling experience
  pointer-events: none;
}

h3 {
  position: relative;
  z-index: 10;
  color: cyan;
  font-size: calc(1.5rem + 1vw);
  text-shadow:
    cyan 0 0 10px,
    cyan 0 0 25px;

  @include media-breakpoint-up(md) {
    font-size: 1.7rem;
  }
}

.card-container {
  .card {
    position: absolute;
    z-index: 1;
    width: 500px;
    max-width: 90%;
    height: 280px;
    box-shadow: 0 30px 400px 100px #700c3e;
    pointer-events: auto;
    text-align: center;
    transition:
      transform 0.35s ease-out,
      opacity 0.4s ease-out;
    user-select: none;

    video {
      position: relative;
      width: 100%;
      height: 100%;
      filter: saturate(0.7) brightness(0.4);
      object-fit: cover;
      transition: filter 0.25s ease-in-out;
    }

    .content {
      position: absolute;
      top: 0;
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
