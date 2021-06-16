<template>
  <div class="h-3/4 flex items-center justify-center">
    <div class="flex flex-col items-center text-center">
      <div class="relative heading text-primary">
        Paul the Octopus
        <div class="absolute -top-5 left-5">
          <img
            :src="logo"
            class="h-7 animate-logo"
          >
        </div>
      </div>

      <div class="mt-3">
        Calculates your character compatibility
      </div>

      <div class="mt-8">
        <button @click="router.push({ name: 'new-character' })">
          Get Started
        </button>
      </div>

      <hr class="border w-10 my-16">

      <div class="max-w-5xl">
        <div class="underline">
          About
        </div>
        This project is inspired by a project I worked on at Hawaii to research team-forming models based on individuals' skillset and personal goals.
        Here, I made a simplified version of it to explore utilizations in game development. The source code can be found
        <a
          href="https://github.com/Vic-ong/paul-the-octopus-v2"
          target="_blank"
        >
          here
        </a>.
      </div>

      <div class="mt-5 max-w-5xl">
        <div class="underline">
          Fun Fact
        </div>
        The name "Paul The Octopus" is a tribute to an
        <a
          href="https://en.wikipedia.org/wiki/Paul_the_Octopus"
          target="_blank"
        >
          actual octopus.
        </a>
        In the football/soccer domain, Paul has correctly predicted the winning teams in 12 out of 14 matches (85.7% accuracy)!
        That's right folks, Paul may have been a brilliant analyst in disguise!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import logo from '@/assets/logo.png';

  export default defineComponent({
    name: 'Home',
    setup() {
      const router = useRouter();

      return {
        router,
        logo,
      };
    },
  });
</script>

<style scoped>
@keyframes rotate-logo {
  from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(12deg);
  }
}
.animate-logo {
  animation: rotate-logo 0.8s cubic-bezier(0.8, 0, 1, 1) infinite alternate;
}
</style>
