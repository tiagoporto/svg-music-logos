<script setup lang="ts">
interface SearchProps {
  selectedFilterBy: string | null
}
const { selectedFilterBy } = defineProps<SearchProps>()

const { data: genres, status: genresStatus } = useFetch('/api/genres')
const { data: origin, status: originStatus } = useFetch('/api/origins')
const selectedFilterByRef = ref(selectedFilterBy)
const route = useRoute()

const itemsPerPageOptions = shallowRef([30, 60, 90, 120])
const initialItemsPerPage = shallowRef(Number(route.query.itemsPerPage) || 30)

const filterByOptions = computed(() => [
  {
    title: 'ORIGIN',
    type: 'subheader',
  },
  ...(origin.value?.origins ?? []),
  {
    title: 'GENRE',
    type: 'subheader',
  },
  ...(genres.value?.genres ?? []),
])

watchEffect(() => {
  if (!Number(route.query.itemsPerPage)) {
    navigateTo({
      query: {
        ...route.query,
        itemsPerPage: initialItemsPerPage.value,
      },
    })
  }
})

const changeFilterBy = (value: string): void => {
  const isOrigin = origin.value?.origins.some(
    (origin: string) => origin === value,
  )

  if (isOrigin) {
    navigateTo({
      query: {
        ...route.query,
        page: undefined,
        origin: value || undefined,
        genre: undefined,
      },
    })
  } else {
    navigateTo({
      query: {
        ...route.query,
        page: undefined,
        genre: value || undefined,
        origin: undefined,
      },
    })
  }
}

const changeItemsPerPage = (value: number) => {
  navigateTo({
    query: { ...route.query, page: undefined, itemsPerPage: value },
  })
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="9" class="pb-0">
      <v-select
        v-model="selectedFilterByRef"
        clearable
        label="Filter by"
        density="compact"
        variant="outlined"
        :items="filterByOptions"
        :disabled="!!route.params.artistId"
        :loading="genresStatus === 'pending' || originStatus === 'pending'"
        @update:model-value="changeFilterBy"
      >
        <template #item="{ props: itemProps, item }">
          <v-list-subheader
            v-if="typeof item.raw === 'object' && item.raw.type === 'subheader'"
            v-bind="itemProps"
          />

          <v-list-item v-else v-bind="itemProps"></v-list-item>
        </template>
      </v-select>
    </v-col>

    <v-col cols="12" sm="3">
      <v-select
        v-model="initialItemsPerPage"
        label="Items per page"
        variant="outlined"
        density="compact"
        :items="itemsPerPageOptions"
        @update:model-value="changeItemsPerPage"
      >
      </v-select>
    </v-col>
  </v-row>
</template>
