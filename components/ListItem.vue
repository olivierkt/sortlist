<template>
  <div
    :id="item?.id"
    class="h-[130px] shadow-lg px-5 rounded-md text-xl transition-opacity bg-white flex flex-row items-center justify-between"
    :class="{
      'rounded-t-md': index === 0,
      'rounded-b-md': index === total,
    }">
    <p class="text-base">
      {{ item?.title }}
    </p>
    <button class="text-base bg-bGreen h-14 rounded-md px-8 hover:bg-lbGreen transition-colors" @click="timeTravel(index)">Time travel</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed } from 'vue';
import type { PropType, Ref } from 'vue';
import type { Item } from '~/types/lists';

export default defineComponent({
  name: "ItemList",
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
    const timeTravel = (index: number): void => {
      emit('timetravel', index);
    };
    return {
      timeTravel
    }
  },
});
</script>
