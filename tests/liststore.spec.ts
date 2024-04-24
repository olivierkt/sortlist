import { setActivePinia, createPinia } from 'pinia'
import { useListStore } from '../store/liststore.ts';
import { beforeEach, afterEach, describe, it, expect } from 'vitest'

describe('useListStore', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useListStore();
  });

  afterEach(() => {
    store.clearHistory();
    store.removeList();
  });

  it('inits with empty list and history', () => {
    expect(store.getList).toEqual([]);
    expect(store.getHistory).toEqual([]);
  });

  it('sets a new list', () => {
    const newList = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    store.setList(newList);
    expect(store.getList).toEqual(newList);
  });

  it('removes list', () => {
    store.setList([{ id: 1, title: 'Post 1' }]);
    store.removeList();
    expect(store.getList).toEqual([]);
  });

  it('clears the history list', () => {
    store.pushHistory('Moved item');
    store.clearHistory();
    expect(store.getHistory).toEqual([]);
  });
});