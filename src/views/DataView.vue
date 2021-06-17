<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div>
      <div class="w-full h-20 px-10 flex justify-between items-center bg-dark">
        <router-link :to="{ name: 'home' }">
          Home
        </router-link>

        <div class="text-center heading">
          Data
        </div>

        <router-link :to="{ name: 'compatibility' }">
          See Scores
        </router-link>
      </div>

      <div class="py-10 flex justify-center items-center">
        <div class="grid grid-cols-4 gap-12">
          <div
            v-if="user.data"
            class="bg-gray-darken p-5"
          >
            <div class="mb-2">
              {{ user.data.name }}
            </div>
            <SkillsetView :data="user.data.attrs" />
          </div>
          <div
            v-for="item in users.data"
            :key="item.name"
            class="bg-gray-darken p-5"
          >
            <div class="mb-2">
              {{ item.name }}
            </div>
            <SkillsetView :data="item.attrs" />
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from '@/composables/store';
  import SkillsetView from '@/components/SkillsetView.vue';

  export default defineComponent({
    name: 'DataView',
    components: {
      SkillsetView,
    },
    setup() {
      const { user, users } = useStore();

      const loading = computed(() => user.loading || users.loading);
      const error = computed(() => user.error || users.error);

      return {
        loading,
        error,
        user,
        users,
      };
    },
  });
</script>
