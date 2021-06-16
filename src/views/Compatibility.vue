<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div>
      <div class="fixed z-10 w-full h-20 px-10 flex justify-between items-center bg-dark">
        <router-link :to="{ name: 'new-character' }">
          Reset
        </router-link>

        <div class="text-center heading">
          Compatibility Scores
        </div>

        <router-link :to="{ name: 'data' }">
          See Data
        </router-link>
      </div>

      <div
        v-if="!user.data"
        class="min-h-screen-3/4 flex justify-center items-center text-center"
      >
        <div class="flex flex-col items-center space-y-5 bg-gray-darken rounded-md p-10">
          <div>Please create your character.</div>
          <button @click="router.push({ name: 'new-character' })">
            Create Character
          </button>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center text-center"
      >
        <div
          v-for="(item, index) in items"
          :id="item.key"
          :key="item.key"
          class="h-screen"
        >
          <div class="h-full flex items-center justify-center">
            <div class="flex flex-col items-center">
              <div
                v-if="index === 0"
                class="mb-10"
              >
                Alrighty {{ user.data.name }}, let's check your recommendations based on several scenarios!
              </div>

              <img
                :src="item.img"
                class="h-16 mb-2"
              >
          
              <div class="heading-2 underline">
                {{ index + 1 }}. {{ item.title }}
              </div>

              <div class="mt-5 flex flex-col space-y-2 max-w-4xl">
                <span>Assumptions: {{ item.desc }}</span>
                <span>Model used: {{ item.model }}</span>
              </div>

              <div class="mt-10">
                Recommend pairing with
                <span class="text-primary">
                  {{ scores.data[item.key].user.name }} (Score: {{ formatScore(scores.data[item.key].score) }})
                </span>
              </div>

              <Scores
                class="mt-4"
                :data="scores.data[item.key]"
              />

              <div
                v-if="index !== items.length - 1"
                class="mt-10"
              >
                <div
                  class="p-1 cursor-pointer flex items-center justify-center"
                  @click="scrollIntoNextView(index + 1)"
                >
                  <i class="fi-sr-arrow-small-down text-2xl animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '@/composables/store';
  import { Attr } from '@/composables/types';
  import Scores from '@/components/Scores.vue';
  import tent from '@/assets/tent.png';
  import wizard from '@/assets/wizard.png';
  import intersection from '@/assets/intersection.png';

  export default defineComponent({
    name: 'Compatibility',
    components: {
      Scores,
    },
    setup() {
      const router = useRouter();
      const { user, scores } = useStore();

      const loading = computed(() => user.loading || scores.loading);
      const error = computed(() => user.error || scores.error);

      const items = [
        {
          key: 'similarlevel',
          img: intersection,
          title: 'Finding a partner who\'s on similar skill levels',
          desc: 'The pair should have skillset summed up to be closest to each other. Thus, all skills are considered.',
          model: 'Euclidean Distance',
        },
        {
          key: 'wilderness',
          img: tent,
          title: 'Best chance at surviving in the wilderness',
          desc: 'The group should have the right skillset and that they can learn from or teach each other to improve the group\'s survivability. The key skills taken into considerations for wilderness survival are hunting, engineering, creativity and medicine.',
          model: 'Cosine Similarity',
        },
        {
          key: 'harrypotter',
          img: wizard,
          title: 'Helping Harry Potter to defeat Voldemort',
          desc: 'The group should have a combination of proficiency in magic, creativity, and charismatic skills.',
          model: 'Maximize Sum of Magnitude',
        },
      ];

      const formatScore = (score: number) => `${(score * 100).toFixed(2)}%`;

      const scrollIntoNextView = (index: number) => {
        const el = document.getElementById(items[index].key);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      return {
        loading,
        error,
        Attr,
        items,
        user,
        scores,
        router,
        formatScore,
        scrollIntoNextView,
      };
    },
  });
</script>
