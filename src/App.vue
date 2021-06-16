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

export default defineComponent({
  name: 'App',
});
</script>
