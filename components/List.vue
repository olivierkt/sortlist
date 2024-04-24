<template>
  <ul :class="`w-full flex ${classes}`">
    <li v-for="(item, index) in list?.slice(0,limit)" :key="`${uid}-${item?.id}`">
      <list-item
        v-if="!sortable"
        :animate="animate?.includes(index)"
        :item="item"
        :index="index"
        :total="list.length - 1"
        @timetravel="revert"
      />
      <sorted-item
        v-else
        :item="item"
        :index="index"
        :animate="animate?.includes(index)"
        :total="list.length - 1"
        @increase="increase"
        @decrease="decrease"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import type { PropType, Ref } from 'vue';
import type { Lists, Item } from '~/types/lists';
import {useListStore} from "~/store/liststore";
import SortedItem from "~/components/SortedItem.vue";
import ListItem from "~/components/ListItem.vue";

export default defineComponent({
  name: 'SortableList',
  components: {SortedItem, ListItem},
  props: {
    data: {
      type: Array as PropType<Item[]>,
      default: () => [],
    },
    uid: {
      type: String as PropType<string>,
      default: 'key'
    },
    classes: {
      type: String as PropType<string>,
      default: ''
    },
    sortable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    limit: {
      type: Number as PropType<number>,
      default: 30,
    },
  },
  setup(props, { emit }) {
    const store = useListStore();
    const animate: Ref<number[]> = ref([]);
    const list: Ref<number[]> = ref([]);

    const decrease = (index: number): void => {
      const newIndex = index + 1;
      const listItem = list.value[index];
      insertItem(listItem, newIndex, index);
    };

    const insertItem = (listItem: Item, newIndex: number, oldindex: number): void => {
      let removedItem, message;
      message = createMessage(listItem.id, newIndex, oldindex);
      store.pushHistory(message);
      removedItem = list.value.splice(oldindex, 1)[0];
      addAnimate(newIndex, oldindex);
      list.value.splice(newIndex, 0, removedItem);
    };

    const createMessage = (id: number, next:number, prev: number): string => {
      return `Moved post ${id} from index ${prev + 1} to index ${next + 1}`;
    };

    const increase = (index: number): void => {
      const newIndex = index - 1;
      const listItem = list.value[index];
      insertItem(listItem, newIndex, index);
    };

    const revert = (index: number): void => {
      const historicEntry = store.getHistory[index];
      const newList = [...store.getHistory.slice(0, index)];
      store.setList(historicEntry.body);
      if (index === 0) {
        store.clearHistory();
        return;
      }
      store.setHistory(newList);
    };

    const addAnimate = (next: number, prev: number): void => {
      animate.value = [next, prev];
      setTimeout(() => {
        animate.value = [];
      }, 1000);
    };

    onMounted(() => {
      list.value = props.data;
    });

    watch(() => props.data, () => {
      list.value = props.data;
    });

    return {
      addAnimate,
      revert,
      increase,
      insertItem,
      decrease,
      list,
      animate,
    }
  },
});
</script>
