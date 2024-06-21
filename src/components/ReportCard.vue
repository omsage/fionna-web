<script setup>
import { useI18n } from "vue-i18n";
import moment from "moment/moment";
import { onMounted, ref, watch } from "vue";
import axios, { baseURL } from "@/http/axios";

const { t: $t } = useI18n();
const img = import.meta.globEager("./../assets/img/*");
const props = defineProps({
  device: Object,
  agentList: Array,
  detail: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["getDetail", "selectReportList"]);

const getDetailCallback = (uuid, testName) => {
  emit("getDetail", uuid, testName);
};
const isCheckbox = ref(false);
const selectReportListCallback = () => {
  emit("selectReportList", props.device, isCheckbox.value);
};

watch(isCheckbox, () => {
  selectReportListCallback();
});

onMounted(() => {
  getPerfConfig();
});

const getImg = (name) => {
  let result;
  if (name === "meizu") {
    name = "Meizu";
  }
  if (name === "LENOVO") {
    name = "Lenovo";
  }
  try {
    result = img[`./../assets/img/${name}.jpg`].default;
  } catch {
    result = img["./../assets/img/unName.jpg"].default;
  }
  return result;
};

const testName = ref("");

const isInput = ref(false);

const submitRename = () => {
  if (testName.value !== "") {
    axios
      .post("/report/rename", {
        uuid: props.device.uuid,
        testName: testName.value,
      })
      .then((resp) => {
        isInput.value = false;
      });
  }
};

const getReportDownLink = () => {
  if (baseURL !== "/") {
    return baseURL + "/report/down?uuid=" + props.device.uuid;
  } else {
    return "http://localhost:3417/report/down?uuid=" + props.device.uuid;
  }
};

const perfConfig = ref("");

const getPerfConfig = () => {
  axios
    .get("/report/config", { params: { uuid: props.device.uuid } })
    .then((resp) => {
      delete resp.data.uuid;
      delete resp.data.intervalTime;
      // for (let key in resp.data){
      //   perfConfig.value += key
      //   perfConfig.value += '\n'
      // }
      perfConfig.value = resp.data;
      // let str = JSON.stringify(resp.data, null, 2)
      // str = str.replaceAll("{","")
      // str = str.replaceAll("}","")
      // perfConfig.value = str
    });
};
</script>

<template>
  <el-card
    shadow="hover"
    :body-style="{ padding: '15px 20px 15px 10px' }"
    class="device-card"
  >
    <template #header>
      <div style="position: relative; display: flex; align-items: center">
        <!--        todo add checkbox callback-->
        <el-checkbox size="large" v-model="isCheckbox" />
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="device.testName"
          placement="top"
        >
          <span
            v-show="!isInput"
            style="
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #e6a23c;
              margin-left: 15px;
              margin-right: 10px;
            "
          >
            {{ device.testName }}
          </span>
        </el-tooltip>
        <!--        // todo-->
        <el-input
          v-show="isInput"
          size="mini"
          :placeholder="$t('report.selectReportMess')"
          v-model="testName"
        >
        </el-input>
        <el-button
          size="mini"
          v-show="!isInput"
          icon="el-icon-edit"
          @click="isInput.value = true"
          circle
        ></el-button>
        <el-button
          size="mini"
          v-show="isInput"
          icon="el-icon-check"
          @click="submitRename"
          circle
        ></el-button>
        <el-button
          size="mini"
          v-show="isInput"
          icon="el-icon-close"
          @click="isInput.value = false"
          circle
        ></el-button>
      </div>
    </template>
    <el-tooltip class="box-item" effect="dark" placement="top">
      <template #content>
        <div v-for="(value, key) in perfConfig" :key="key">
          {{ key + ": " + value }}<br />
        </div>
      </template>
      <el-row @click="getDetailCallback(device.uuid, device.testName)">
        <el-col :span="14">
          <el-form
            label-position="left"
            class="device-form"
            label-width="70px"
            style="margin: 0 0 15px 10px; white-space: nowrap"
          >
            <el-form-item v-if="!detail" :label="$t('devices.form.model')">
              <div>{{ device.model }}</div>
            </el-form-item>
            <el-form-item :label="$t('devices.form.manufacturer')">
              <img
                v-if="
                  device.manufacturer === 'HUAWEI' ||
                  device.manufacturer === 'samsung' ||
                  device.manufacturer === 'OnePlus' ||
                  device.manufacturer === 'GIONEE' ||
                  device.manufacturer === 'motorola' ||
                  device.manufacturer === 'HONOR'
                "
                style="width: 80px"
                :src="getImg(device.manufacturer)"
              />
              <img
                v-else-if="
                  device.manufacturer === 'Xiaomi' ||
                  device.manufacturer === 'LGE' ||
                  device.manufacturer === 'HTC' ||
                  device.manufacturer === 'deltainno'
                "
                style="width: 30px"
                :src="getImg(device.manufacturer)"
              />
              <img
                v-else-if="
                  device.manufacturer === 'blackshark' ||
                  device.manufacturer === 'APPLE'
                "
                style="width: 22px"
                :src="getImg(device.manufacturer)"
              />
              <img
                v-else-if="
                  getImg(device.manufacturer) ==
                  img['./../assets/img/unName.jpg'].default
                "
                style="width: 30px"
                :src="getImg(device.manufacturer)"
              />
              <img
                v-else
                style="width: 70px"
                :src="getImg(device.manufacturer)"
              />
            </el-form-item>
            <el-form-item :label="$t('devices.form.system')">
              <span v-if="device.platform === 1">
                <img
                  v-if="device['isHm'] === 0"
                  style="width: 30px"
                  :src="getImg('ANDROID')"
                />
                <img
                  v-if="device['isHm'] === 1"
                  style="width: 22px"
                  :src="getImg('HarmonyOs')"
                />
              </span>
              <img
                v-if="device.platform === 2"
                style="width: 22px"
                :src="getImg('IOS')"
              />
              <span style="margin-left: 6px">{{ device.version }}</span>
            </el-form-item>
            <el-form-item :label="$t('devices.form.testPackageName')">
              {{ device.packageName }}
            </el-form-item>
            <el-form-item :label="$t('devices.form.testTime')">
              {{
                moment(new Date(device.timestamp)).format("yy.MM.DD HH:mm:ss")
              }}
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-tooltip>
    <div style="text-align: center">
      <a :href="getReportDownLink()">
        <el-button type="primary" size="mini"
          >{{ $t("report.down") }}
        </el-button>
      </a>
    </div>
  </el-card>
</template>
