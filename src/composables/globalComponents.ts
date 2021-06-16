/* eslint-disable vue/component-definition-name-casing */
import { App } from 'vue';
import PageContainer from '@/components/PageContainer.vue';

export const registerComponents = (app: App): void => {
  app.component('PageContainer', PageContainer);
};
