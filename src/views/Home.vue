<template>
  <div>
    <div class="min-h-screen flex items-center justify-center">
      <div class="flex flex-col justify-center items-center text-center space-y-24">
        <div>
          <div class="flex justify-center">
            <StickerOctopus
              class="h-32 w-32 animate-logo"
              interactive
            />
          </div>
          <div class="font-heading font-bold text-5xl text-light">
            Paul the Octopus
          </div>

          <div class="mt-3 text-gray-darken">
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
            <IconArrowDown class="h-6 w-6 animate-bounce fill-current text-light" />
          </div>
        </div>
      </div>
    </div>

    <div
      id="about"
      class="min-h-screen flex items-center justify-center"
    >
      <div class="flex flex-col items-center space-y-12 sm-below:px-5 md:px-10">
        <div class="lg-above:max-w-3xl space-y-3">
          <div class="heading text-center">
            About
          </div>
          <div>
            This app calculates your virtual character's compatibility with the others and recommends the top 3 team pairings so that your probability of completing a particular mission is favorable. The compatibility scoring is computed by determining the similarities between 2 characters. In this project, I wanted to explore how
            <a
              href="https://en.wikipedia.org/wiki/Lp_space#Statistics"
              target="_blank"
            >
              Lp space
            </a>
            and
            <a
              href="https://en.wikipedia.org/wiki/Cosine_similarity"
              target="_blank"
            >
              cosine similarity
            </a>
            can be applied in game developments.
          </div>
        </div>

        <div class="lg-above:max-w-3xl space-y-3">
          <div class="heading text-center">
            Fun Fact
          </div>
          <div class="text-left">
            The name "Paul The Octopus" is a tribute to a
            <a
              href="https://en.wikipedia.org/wiki/Paul_the_Octopus"
              target="_blank"
            >
              real-life celebrity octopus
            </a>
            who has correctly predicted 4 out of 6 outcomes of UEFA Euro 2008 and all of the outcomes of FIFA World Cup 2010!
            That's right folks, Paul may have been a brilliant analyst!
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
  import IconArrowDown from '@/components/Icons/IconArrowDown.vue';
  import IconGithub from '@/components/Icons/IconGithub.vue';
  import IconLinkedIn from '@/components/Icons/IconLinkedIn.vue';
  import IconInstagram from '@/components/Icons/IconInstagram.vue';
  import StickerOctopus from '@/components/Logo/StickerOctopus.vue';

  export default defineComponent({
    name: 'Home',
    components: {
      IconArrowDown,
      StickerOctopus,
    },
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
    transform: rotate(-5deg) translateY(-15px);
  }
  to {
    transform: rotate(5deg) translateY(0);;
  }
}
.animate-logo {
  animation: rotate-logo 1s cubic-bezier(0.8, 0.3, 1, 1.2) infinite alternate;
}
</style>
