<template>
  <div class="space-y-10 text-center">
    <div class="w-full h-20 px-10 flex justify-between items-center bg-dark">
      <router-link :to="{ name: 'home' }">
        Home
      </router-link>

      <div class="text-center heading">
        Create your character!
      </div>

      <router-link :to="{ name: 'data' }">
        See Data
      </router-link>
    </div>

    <div class="flex flex-col items-center space-y-14">
      <div>
        <div class="heading-2 mb-1">
          Name
        </div>
        <div class="flex">
          <input
            v-model="input.name"
            type="text"
          >
          <button
            class="ml-3"
            @click="generateName"
          >
            Generate Name
          </button>
        </div>
      </div>

      <div>
        <div class="heading-2">
          Distribute
          <span class="text-primary">{{ points.data }}</span>
          points to the skills of your choice.
        </div>
        <div class="mb-5 text-sm italic">
          Each skill proficiency ranges from 0 to 5 (5 being the most proficient)
        </div>

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
      </div>
    </div>

    <div>
      <button
        class="mt-16"
        @click="submitHandler"
      >
        Create
      </button>
      <div
        v-if="error"
        class="mt-2 text-error"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import { defineComponent, ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '@/composables/store';
  import { Attr } from '@/composables/types';
  import IconArrowUp from '@/components/Icons/IconArrowUp.vue';
  import IconArrowDown from '@/components/Icons/IconArrowDown.vue';

  export default defineComponent({
    name: 'CharacterCreation',
    components: {
      IconArrowUp,
      IconArrowDown,
    },
    setup() {
      const router = useRouter();
      const { points, user, setPoints, createUser } = useStore();
      
      if (user.data) {
        router.push({ name: 'compatibility' });
      }

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

      const generateName = async () =>{
        const res = await axios.get('https://randomuser.me/api/?inc=name&nat=ca,us,nz');
        if (res.data.results[0]) {
          const { first, last } = res.data.results[0].name;
          input.name = `${first} ${last}`;
        }
      };

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

      const submitHandler = async () => {
        error.value = '';
        if (!input.name) {
          error.value = 'Please input your name.';
        } else if (points.data !== 0) {
          error.value = 'Please use all of the available skill points.';
        } else {
          await createUser(input);
          router.push({ name: 'compatibility' });
        }
      };

      return {
        Attr,
        error,
        input,
        points,
        attributes,
        generateName,
        addPoint,
        minusPoint,
        submitHandler,
      };
    },
  });
</script>
