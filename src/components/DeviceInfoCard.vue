<script setup>
import {useI18n} from 'vue-i18n';
import {ElMessage, ElMessageBox} from 'element-plus';
import ColorImg from '@/components/ColorImg.vue';
import {useRouter} from 'vue-router';
import RenderDeviceName from './RenderDeviceName.vue';
import axios from '../http/axios';

const router = useRouter();
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
const emit = defineEmits(['useScreenCall',"reSelectionDevice"]);
const useScreenCall = () => {
  ElMessageBox.confirm(
      '是否使用投屏？',
      $t('elements.warn'),
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    // todo 增加选择设备的方法
    ElMessage({
      type: 'success',
      message: '成功',
    });
    emit('useScreenCall');
  }).catch((err) => {
    ElMessage({
      type: 'info',
      message: '已取消',
    });
  })
}

const reSelectionDevice = () => {
  ElMessageBox.confirm(
      '是否重新选择设备？',
      $t('elements.warn'),
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    // todo 增加选择设备的方法
    ElMessage({
      type: 'success',
      message: '成功',
    });
    emit('reSelectionDevice');
  }).catch((err) => {
    ElMessage({
      type: 'info',
      message: '已取消',
    });
  })
}
const getPhoneImg = (name, url) => {
  let result;
  if (url === null || !url || (url && url.length === 0)) {
    result = img['./../assets/img/default.png'].default;
  } else {
    result = url;
  }
  return result;
};
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
</script>

<template>
  <el-card
      shadow="hover"
      :body-style="{ padding: '15px 20px 15px 10px' }"
      class="device-card"
  >
    <template #header>
      <div style="position: relative; display: flex; align-items: center">
        <el-button size="small" circle icon="el-icon-arrow-left" @click="reSelectionDevice"></el-button>
<!--        <el-icon :size="14" style="vertical-align: middle">-->
<!--          <Cellphone/>-->
<!--        </el-icon>-->
        <RenderDeviceName
            style="color: #e6a23c; margin-left: 15px"
            :device="device"
        />
      </div>
    </template>
    <el-row>
      <el-col :span="10">
        <div style="text-align: center">
          <el-image
              style="height: 160px"
              fit="contain"
              :src="getPhoneImg(device.model, device['imgUrl'])"
              :preview-src-list="[getPhoneImg(device.model, device['imgUrl'])]"
              hide-on-click-modal
          />
        </div>
      </el-col>
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
          <el-form-item :label="$t('devices.form.battery.level')">
            <div
                :style="{
                position: 'relative',
                display: 'flex',
                'align-items': 'center',
                color:
                  device['level'] === 0
                    ? '#606266'
                    : device['level'] <= 30
                    ? '#F56C6C'
                    : device['level'] <= 70
                    ? '#E6A23C'
                    : '#67C23A',
              }"
            >
              <ColorImg
                  v-if="
                  device['level'] !== 0
                "
                  style="margin-right: 5px"
                  :src="
                  device['level'] <= 25
                    ? img['./../assets/img/powerLow.png'].default
                    : device['level'] <= 50
                    ? img['./../assets/img/powerMid.png'].default
                    : device['level'] <= 75
                    ? img['./../assets/img/powerHigh.png'].default
                    : img['./../assets/img/powerFull.png'].default
                "
                  :width="20"
                  :height="20"
                  :color="
                  device['level'] === 0
                    ? '#606266'
                    : device['level'] <= 30
                    ? '#F56C6C'
                    : device['level'] <= 70
                    ? '#E6A23C'
                    : '#67C23A'
                "
              />
              {{
                device['level'] === 0
                    ? $t('form.unknown')
                    : device['level']
              }}
            </div>
          </el-form-item>
          <el-form-item :label="$t('devices.form.battery.temperature')">
            <div
                :style="{
                position: 'relative',
                display: 'flex',
                'align-items': 'center',
                color:
                    device['temperature'] < 300
                    ? '#67C23A'
                    : device['temperature'] < 350
                    ? '#E6A23C'
                    : '#F56C6C',
              }"
            >
              <ColorImg
                  v-if="
                  device['temperature'] !== 0
                "
                  style="margin-left: -4px; margin-right: 3px"
                  :src="img['./../assets/img/tem.png'].default"
                  :width="20"
                  :height="20"
                  :color="
                  device['temperature'] === 0
                    ? '#606266'
                    : device['temperature'] < 300
                    ? '#67C23A'
                    : device['temperature'] < 350
                    ? '#E6A23C'
                    : '#F56C6C'
                "
              />
              {{
                device['temperature'] === 0
                    ? $t('form.unknown')
                    : (device['temperature'] / 10).toFixed(1) + ' ℃'
              }}
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div style="text-align: center">
      <el-button
          type="primary"
          size="mini"
          @click="useScreenCall"
      >使用投屏
      </el-button>
    </div>
  </el-card>
</template>
