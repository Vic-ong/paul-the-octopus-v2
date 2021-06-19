<template>
  <div class="space-y-5">
    <div class="heading-2 text-left">
      Your skillset
    </div>

    <div>
      <div class="flex justify-center">
        <div class="space-y-2">
          <div
            v-for="item in attributes"
            :key="item.key"
            class="grid grid-cols-7"
          >
            <div class="col-span-3 text-left">
              {{ item.name }}:
            </div>
            <div class="col-span-2 text-primary">
              {{ input.attrs[item.key] }}
            </div>
            <div class="col-span-2 flex space-x-1">
              <div
                class="h-6 w-6 rounded-full flex justify-center items-center bg-gray-darken cursor-pointer"
                @click="addPoint(item.key)"
              >
                <IconArrowUp class="h-4 w-4 fill-current text-dark" />
              </div>
              <div
                class="h-6 w-6 rounded-full flex justify-center items-center bg-gray-darken cursor-pointer"
                @click="minusPoint(item.key)"
              >
                <IconArrowDown class="h-4 w-4 fill-current text-dark" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-2 text-gray-darken text-sm text-left">
        Points available: {{ points.data }}
      </div>
    </div>

    <div>
      <button
        class="bg-gray-darken"
        @click="submitHandler"
      >
        Recalculate scores
      </button>
      <div
        v-if="error"
        class="mt-2 text-sm text-error"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, reactive } from 'vue';
  import { useStore } from '@/composables/store';
  import { Attr } from '@/composables/types';
  import IconArrowUp from '@/components/Icons/IconArrowUp.vue';
  import IconArrowDown from '@/components/Icons/IconArrowDown.vue';

  export default defineComponent({
    name: 'UserPanel',
    components: {
      IconArrowUp,
      IconArrowDown,
    },
    setup() {
      const { points, user, setPoints, createUser } = useStore();

      const error = ref('');
      const input = reactive({
        name: '',
        attrs: {
          [Attr.Hunt]: 0,
          [Attr.Eng]: 0,
          [Attr.Cre]: 0,
          [Attr.Med]: 0,
          [Attr.Magic]: 0,
          [Attr.Charm]: 0,
        },
      });

      onMounted(() => {
        if (user.data) {
          input.name = user.data.name;
          input.attrs = user.data.attrs;
        }
      });

      const attributes = [
        {
          key: Attr.Hunt,
          name: 'Hunting',
        },
        {
          key: Attr.Eng,
          name: 'Engineering',
        },
        {
          key: Attr.Cre,
          name: 'Creativity',
        },
        {
          key: Attr.Med,
          name: 'Medicine',
        },
        {
          key: Attr.Magic,
          name: 'Magic',
        },
        {
          key: Attr.Charm,
          name: 'Charismatic',
        },
      ];

      const addPoint = (key: Attr) => {
        if (input.attrs[key] < 5 && points.data > 0) {
          input.attrs[key] += 1;
          setPoints(points.data - 1);
        }
      };

      const minusPoint = (key: Attr) => {
        if (input.attrs[key] > 0 && points.data < 15) {
          input.attrs[key] -= 1;
          setPoints(points.data + 1);
        }
      };

      const submitHandler = () => {
        error.value = '';
        if (points.data !== 0) {
          error.value = `${points.data} skill point(s) remaining.`;
        } else {
          createUser(input);
        }
      };

      return {
        Attr,
        error,
        user,
        input,
        points,
        attributes,
        addPoint,
        minusPoint,
        submitHandler,
      };
    },
  });
</script>
