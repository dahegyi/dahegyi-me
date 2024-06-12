import hydraVideo from "~/assets/videos/hydra-plus.mp4";
import szabadVideo from "~/assets/videos/szabad.mp4";
// import bogiVideo from "~/assets/videos/bogi.mp4";
import otherVideo from "~/assets/videos/other.mp4";

export const ACTIONS = {
  OPEN_MODAL: "openModal",
  OPEN_GITHUB: "openGithub",
  OPEN_WEBSITE: "openWebsite",
};

export const MODAL_TYPES = {
  ABOUT: "about",
  OTHER: "other",
};

export const PORTFOLIO_ITEMS = [
  {
    key: MODAL_TYPES.HP,
    title: "hydra+",
    description:
      "a visual editing environment for hydra synth with some nice extras and even more on the way",
    video: hydraVideo,
    actions: [ACTIONS.OPEN_GITHUB, ACTIONS.OPEN_WEBSITE],
    github: "https://github.com/dahegyi/hydra-plus",
    website: "https://hydra-plus.web.app/",
  },
  {
    key: MODAL_TYPES.SZABAD,
    title: "szabad bisztró website",
    description: "my favourite vegan bistro in bp <3<3",
    video: szabadVideo,
    actions: [ACTIONS.OPEN_GITHUB, ACTIONS.OPEN_WEBSITE],
    github: "https://github.com/dahegyi/szabadbisztro",
    website: "https://szabadbisztro.hu/",
  },
  {
    key: MODAL_TYPES.MARTON,
    title: "marton selley portfolio",
    description: "it ain't much, but it's honest work",
    video: "https://i.imgur.com/wpBc7Xi.mp4",
    actions: [/* ACTIONS.OPEN_GITHUB, */ ACTIONS.OPEN_WEBSITE],
    github: "https://github.com/dahegyi/martonselley",
    website: "https://martonselley.com/",
  },
  // {
  //   key: MODAL_TYPES.BOGI,
  //   title: "bogi sélley portfolio",
  //   description: "windows 98 style portfolio website with minesweeper",
  //   video: bogiVideo,
  //   actions: [ACTIONS.OPEN_WEBSITE],
  //   website: "https://bogiselley.me/",
  // },
  {
    key: MODAL_TYPES.OTHER,
    title: "other stuff",
    description:
      "other stuff i've worked on recently and might be worth mentioning",
    video: otherVideo,
    actions: [ACTIONS.OPEN_MODAL],
  },
];
