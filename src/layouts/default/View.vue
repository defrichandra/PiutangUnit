<template>
  <v-main>
    <v-container class="fill-height">
      <v-responsive class="text-center fill-height">
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
          <template v-slot:title="{ item }">
            <span :style="{ color: item.disabled ? 'inherit' : 'blue' }">
              {{ item.title.toUpperCase() }}
            </span>
          </template>
        </v-breadcrumbs>
        <router-view />
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script setup>
//
import { ref } from "vue";

const breadcrumbs = ref([
  {
    title: "Home",
    disabled: false,
    href: "home",
  },
  {
    title: "Daftar Piutang Unit",
    disabled: true,
    href: "credit",
  },
]);
</script>
