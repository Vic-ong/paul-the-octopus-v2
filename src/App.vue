<template>
  <div class="h-screen w-full overflow-y-auto bg-dark">
    <router-view v-slot="{ Component }">
      <transition
        name="transition-fade"
        mode="out-in"
      >
        <component
          :is="Component"
          class="h-full w-full"
        />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { initBreakpoints } from './composables/breakpoints';

export default defineComponent({
  name: 'App',
  setup() {
    initBreakpoints();
  },
});
</script>

<style scoped>
  /* Fade transition */
  .transition-fade-enter-active, .transition-fade-leave-active {
    transition: opacity .3s ease;
  }
  .transition-fade-enter, .transition-fade-leave-to {
    opacity: 0;
  }

  /* Bounce transition */
  .transition-bounce-enter-active {
    animation: bounce-in .35s;
  }
  .transition-bounce-leave-active {
    animation: bounce-in .2s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
