<template>
  <v-card class="text-left mt-4">
    <v-card-item>
      <v-card-title :class="{ 'mt-4 mx-2': sm || md, 'mt-4 mx-8': xl || lg }">
        Piutang Unit
      </v-card-title>
    </v-card-item>
    <v-card-text
      :class="{ 'mt-2 mb-8 mx-2': sm || md, 'mt-4 mb-8 mx-8': xl || lg }"
    >
      <v-row class="mb-4">
        <v-col cols="12" xs="12" md="7">
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            single-line
            variant="outlined"
            density="compact"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          xs="12"
          md="5"
          :class="{ 'text-end': xl || lg, 'text-left': xs || sm }"
        >
          <v-btn
            :disabled="isLoading"
            append-icon="mdi-refresh"
            text="Refresh"
            variant="flat"
            color="#5865f2"
            class="mr-2 mb-2"
            @click="refreshTable"
          ></v-btn>
          <v-btn
            append-icon="mdi-export-variant"
            text="Export"
            variant="flat"
            color="#FF1744"
            class="mr-2 mb-2"
            @click="selected.length > 0 ? exportFile() : (snackbar = true)"
          >
          </v-btn>
          <v-btn
            append-icon="mdi-contactless-payment-circle-outline"
            text="Bayar"
            variant="flat"
            color="#558B2F"
            class=""
            @click="
              selected.length > 0 ? (paymentDialog = true) : (snackbar = true)
            "
          >
          </v-btn>
        </v-col>
      </v-row>
      <div class="text-center">
        <Table
          id="table"
          :loading="isLoading"
          :headers="headers"
          :items="items"
          :search="search"
          v-model="selected"
        />
      </div>
    </v-card-text>
  </v-card>
  <v-dialog v-model="paymentDialog" width="auto">
    <v-card>
      <v-card-title> Payment Confirmation </v-card-title>
      <v-card-text>
        Are you sure you want to proceed with the payment?
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          color="#FF1744"
          variant="flat"
          class="text-none text-subtitle-1"
          @click="paymentDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          class="text-none text-subtitle-1 me-2 mx-4"
          @click="confirmPayment"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-model="snackbar"
    multi-line
    color="deep-purple-accent-4"
    elevation="24"
  >
    Please select at least one item before proceeding.
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { ref } from "vue";
import Table from "@/components/Table.vue";
import exportFromJSON from "export-from-json";

const { sm, md, lg, xl } = useDisplay();

const isLoading = ref(false);

const selected = ref([]);

const headers = ref([
  {
    title: "No. Kewajiban",
    align: "start",
    key: "obligationNo",
    minWidth: "150px",
  },
  { title: "No. Polisi", align: "start", key: "policyNo", minWidth: "120px" },
  { title: "Pemilik", align: "start", key: "holder", minWidth: "100px" },
  { title: "Peserta", align: "start", key: "participant", minWidth: "100px" },
  { title: "Nomor VA", align: "start", key: "vaNo", minWidth: "150px" },
  {
    title: "Harga Terbentuk  (Rp)",
    align: "end",
    key: "price",
    minWidth: "180px",
  },
  {
    title: "Biaya Admin ex PPN (Rp)",
    align: "end",
    key: "adminPpn",
    minWidth: "180px",
  },
  { title: "PPN (Rp)", align: "end", key: "ppn", minWidth: "180px" },
  { title: "Total  (Rp)", align: "end", key: "total", minWidth: "180px" },
  {
    title: "Tanggal Lelang",
    align: "end",
    key: "auctionDate",
    minWidth: "180px",
  },
  {
    title: "Tanggal Jatuh Tempo",
    align: "end",
    key: "expiredate",
    minWidth: "200px",
  },
  {
    title: "Tanggal Lunas",
    align: "end",
    key: "paymentDate",
    minWidth: "180px",
  },
  { title: "Status", align: "start", key: "status", minWidth: "250px" },
]);

