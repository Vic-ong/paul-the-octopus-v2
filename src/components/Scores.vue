<template>
  <div class="flex justify-center">
    <div class="border-2 border-gray-darken rounded-md p-5 flex justify-center space-x-20">
      <div
        v-for="(_, index) in 3"
        :key="data[index].user.name"
        class="text-left space-y-2"
      >
        <div class="text-center text-primary">
          <span v-show="index === 0">⭐️</span>
          {{ formatScore(data[index].score) }}
        </div>
      
        <div class="font-bold">
          {{ data[index].user.name }}
        </div>

        <SkillsetView :data="data[index].user.attrs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Attr } from '@/composables/types';
  import SkillsetView from './SkillsetView.vue';

  export default defineComponent({
    name: 'Scores',
    components: {
      SkillsetView,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const keys = Object.values(Attr);
      const formatScore = (score: number) => `${(score * 100).toFixed(2)}%`;
      
      return {
        keys,
        formatScore,
      };
    },
  });
</script>
