<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <div class="flex flex-col justify-center items-center text-center space-y-24">
        <div>
          <div class="relative font-heading font-bold text-6xl text-primary">
            Paul the Octopus
            <div class="absolute -top-3 left-1">
              <img
                :src="logo"
                class="h-7 animate-logo"
              >
            </div>
          </div>

          <div class="mt-7">
            Calculates your character compatibility
          </div>
        </div>

        <div>
          <button
            class="font-bold"
            @click="router.push({ name: 'new-character' })"
          >
            GET STARTED
          </button>
        </div>

        <div>
          <div>About this project</div>
          <div
            class="p-1 cursor-pointer flex items-center justify-center"
            @click="scrollIntoNextView"
          >
            <i class="fi-sr-arrow-small-down text-2xl animate-bounce" />
          </div>
        </div>
      </div>
    </div>

    <div
      id="about"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="flex flex-col items-center space-y-12">
        <div class="max-w-3xl space-y-3">
          <div class="heading text-center">
            About
          </div>
          <div class="text-left">
            This project is inspired by a project I worked on at Hawaii to research team-forming models based on individuals' skillset and personal goals.
            Here, I wanted to experiment with similarity computations to explore its utilizations in game development.
          </div>
        </div>

        <div class="max-w-3xl space-y-3">
          <div class="heading text-center">
            Score Calculations
          </div>
          <div class="text-left">
            <div>
              (1) I compute the
              <a
                href="https://www.cut-the-knot.org/pythagoras/DistanceFormula.shtml"
                target="_blank"
              >
                Euclidean distance (L2-norm distance)
              </a>
              to find nearby vectors adjacent to the target.
            </div>
            <div>
              (2) I compute
              <a
                href="https://www.geeksforgeeks.org/cosine-similarity/"
                target="_blank"
              >
                cosine similarity
              </a>
              to find vector similarities in the same general direction from the origin.
            </div>
          </div>
        </div>

        <div class="max-w-3xl space-y-3">
          <div class="heading text-center">
            Fun Fact
          </div>
          <div class="text-left">
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

        <hr class="border border-light w-60">

        <div class="flex justify-center items-center space-x-14">
          <a
            v-for="icon in icons"
            :key="icon.link"
            :href="icon.link"
            class="flex flex-col justify-center items-center w-12 h-12 bg-light rounded-full p-3 transition duration-500 ease-in-out transform hover:scale-125"
          >
            <component :is="icon.component" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import logo from '@/assets/logo.png';
  import IconGithub from '@/components/Icons/IconGithub.vue';
  import IconLinkedIn from '@/components/Icons/IconLinkedIn.vue';
  import IconInstagram from '@/components/Icons/IconInstagram.vue';

  export default defineComponent({
    name: 'Home',
    setup() {
      const router = useRouter();

      const icons = [
        {
          component: IconGithub,
          link: 'https://github.com/Vic-ong/paul-the-octopus-v2',
        },
        {
          component: IconLinkedIn,
          link: 'https://www.linkedin.com/in/vickong/',
        },
        {
          component: IconInstagram,
          link: 'https://www.instagram.com/vic_ong/',
        },
      ];

      const scrollIntoNextView = () => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };

      return {
        router,
        logo,
        icons,
        scrollIntoNextView,
      };
    },
  });
</script>

<style scoped>
@keyframes rotate-logo {
  from {
    transform: rotate(3deg);
  }
  to {
    transform: rotate(20deg);
  }
}
.animate-logo {
  animation: rotate-logo 0.8s cubic-bezier(0.8, 0, 1, 1) infinite alternate;
}
</style>
