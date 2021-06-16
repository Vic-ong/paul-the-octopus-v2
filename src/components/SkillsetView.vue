<template>
  <div class="grid grid-flow-row">
    <div
      v-for="key in keys"
      :key="key"
    >
      <div class="flex justify-between">
        <div>{{ key }}:</div>
        <div class="ml-2 text-primary">
          {{ data[key] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Attr } from '@/composables/types';

  export default defineComponent({
    name: 'Scores',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const keys = Object.values(Attr);
      
      return {
        keys,
      };
    },
  });
</script>
