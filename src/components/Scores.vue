<template>
  <div class="flex justify-center">
    <div class="border-2 border-gray-darken rounded-md p-5 flex justify-center space-x-20">
      <div
        v-for="item in items"
        :key="item.title"
        class="text-left"
      >
        <div class="mb-2">
          {{ item.title }}
        </div>
        <SkillsetView :data="item.data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from '@/composables/store';
  import { Attr } from '@/composables/types';
  import { CompatibilityObject } from '@/composables/compatibility';
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
    setup(props) {
      const { user } = useStore();
      const keys = Object.values(Attr);
      const score = props.data as CompatibilityObject;

      const items = [
        {
          title: 'Group avg.',
          data: score.avgAttrs,
        },
        {
          title: 'Your skills',
          data: user.data.attrs,
        },
        {
          title: 'Partner\'s skills',
          data: score.user.attrs,
        },
      ];
      
      return {
        keys,
        items,
      };
    },
  });
</script>
