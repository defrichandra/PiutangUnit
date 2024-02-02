<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="items"
    :search="search"
    items-per-page="5"
    page
    item-value="name"
    return-object
    show-select
    density="compact"
  >
    <template v-slot:loading>
      <v-skeleton-loader :type="`table-row@${totalRow}`"></v-skeleton-loader>
    </template>

    <template v-slot:[`item.obligationNo`]="{ value }">
      <tr>
        <td>{{ value }}</td>
      </tr>
    </template>

    <template v-slot:[`item.policyNo`]="{ value }">
      <tr>
        <td>{{ value }}</td>
      </tr>
    </template>

    <template v-slot:[`item.holder`]="{ value }">
      <tr>
        <td>{{ value }}</td>
      </tr>
    </template>

    <template v-slot:[`item.participant`]="{ value }">
      <tr>
        <td>{{ value }}</td>
      </tr>
    </template>

    <template v-slot:[`item.status`]="{ value }">
      <tr>
        <td>{{ value }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps([
  "loading",
  "headers",
  "items",
  "search",
  "totalRow",
]);

const totalRow = ref(props.items.length);
</script>

<style lang="scss" scoped></style>