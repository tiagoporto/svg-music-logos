<script setup lang="ts">
import type { Artist } from '../../../server/db/schema'

interface SearchProps {
  artists?: Artist[]
  artistsStatus: string
  selectedFilterBy: string | null
}
const {
  artists = [],
  artistsStatus,
  selectedFilterBy,
} = defineProps<SearchProps>()

const route = useRoute()

const selectedArtist = ref(
  typeof route.params.artistId === 'string' ? route.params.artistId : null,
)

const changeArtist = (value: string) => {
  if (value) {
    navigateTo({
      name: 'artist-artistId',
      params: { artistId: value },
      query: {
        ...route.query,
        page: undefined,
        origin: undefined,
        genre: undefined,
      },
    })

    return
  }

  navigateTo({
    name: 'index',
    query: {
      ...route.query,
      page: undefined,
      origin: undefined,
      genre: undefined,
    },
  })
}
</script>

<template>
  <v-autocomplete
    v-model="selectedArtist"
    clearable
    placeholder="Search Artist"
    data-testid="artist-autocomplete"
    variant="solo"
    item-title="name"
    item-value="id"
    :items="artists"
    :disabled="!!selectedFilterBy"
    :loading="artistsStatus !== 'success'"
    @update:model-value="changeArtist"
  ></v-autocomplete>
</template>
