<script setup>
import { computed, ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

const error = ref(false);

const messageCloseToMax = computed(() => message.value.length >= 400);

// good enough here, formspree does the rest
const emailRegex = RegExp(/^\S+@\S+\.\S+$/);

const submit = () => {
  if (!name.value || !email.value || !message.value) {
    error.value = "yo, fill out all fields";
    return;
  } else if (emailRegex.test(email.value) === false) {
    error.value = "please enter a valid email address";
    return;
  } else if (message.value.length < 20) {
    error.value =
      "i guess you can write a little more than that (min 20 chars)";
    return;
  } else if (message.value.length > 500) {
    error.value = "that's a little too much, don't you think? (max 500 chars)";
    return;
  }

  const form = document.getElementById("contact-form");
  form.submit();
};
</script>

<template>
  <div id="contact">
    <h3>
      <span>❤️ send me a love letter ❤️</span>
    </h3>
    <form
      id="contact-form"
      action="https://formspree.io/f/xyyqooea"
      method="POST"
    >
      <div class="row">
        <div class="col-6">
          <input v-model="name" type="text" name="name" placeholder="name" />
        </div>
        <div class="col-6">
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="email address"
          />
        </div>

        <div class="col-12">
          <label v-if="messageCloseToMax" for="message">
            {{ message.length }}/500
          </label>
          <textarea
            v-model="message"
            name="message"
            placeholder="message"
            rows="6"
          />
        </div>
      </div>
    </form>

    <div v-if="error" class="error mt-2 mb-3">☠️ {{ error }} ☠️</div>

    <button @click="submit">send</button>
  </div>

  <a
    href="https://github.com/dahegyi"
    target="_blank"
    rel="noopener noreferrer"
  >
    &raquo; my github here clicky clicky &laquo;
  </a>
</template>

<style scoped lang="scss">
#contact {
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    padding: 4px 2px;
    background: black;
    color: red;
  }

  form {
    display: flex;
    width: 100%;
    max-width: 550px;
    flex-direction: column;
    align-items: center;

    .row {
      width: 100%;
    }

    input,
    textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 8px;
      border: 1px solid red;
      border-radius: 0;
      margin: 8px 0;
      box-shadow: 0 0 0 red;
      color: black;
      font-family: inherit;
      font-size: 12px;
      line-height: 1.2rem;
      transition: box-shadow 0.2s ease-in-out;

      &:hover {
        box-shadow: 0 1px 6px -1px hotpink;
      }

      &:focus {
        box-shadow: 0 2px 10px -2px red;
        outline: none;
      }
    }

    label {
      font-size: 12px;
    }

    textarea {
      min-height: 150px;
      max-height: 400px;
      resize: vertical;
    }

    input::placeholder,
    textarea::placeholder,
    button {
      padding-left: 2px;
      margin-bottom: 2rem;
      letter-spacing: 2px;
    }
  }
}

.error {
  padding: 0.1rem 0.5rem;
  background: red;
  box-shadow: 0 1px 3px black;
  color: black;
  font-weight: bold;
}

button {
  padding: 8px 34px;
  margin-bottom: 2rem;
  font-weight: bold;
}

a {
  color: blue;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;

  &:hover {
    color: darkblue;
  }
}

::-moz-selection {
  background: red;
  color: black;
}

::selection {
  background: red;
  color: black;
}
</style>
