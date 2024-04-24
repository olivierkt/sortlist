<template>
  <div
    :id="item?.id"
    class="h-[100px] px-3 transition-opacity bg-white flex flex-row items-center justify-between"
    :class="{
      'border-b border-lgrey': index !== total,
      'opacity-15': animate,
    }"
  >
    <p class="text-base">
      Post {{ item?.id }}
    </p>
    <div class="flex flex-col" :class="{'justify-between py-6 h-full': index > 0 && index < 4 }">
      <button @click="moveUp(index)" v-if="index !== 0">
        <chevron class="size-5 -rotate-90 fill-deepPurple" />
      </button>
      <button @click="moveDown(index)" v-if="index < 4">
        <chevron class="size-5 rotate-90 fill-deepPurple" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed } from 'vue';
import type { PropType, Ref } from 'vue';
import type { Item } from '~/types/lists';
import Chevron from "~/icons/Chevron.vue";

export default defineComponent({
  name: "SortedItem",
  components: {Chevron},
  props: {
    item: {
      type: Object as PropType<Item>,
      default: () => {}
    },
    index: {
      type: Number as PropType<number>,
      default: 0
    },
    total: {
      type: Number as PropType<number>,
      default: 0
    },
    animate: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { emit }) {
    const moveUp = (index: number): void => {
      emit('increase', index);
    };
    const moveDown = (index: number): void => {
      emit('decrease', index);
    };
    return {
      moveDown,
      moveUp,
    }
  },
});
</script>
