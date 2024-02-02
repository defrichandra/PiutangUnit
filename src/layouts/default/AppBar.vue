<template>
  <v-app-bar flat color="#16A74D">
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      Piutang Unit
    </v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer
    :model-value="drawer"
    location="left"
    color="#E3FFC1"
    theme="dark"
  >
    <v-list density="compact" nav>
      <template v-for="(item, index) in menu" :key="index">
        <v-list-group v-if="item.subMenus" :value="item.value">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
            ></v-list-item>
          </template>
          <v-list density="compact" nav class="ml-6">
            <template v-for="(sub, i) in item.subMenus">
              <v-list-item
                v-if="sub"
                :key="i"
                :prepend-icon="sub.icon"
                :title="sub.title"
                :to="sub.to"
              ></v-list-item>
            </template>
          </v-list>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
//
import { ref } from "vue";

const drawer = ref(true);

const menu = ref([
  {
    title: "Home",
    value: "home",
    icon: "mdi-home-circle-outline",
    to: "/home",
    subMenus: [
      {
        title: "Piutang Unit",
        value: "piutang_unit",
        icon: "mdi-credit-card-check-outline",
        to: "/credit",
      },
    ],
  },
]);
</script>
