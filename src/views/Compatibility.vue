<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div id="compatibility">
      <div class="fixed z-10 w-full h-20 px-10 flex justify-between items-center bg-dark">
        <router-link :to="{ name: 'home' }">
          Home
        </router-link>

        <div class="text-center heading">
          Compatibility Analysis
        </div>

        <router-link :to="{ name: 'data' }">
          See Data
        </router-link>
      </div>

      <div class="min-h-screen flex justify-center items-center text-center">
        <div class="max-w-3xl space-y-10">
          <div class="heading-2">
            Welcome, {{ user.data.name }}!
          </div>

          <div class="text-left">
            We're happy to have you joining this group of wonderful people with diversed skillset! 🎉 Now, let's see who you could team up with within
            <router-link :to="{ name: 'data' }">
              this list of users
            </router-link>
            to boost your chances of winning in various situations while leaving room for others to find success too.
          </div>

          <div>
            See compatibility analysis
            <div
              class="p-1 cursor-pointer flex items-center justify-center"
              @click="scrollIntoNextView(0)"
            >
              <IconArrowDown class="h-6 w-6 animate-bounce fill-current text-light" />
            </div>
          </div>
        </div>
      </div>

      <div class="relative flex flex-col items-center text-center">
        <div class="sticky top-40 mr-auto ml-10">
          <UserPanel />
        </div>

        <div
          v-for="(item, index) in items"
          :id="item.key"
          :key="item.key"
          class="h-screen"
        >
          <div class="min-h-full flex items-center justify-center">
            <div class="flex flex-col items-center">
              <img
                :src="item.img"
                class="h-16 mb-2"
              >
          
              <div class="heading-2 underline">
                {{ index + 1 }}. {{ item.title }}
              </div>

              <div class="mt-5 max-w-3xl space-y-2">
                <div class="text-left">
                  {{ item.desc }}
                </div>
              </div>

              <div class="mt-10">
                Recommend pairing:
                <span class="text-primary">
                  {{ scores.data[item.key][0].user.name }}
                </span>
              </div>

              <Scores
                class="mt-5"
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
                  <IconArrowDown class="h-6 w-6 animate-bounce fill-current text-light" />
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
  import IconArrowDown from '@/components/Icons/IconArrowDown.vue';
  import Scores from '@/components/Scores.vue';
  import UserPanel from '@/components/UserPanel.vue';
  import tent from '@/assets/tent.png';
  import wizard from '@/assets/wizard.png';
  import intersection from '@/assets/intersection.png';

  export default defineComponent({
    name: 'Compatibility',
    components: {
      IconArrowDown,
      Scores,
      UserPanel,
    },
    setup() {
      const router = useRouter();
      const { user, scores, generateScores } = useStore();

      if (!user.data) {
        router.push({ name: 'new-character' });
      }
      if (!scores.data) {
        generateScores();
      }

      const loading = computed(() => !user.data || user.loading || scores.loading);
      const error = computed(() => user.error || scores.error);

      const items = [
        {
          key: 'similarlevel',
          img: intersection,
          title: 'Finding partner(s) who has similar skill levels',
          desc: 'The pair should have an overall similar skill levels. For instance, John is only good at A and B and Jane is only good at C and D. In this case, they\'re considered similar.',
        },
        {
          key: 'wilderness',
          img: tent,
          title: 'Best chance at surviving in the wilderness',
          desc: 'The group should have the right skill set that they can learn from or teach each other to improve the group\'s survivability. The key skills taken into considerations for wilderness survival are hunting, engineering, creativity and medicine.',
        },
        {
          key: 'harrypotter',
          img: wizard,
          title: 'Helping Harry Potter to defeat Voldemort',
          desc: 'The group should be proficient in magic, creativity, and medicine skills to properly assist Harry as he embarks on this challenging mission.',
        },
      ];

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
        scroll,
        router,
        scrollIntoNextView,
      };
    },
  });
</script>
