<template>
  <div
    v-if="view.mdAndAbove"
    class="w-full h-20 px-10 flex justify-between items-center bg-dark"
    :class="fixed ? 'fixed z-10' : ''"
  >
    <slot name="left" />

    <div class="text-center heading">
      <slot />
    </div>

    <slot name="right" />
  </div>
  <div v-else>
    <div
      class="h-16 flex justify-center items-center heading"
      :class="fixed ? 'fixed z-10 w-full bg-dark' : ''"
    >
      <slot />
    </div>
    <div class="absolute bottom-0 left-0 z-50 h-14 w-screen flex justify-around items-center bg-gray-darken">
      <slot name="left" />
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useBreakpoints } from '@/composables/breakpoints';

  export default defineComponent({
    name: 'Header',
    props: {
      fixed: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const view  = useBreakpoints();

      return {
        view,
      };
    },
  });
</script>
