import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {Item, Lists, History} from '~/types/lists';

export const useListStore = defineStore('liststore', {
  state: () => ({
    list: ref([]) as Lists | [],
    history: ref([]) as History[] | [],
    index: ref(0),
  }),
  // persist: {
  //   storage: persistedState.localStorage
  // },
  getters: {
    getList: (state) => state.list,
    getHistory: (state) => state.history,
  },
  actions: {
    setList(value: Lists): void {
      this.list = value;
    },
    removeList(): void {
      this.list = [];
    },
    pushHistory(message: string): void {
      this.history.push({
        id: this.index,
        title: message,
        body: [...this.getList],
      });
      this.index++;
    },
    setHistory(history: Lists): void {
      this.history = history;
    },
    clearHistory(): void {
      this.history = [];
    },
  },
})
