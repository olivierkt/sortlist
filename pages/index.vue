<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="desc" />
  </Head>
  <div class="h-screen flex flex-col">
    <div class="[clip-path:polygon(0_0,100%_0,100%_0,0_100%)] h-[320px] w-full z-0 bg-deepPurple absolute transition-all" />
    <main class="relative z-10">
      <div class="lg:container mx-auto px-4 mt-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div class="col-span-1 lg:col-span-6">
            <header class="grid grid-cols-1 lg:grid-cols-12">
              <h1 class="col-span-1 lg:col-span-6 text-white font-bold mb-10 text-2xl">Sortable Post List</h1>
            </header>
            <list v-if="dataList.length > 0" :data="dataList" classes="gap-[30px] flex-col" :limit="5" :sortable="true" uid="list" />
          </div>
          <section class="col-span-1 lg:col-span-6">
            <div class="shadow-lg rounded-md">
              <div class="bg-white px-10 py-6 rounded-t-md">
                <h2 class="font-bold text-xl text-mgrey">List of actions committed</h2>
              </div>
              <div class="bg-xlGrey px-6 py-8 rounded-b-md">
                <list :data="historyList" v-if="historyList.length > 0" classes="gap-0 rounded-md border border-lgrey block flex-col-reverse" uid="history" class="bg-white shadow-lg" :sortable="false" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    <foot />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted } from 'vue';
import { useSeoMeta, useHead } from "unhead"
import Foot from "~/components/Foot.vue";
import List from "~/components/List.vue";
import { useListStore } from '~/store/liststore';
import type { PropType, Ref } from 'vue';
import type { googleData } from '~/types/googleData';
import data from '~/posts.json';

export default defineComponent({
  name: 'PostList',
  components: {
    List,
    Foot
  },
  props: {},
  setup(props, { emit }) {
    const title: Ref<string> = ref('Sortable Post List');
    const desc: Ref<string> = ref('Sortable Post List');
    const store = useListStore();
    const dataList = computed( () => store.getList);
    const history = computed( () => store.getHistory);
    const historyList = computed(() => history.value);
    const structuredData: Ref<googleData> = ref({
      "@context": "http://schema.org",
      "@type": "Product",
      "name": title.value,
      "description": desc.value,
      "image": [],
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
    });

    useHead({
      script: [{ type: 'application/ld+json', children: JSON.stringify(structuredData.value) }]
    });

    useSeoMeta({
      title: () => title.value,
      description: () => desc.value,
      ogTitle: () => title.value,
      ogDescription: () => desc.value,
      twitterCard: 'summary_large_image',
    });

    onMounted(async() => {
      await store.setList(data);
      await store.clearHistory();
    });

    return {
      structuredData,
      dataList,
      historyList,
      title,
      desc,
      data,
    }
  },
});

</script>

