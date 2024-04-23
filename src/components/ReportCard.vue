<script setup>
import {useI18n} from 'vue-i18n';
import moment from 'moment/moment';
import {ref} from "vue";
import axios from "@/http/axios";

const {t: $t} = useI18n();
const img = import.meta.globEager('./../assets/img/*');
const props = defineProps({
  device: Object,
  agentList: Array,
  detail: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['getDetail']);

const getDetailCallback = (uuid, testName) => {
  emit('getDetail', uuid, testName)
}

const getImg = (name) => {
  let result;
  if (name === 'meizu') {
    name = 'Meizu';
  }
  if (name === 'LENOVO') {
    name = 'Lenovo';
  }
  try {
    result = img[`./../assets/img/${name}.jpg`].default;
  } catch {
    result = img['./../assets/img/unName.jpg'].default;
  }
  return result;
};

const testName = ref("")

const isInput = ref(false)

const submitRename = () => {
  if (testName.value !== "") {

    axios.post("/report/rename", {
      uuid: props.device.uuid,
      testName: testName.value
    }).then((resp) => {
      isInput.value = false
    })
  }

}

</script>

<template>
  <el-card
      shadow="hover"
      :body-style="{ padding: '15px 20px 15px 10px' }"
      class="device-card"
  >
    <template #header>
      <div style="position: relative; display: flex; align-items: center">
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="device.testName"
            placement="top"
        >
        <span v-show="!isInput"
              style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;color: #e6a23c; margin-left: 15px;margin-right: 10px">
          {{ device.testName }}
        </span>
        </el-tooltip>
        <!--        // todo-->
        <el-input v-show="isInput"
                  size="mini"
                  placeholder="请输入报告名"
                  v-model="testName">
        </el-input>
        <el-button size="mini" v-show="!isInput" icon="el-icon-edit" @click="isInput=true" circle></el-button>
        <el-button size="mini" v-show="isInput" icon="el-icon-check" @click="submitRename" circle></el-button>
        <el-button size="mini" v-show="isInput" icon="el-icon-close" @click="isInput=false" circle></el-button>
      </div>
    </template>
    <el-row @click="getDetailCallback(device.uuid,device.testName)">
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
            {{ moment(new Date(device.timestamp)).format('yy.MM.DD HH:mm:ss') }}
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
