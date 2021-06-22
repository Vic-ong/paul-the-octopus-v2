<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div>
      <Header fixed>
        Data
        <template #left>
          <router-link :to="{ name: 'home' }">
            Home
          </router-link>
        </template>
        <template #right>
          <router-link :to="{ name: 'compatibility' }">
            See Scores
          </router-link>
        </template>
      </Header>

      <div class="px-5 py-24 flex justify-center items-center">
        <div class="grid grid-cols-2 md:grid-cols-3 lg-above:grid-cols-4 gap-4 md-above:gap-12">
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
  import Header from '@/components/Header.vue';
  import SkillsetView from '@/components/SkillsetView.vue';

  export default defineComponent({
    name: 'DataView',
    components: {
      Header,
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