const items = ref([
  {
    obligationNo: "B20116005069",
    policyNo: "KT 3090 BJS",
    holder: "PT OLX",
    participant: "SUYONO",
    vaNo: "",
    price: "93.850.000",
    adminPpn: 0,
    ppn: 0,
    total: "93.850.000",
    auctionDate: "11/11/2020",
    expiredate: "17/11/2020",
    paymentDate: "-",
    status: "KONFIRMASI PEMBAYARAN",
  },
  {
    obligationNo: "B20316005067",
    policyNo: "KT 3090 JSX",
    holder: "PT OLX",
    participant: "BUDIMAN",
    vaNo: "95621000012456",
    price: "13.950.000",
    adminPpn: 0,
    ppn: 0,
    total: "13.950.000",
    auctionDate: "10/11/2020",
    expiredate: "16/11/2020",
    paymentDate: "14/11/2020",
    status: "LUNAS",
  },
  {
    obligationNo: "B20116005065",
    policyNo: "B 1234 JEP",
    holder: "PT OLX",
    participant: "SUHERMAN",
    vaNo: "95621000012459",
    price: "190.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "190.000.000",
    auctionDate: "09/11/2020",
    expiredate: "15/11/2020",
    paymentDate: "-",
    status: "PROSES PEMBAYARAN",
  },
  {
    obligationNo: "B20116005070",
    policyNo: "KT 3090 XYZ",
    holder: "PT ABC",
    participant: "JOKO",
    vaNo: "95621000012460",
    price: "50.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "50.000.000",
    auctionDate: "12/11/2020",
    expiredate: "18/11/2020",
    paymentDate: "-",
    status: "BELUM LUNAS",
  },
  {
    obligationNo: "B20316005071",
    policyNo: "KT 3090 ABC",
    holder: "PT XYZ",
    participant: "RINA",
    vaNo: "95621000012461",
    price: "75.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "75.000.000",
    auctionDate: "13/11/2020",
    expiredate: "19/11/2020",
    paymentDate: "-",
    status: "KONFIRMASI PEMBAYARAN",
  },
  {
    obligationNo: "B20116005072",
    policyNo: "B 5678 JEP",
    holder: "PT QRS",
    participant: "JULIA",
    vaNo: "95621000012462",
    price: "120.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "120.000.000",
    auctionDate: "14/11/2020",
    expiredate: "20/11/2020",
    paymentDate: "-",
    status: "BELUM LUNAS",
  },
  {
    obligationNo: "B20316005073",
    policyNo: "KT 3090 XYZ",
    holder: "PT ABC",
    participant: "ANDRE",
    vaNo: "95621000012463",
    price: "45.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "45.000.000",
    auctionDate: "15/11/2020",
    expiredate: "21/11/2020",
    paymentDate: "-",
    status: "KONFIRMASI PEMBAYARAN",
  },
  {
    obligationNo: "B20116005074",
    policyNo: "KT 3090 ABC",
    holder: "PT XYZ",
    participant: "RICO",
    vaNo: "95621000012464",
    price: "30.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "30.000.000",
    auctionDate: "16/11/2020",
    expiredate: "22/11/2020",
    paymentDate: "-",
    status: "BELUM LUNAS",
  },
  {
    obligationNo: "B20316005075",
    policyNo: "B 5678 JEP",
    holder: "PT QRS",
    participant: "SINTA",
    vaNo: "95621000012465",
    price: "85.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "85.000.000",
    auctionDate: "17/11/2020",
    expiredate: "23/11/2020",
    paymentDate: "-",
    status: "KONFIRMASI PEMBAYARAN",
  },
  {
    obligationNo: "B20116005076",
    policyNo: "KT 3090 XYZ",
    holder: "PT ABC",
    participant: "DANI",
    vaNo: "95621000012466",
    price: "110.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "110.000.000",
    auctionDate: "18/11/2020",
    expiredate: "24/11/2020",
    paymentDate: "-",
    status: "BELUM LUNAS",
  },
  {
    obligationNo: "B20316005077",
    policyNo: "B 5678 JEP",
    holder: "PT QRS",
    participant: "LINA",
    vaNo: "95621000012467",
    price: "65.000.000",
    adminPpn: 0,
    ppn: 0,
    total: "65.000.000",
    auctionDate: "19/11/2020",
    expiredate: "25/11/2020",
    paymentDate: "-",
    status: "KONFIRMASI PEMBAYARAN",
  },
]);

function refreshTable() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    search.value = "";
  }, 2000);
}

function exportFile() {
  try {
    const data = selected.value;
    const fileName = "PiutangUnit";
    const exportType = exportFromJSON.types["xls"];
    exportFromJSON({ data, fileName, exportType });
  } catch (e) {
    throw new Error("Parsing failed!");
  }
}

const paymentDialog = ref(false);
const snackbar = ref(false);

function confirmPayment() {
  paymentDialog.value = false;
  selected.value.map((item) => {
    item.status = "LUNAS";
  });
}

const search = ref("");
</script>

<style lang="scss" scoped></style>  