<script setup>
/*
 *   sonic-client-web  Front end of Sonic cloud real machine platform.
 *   Copyright (C) 2022 SonicCloudOrg
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published
 *   by the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import {useRoute, useRouter} from 'vue-router';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import {useStore} from 'vuex';
import axios from '@/http/axios';
import {ElMessage, ElMessageBox} from 'element-plus';
import useClipboard from 'vue-clipboard3';
import {
  SwitchButton,
  Cellphone,
  Menu,
  CopyDocument,
  House,
  Back,
  View,
  InfoFilled,
} from '@element-plus/icons';

import {useI18n} from 'vue-i18n';

import RenderDeviceName from '../../components/RenderDeviceName.vue';
import Scrcpy from './Scrcpy';
import AndroidPerf from '../../components/AndroidPerf.vue';
import DeviceInfoCard from "@/components/DeviceInfoCard.vue";
import WSUri from '@/http/webUrl';

const androidPerfRef = ref(null);
const {t: $t} = useI18n();

const {toClipboard} = useClipboard();
const store = useStore();
const router = useRouter();
const terminalHeight = ref(0);
const loading = ref(false);
const appList = ref([]);
const text = ref({content: ''});
let imgWidth = 0;
let imgHeight = 0;
const directionStatus = {
  value: -1,
};
let isPress = false;
const pic = ref('高');
const _screenMode = window.localStorage.getItem('screenMode');
const screenMode = ref(_screenMode || 'Scrcpy'); // Scrcpy,Minicap
const activeTab = ref('perfmon');
const title = ref('');
const cmdInput = ref('');
const cmdOutPut = ref([]);
const cmdUser = ref('');
const logcatOutPut = ref([]);
const terScroll = ref(null);
const logcatScroll = ref(null);
const cmdIsDone = ref(true);
const currentUdid = ref("");
const logcatFilter = ref({
  level: 'E',
  filter: '',
});

const element = ref({
  id: null,
  moduleId: 0,
  eleName: '',
  eleType: 'image',
  eleValue: '',
  projectId: 0,
});
const switchTabs = (e) => {
  if (e.props.name === 'apps' || e.props.name === 'perfmon') {
    if (appList.value.length === 0) {
      refreshAppList();
    }
  }
  if (e.props.name === 'terminal') {
    if (terminalWebsocket === null && selectDeviceUdid.value !== "") {
      initTerminalWebsocket()
    }
    terminalHeight.value = document.getElementById('pressKey').offsetTop - 150;
  }
};

let perfPongId;
const startPerfmon = (perfConfig, isStart) => {
  if (perfConfig.procCpu || perfConfig.procMem || perfConfig.procThread) {
    if (perfConfig.packageName === "") {
      ElMessage.error({
        message: '请选择需要采集的应用',
      });
      isStart.value = false
      return
    }

  }
  if (selectDeviceUdid.value === "") {
    ElMessage.error({
      message: '未选择设备',
    });
    isStart.value = false
  } else {
    perfWebsocket = new WebSocket(WSUri + 'android/perf');
    perfWebsocket.onopen = () => {
      // console.log(JSON.stringify(udidInfo.value))
      perfWebsocket.send(JSON.stringify(udidInfo.value))

      perfWebsocket.send(
          JSON.stringify({
            messageType: 'startPerfmon',
            data: perfConfig,
          })
      );
      perfPongId = setTimeout(() => {
        perfWebsocket.send(JSON.stringify({
          messageType: 'pongPerfmon'
        }));
      }, 2000);

      perfWebsocket.onmessage = perfWebsocketOnmessage;
      isStart.value = true
    }

  }
};
const stopPerfmon = (isStart) => {
  isStart.value = false
  perfWebsocket.send(
      JSON.stringify({
        messageType: 'closePerfmon',
      })
  );
  if (perfPongId !== null) {
    clearTimeout(perfPongId);
    perfPongId = null;
  }

};
const img = import.meta.globEager('../../assets/img/*');
let perfWebsocket = null;
let screenWebsocket = null;
let __Scrcpy = null; // 实例
let terminalWebsocket = null;

defineProps({
  tabPosition: String,
  canvasRectInfo: Object,
  layoutSplitInfo: Object,
  isSplitPressing: Boolean,
  lineMouseup: Function,
  lineMousemove: Function,
  lineMousedown: Function,
  lineMouseleave: Function,
});

const terminalLoading = ref(false)

const getImg = (name) => {
  let result;
  if (name === 'meizu') {
    name = 'Meizu';
  }
  if (name === 'LENOVO') {
    name = 'Lenovo';
  }
  try {
    result = img[`../../assets/img/${name}.jpg`].default;
  } catch {
    result = img['../../assets/img/unName.jpg'].default;
  }
  return result;
};
const copy = (value) => {
  try {
    toClipboard(value);
    ElMessage.success({
      message: $t('androidRemoteTS.copySuccess'),
    });
  } catch (e) {
    ElMessage.error({
      message: $t('androidRemoteTS.copyFail'),
    });
  }
};
const sendLogcat = () => {
  if (terminalWebsocket === null) {
    initTerminalWebsocket()
  }
  terminalWebsocket.send(
      JSON.stringify({
        messageType: 'logcat',
        data: {
          level: logcatFilter.value.level,
          filter: logcatFilter.value.filter,
        }
      })
  );
};
const clearLogcat = () => {
  logcatOutPut.value = [];
};
const stopLogcat = () => {
  terminalWebsocket.send(
      JSON.stringify({
        messageType: 'stopLogcat',
        uuid: logcatUUID.value,
      })
  );
};

let terminalPongId = null;
const initTerminalWebsocket = () => {
  if (selectDeviceUdid.value === "") {
    ElMessage.error({
      message: '请选择设备',
    });
    return
  }
  terminalLoading.value = true
  terminalWebsocket = new WebSocket(WSUri + 'android/terminal?udid=' + selectDeviceUdid.value);
  terminalWebsocket.onmessage = terminalWebsocketOnmessage;
  terminalWebsocket.onopen = () => {
    terminalLoading.value = false
    terminalPongId = setTimeout(() => {
      terminalWebsocket.send(JSON.stringify({
        messageType: 'pongTerminal'
      }));
    }, 2000);
  }
}
const sendCmd = () => {
  if (terminalWebsocket === null) {
    initTerminalWebsocket()
  }
  if (terminalWebsocket !== null) {
    if (cmdInput.value.length > 0 && cmdIsDone.value === true) {
      cmdIsDone.value = false;
      cmdOutPut.value.push(
          JSON.parse(
              JSON.stringify(
                  `<span style='color: #409EFF'>${cmdUser.value}</span>:/ $ ${cmdInput.value}`
              )
          )
      );
      terminalWebsocket.send(
          JSON.stringify({
            messageType: 'command',
            uuid: commandUUID.value,
            data: cmdInput.value,
          })
      );
      cmdInput.value = '';
    }
  }

};
const clearCmd = () => {
  cmdOutPut.value = [];
};
const stopCmd = () => {
  cmdIsDone.value = true;
  terminalWebsocket.send(
      JSON.stringify({
        messageType: 'stopCommand',
        uuid: commandUUID.value,
      })
  );
};

const commandUUID = ref("")
const logcatUUID = ref("")
const terminalWebsocketOnmessage = (message) => {
  // console.log(message)
  switch (JSON.parse(message.data).messageType) {
    case 'logcat':
      logcatUUID.value = JSON.parse(message.data).uuid
      logcatOutPut.value.push($t('androidRemoteTS.connection'));
      break;
    case 'logcatResp':
      logcatUUID.value = JSON.parse(message.data).uuid
      logcatOutPut.value.push(
          JSON.parse(message.data)
              .data.replace(/ I /g, "<span style='color: #0d84ff'> I </span>")
              .replace(/ V /g, "<span style='color: #0d84ff'> I </span>")
              .replace(/ D /g, "<span style='color: #0d84ff'> D </span>")
              .replace(/ W /g, "<span style='color: #E6A23C'> W </span>")
              .replace(/ E /g, "<span style='color: #F56C6C'> E </span>")
              .replace(/ F /g, "<span style='color: #F56C6C'> F </span>")
      );
      nextTick(() => {
        logcatScroll.value.wrap.scrollTop =
            logcatScroll.value.wrap.scrollHeight;
      });
      break;
    case 'logcatRespEnd':
      logcatOutPut.value = []
      logcatUUID.value = ""
      break;
    case 'terminal':
      cmdUser.value = JSON.parse(message.data).user;
      cmdOutPut.value.push($t('androidRemoteTS.connection'));
      break;
    case 'commandResp':
      cmdOutPut.value.push(JSON.parse(message.data).data);
      commandUUID.value = JSON.parse(message.data).uuid
      nextTick(() => {
        terScroll.value.wrap.scrollTop = terScroll.value.wrap.scrollHeight;
      });
      break;
    case 'commandRespEnd':
      cmdIsDone.value = true;
      commandUUID.value = ""
      break;
    case 'error':
      ElMessage.error({
        message: $t('androidRemoteTS.systemException'),
      });
      close();
      break;
  }
};
const screenWebsocketOnmessage = (message) => {
  // console.log('screenWebsocketOnmessage', message.data);
  switch (JSON.parse(message.data).messageType) {
    case 'sizeInfo': {
      loading.value = true;

      imgWidth = JSON.parse(message.data).sizeInfo.width;
      imgHeight = JSON.parse(message.data).sizeInfo.height;
      let rotation = JSON.parse(message.data).sizeInfo.rotation;

      if (directionStatus.value % 2 !== rotation % 2) {
        directionStatus.value = rotation;
        __Scrcpy.jmuxer && __Scrcpy.jmuxer.reset();
      }
      loading.value = false;
      break;
    }
      // case 'picFinish': {
      //   loading.value = false;
      //   break;
      // }
    case 'error':
      ElMessage.error({
        message: $t('androidRemoteTS.systemException'),
      });
      close();
      break;
  }
};
const perfWebsocketOnmessage = (message) => {
  // console.log(message.data)
  switch (JSON.parse(message.data).messageType) {
    case 'perfdata':
      androidPerfRef.value.setData(JSON.parse(message.data).perfData);
      break;
    case 'error': {
      ElMessage.error({
        message: $t('androidRemoteTS.systemException'),
      });
      close();
      router.go(-1);
      break;
    }
  }
};
const inputValue = ref('');
const inputBox = ref(null);
const inputBoxStyle = ref({});
const changeInputHandle = () => {
  // if (inputValue.value) {
  //   websocket.send(
  //       JSON.stringify({
  //         type: 'text',
  //         detail: inputValue.value,
  //       })
  //   );
  //   inputValue.value = '';
  // }
};
const deleteInputHandle = () => {
  // websocket.send(
  //     JSON.stringify({
  //       type: 'text',
  //       detail: 'CODE_AC_BACK',
  //     })
  // );
};
const setPasteboard = (text) => {
  perfWebsocket.send(
      JSON.stringify({
        type: 'setPasteboard',
        detail: text,
      })
  );
  ElMessage.success({
    message: $t('IOSRemote.clipboard.SentSuccessfully'),
  });
};
const getPasteboard = () => {
  perfWebsocket.send(
      JSON.stringify({
        type: 'getPasteboard',
      })
  );
};
const enterInputHandle = () => {
  // websocket.send(
  //     JSON.stringify({
  //       type: 'text',
  //       detail: 'CODE_AC_ENTER',
  //     })
  // );
};
const getCurLocation = () => {
  let x;
  let y;
  const canvas = document.getElementById('scrcpy-video');

  const rect = canvas.getBoundingClientRect();
  x = parseInt(
      (event.clientX - rect.left) * (imgWidth / canvas.clientWidth)
  );
  y = parseInt(
      (event.clientY - rect.top) * (imgHeight / canvas.clientHeight)
  );
  inputBoxStyle.value = {
    left: `${event.clientX - rect.left}px`,
    top: `${event.clientY - rect.top}px`,
  };
  if (x < 0 || x === -0) {
    x = 0
  }
  if (x > imgWidth) {
    x = imgWidth
  }
  if (y < 0 || y === -0) {
    y = 0
  }
  if (y > imgHeight) {
    y = imgHeight
  }
  return {
    x,
    y,
  };
};
const mouseup = (event) => {
  if (isPress) {
    isPress = false;
    const {x, y} = getCurLocation();
    isPress = false;
    __Scrcpy.touch(
        JSON.stringify({
          messageType: 'touch',
          data: {
            actionType: 1,
            x: x,
            y: y,
            width: imgWidth,
            height: imgHeight,
          },
        })
    );
    inputBox.value.focus();
  }
};
const mouseleave = () => {
  if (isPress) {
    const {x, y} = getCurLocation();
    isPress = false;
    __Scrcpy.touch(
        JSON.stringify({
          messageType: 'touch',
          data: {
            actionType: 1,
            x: x,
            y: y,
            width: imgWidth,
            height: imgHeight,
          },
        })
    );
  }
};
const mousedown = (event) => {
  const {x, y} = getCurLocation();
  isPress = true;
  __Scrcpy.touch(
      JSON.stringify({
        messageType: 'touch',
        data: {
          actionType: 0,
          x: x,
          y: y,
          width: imgWidth,
          height: imgHeight,
        }
      })
  )
};
const mousemove = (event) => {
  if (isPress) {
    const {x, y} = getCurLocation();
    __Scrcpy.touch(
        JSON.stringify({
          messageType: 'touch',
          data: {
            actionType: 2,
            x: x,
            y: y,
            width: imgWidth,
            height: imgHeight,
          }

        })
    )
  }
};
const refreshAppList = () => {
  appList.value = [];
  ElMessage.success({
    message: $t('androidRemoteTS.loadIng'),
  });
  getAppList();
};

const getAppList = () => {
  axios.get("/android/app/list", {params: {udid: selectDeviceUdid.value}}).then((resp) => {
    for (let i in resp.data) {
      appList.value.push(resp.data[i])
    }
  })
}


const pressKey = (keyNum) => {
  axios.get("/android/serial/keycode", {
    params: {
      udid: selectDeviceUdid.value,
      keycode: keyNum
    }
  }).then((resp) => {

  })
  // websocket.send(
  //     JSON.stringify({
  //       type: 'keyEvent',
  //       detail: keyNum,
  //     })
  // );
};
const changePic = (type) => {
  loading.value = true;
  let pic;
  switch (type) {
    case $t('androidRemoteTS.low'):
      pic = 'low';
      break;
    case $t('androidRemoteTS.middle'):
      pic = 'middle';
      break;
    case $t('androidRemoteTS.high'):
      pic = 'high';
      break;
    case 'fixed':
      pic = 'fixed';
      break;
  }
  screenWebsocket.send(
      JSON.stringify({
        type: 'pic',
        detail: pic,
      })
  );
};

const scan = (url) => {
  perfWebsocket.send(
      JSON.stringify({
        type: 'scan',
        url,
      })
  );
};
const startKeyboard = () => {
  perfWebsocket.send(
      JSON.stringify({
        type: 'startKeyboard',
      })
  );
};
const stopKeyboard = () => {
  perfWebsocket.send(
      JSON.stringify({
        type: 'stopKeyboard',
      })
  );
};
const close = () => {
  if (perfWebsocket !== null) {
    perfWebsocket.close();
    perfWebsocket = null;
  }
  if (screenWebsocket !== null) {
    screenWebsocket.close();
    screenWebsocket = null;
    __Scrcpy && __Scrcpy.destroy();
    __Scrcpy = null;
  }
  if (terminalWebsocket !== null) {
    terminalWebsocket.close();
    terminalWebsocket = null;
  }
  if (perfPongId !== null) {
    clearTimeout(perfPongId);
    perfPongId = null;
  }
  if (terminalPongId !== null) {
    clearTimeout(terminalPongId);
    terminalPongId = null;
  }
  // window.close();
};
onBeforeUnmount(() => {
  close();
});

const serialInfoList = ref([])
const getAndroidDeviceList = () => {
  axios.get('/android/serial/list').then((resp) => {
    for (let i in resp.data) {
      serialInfoList.value.push(resp.data[i])
    }
    if (serialInfoList.value.length===0){
      ElMessage({
        type: 'error',
        message: '未找到设备',
      });
    }
    udidListLoading.value = false
  });
};

let activeTime = 0;
const idleCount = ref(0);

const udidListLoading = ref(true)
onMounted(() => {
  getAndroidDeviceList()
  // initTerminalWebsocket()

  store.commit('autoChangeCollapse');
  window.document.onmousedown = (event) => {
    idleCount.value = 0;
    activeTime = new Date().getTime();
  };
  window.document.onmousemove = (event) => {
    idleCount.value = 0;
    activeTime = new Date().getTime();
  };
});


const selectDeviceUdid = ref("")
const showCardMode = ref(0)
const udidInfo = ref({})
const infoLoading = ref(false)

const selectGroupDevices = () => {
  // MessageBox ('是否要移除勾选的群控设备？')
  ElMessageBox.confirm(
      '是否选择该设备？',
      $t('elements.warn'),
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    showCardMode.value = 1
    infoLoading.value = true
    axios.get("/android/serial/info", {params: {udid: selectDeviceUdid.value}}).then((resp) => {
      ElMessage({
        type: 'success',
        message: '成功',
      });
      currentUdid.value = selectDeviceUdid.value
      infoLoading.value = false;
      udidInfo.value = resp.data
    })
    refreshAppList()
  }).catch((err) => {
    ElMessage({
      type: 'info',
      message: '已取消',
    });
    selectDeviceUdid.value = ""
  })
}

const useScreenCall = () => {
  showCardMode.value = 2
  __Scrcpy = new Scrcpy({
    udid: selectDeviceUdid.value,
    socketURL: WSUri + `android/scrcpy`,
    node: 'scrcpy-video',
    onmessage: screenWebsocketOnmessage,
  });
  screenWebsocket = __Scrcpy.websocket;
}

const cancelTheCasting = () => {
  ElMessageBox.confirm(
      '取消投屏？',
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
    __Scrcpy.destroy()
    showCardMode.value = 1
  }).catch((err) => {
    ElMessage({
      type: 'info',
      message: '已取消',
    });
  })

}

const reSelectionDevice = () => {
  selectDeviceUdid.value = ""
  appList.value = [];
  currentUdid.value = ""
  showCardMode.value = 0
}

const currentTabName = 'perfTest'

</script>

<template>
  <div class="remote-header">
    <el-radio-group v-model="currentTabName">
      <el-radio-button label="perfTest" @click="router.replace('/')">性能测试</el-radio-button>
      <el-radio-button label="testReport" @click="router.replace('/report')">测试报告</el-radio-button>
    </el-radio-group>
  </div>
  <div style="padding: 20px">
    <el-row
        :gutter="24"
        @mouseup="lineMouseup"
        @mouseleave="lineMouseleave"
        @mousemove="lineMousemove"
    >
      <el-col
          :span="tabPosition == 'left' ? 12 : 24"
          :style="{
          flexBasis: tabPosition == 'left' ? layoutSplitInfo.left + '%' : '',
          maxWidth: tabPosition == 'left' ? layoutSplitInfo.left + '%' : '',
          transition: !isSplitPressing ? 'flex-basis 0.3s,max-width 0.3s' : '',
        }"
      >

        <el-card style="padding-bottom: 20px" v-show="0 === showCardMode" v-loading="udidListLoading">
          <el-col v-show="serialInfoList.length!==0" style="padding-left: 10px; padding-right: 10px; margin-top: 20px;"
                  v-for="item in serialInfoList"
                  :key="item.udid"
                  :value="item.udid"
          >
            <el-tooltip class="item" effect="dark" :content=" '产品:'+item.productDevice +' 型号:'+item.model"
                        placement="top">
              <el-radio v-model="selectDeviceUdid" @input="selectGroupDevices" :label="item.udid" border>
                设备{{ item.udid }}
              </el-radio>
            </el-tooltip>

          </el-col>
          <el-empty v-show="serialInfoList.length===0" description="not device!" >
            <el-button type="primary" @click="getAndroidDeviceList">刷新</el-button>
          </el-empty>
        </el-card>
        <!--        这里选择设备后再显示-->
        <device-info-card
            v-loading="infoLoading"
            v-show="1 === showCardMode"
            :device="udidInfo"
            @useScreenCall="useScreenCall"
            @reSelectionDevice="reSelectionDevice"
        />


        <el-card
            v-show="2 === showCardMode"
            :element-loading-text="$t('androidRemoteTS.code.preparingImager')"
            element-loading-background="rgba(255, 255, 255, 1)"
            style="font-size: 16px"
            :body-style="{
                    padding: '10px',
                    background: '#ccc',
                    position: 'relative',
                    minHeight: '340px',
                  }"
        >
          <template #header>
            <div style="position: relative; display: flex; align-items: center">
              <el-button size="mini" circle icon="el-icon-arrow-left" @click="cancelTheCasting"
                         style="margin-right: 15px"></el-button>
              <el-icon :size="16" style="vertical-align: middle">
                <Cellphone/>
              </el-icon>
              <RenderDeviceName
                  style="color: #e6a23c; margin-left: 5px"
                  :device="udidInfo"
              />
              <el-popover placement="bottom-end" width="270" trigger="hover">
                <el-form
                    v-show="2 === showCardMode"
                    label-position="left"
                    class="demo-table-expand"
                    label-width="90px"
                    style="margin-left: 10px; word-break: break-all"
                >
                  <el-form-item :label="$t('devices.detail.name')">
                    <span>{{ udidInfo.name }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('devices.detail.model')">
                    <span>{{ udidInfo['model'] }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('devices.detail.udId')">
                    <span>{{ udidInfo['udid'] }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('devices.form.system')">
                    <img
                        height="25"
                        style="
                                position: absolute;
                                top: 7px;
                                bottom: 7px;
                                left: 7px;
                              "
                        :src="
                                getImg(udidInfo['isHm'] === 1 ? 'HarmonyOs' : 'ANDROID')
                              "
                    />
                  </el-form-item>
                  <el-form-item
                      :label="$t('androidRemoteTS.code.systemVersion')"
                  >
                    <span>{{ udidInfo['version'] }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('devices.detail.size')">
                    <span>{{ udidInfo['size'] }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('devices.detail.cpu')">
                    <span>{{ udidInfo['cpu'] }}</span>
                  </el-form-item>
                  <el-form-item :label="$t('devices.filter.manufacturer')">
                    <img
                        height="25"
                        style="
                                position: absolute;
                                top: 7px;
                                bottom: 7px;
                                left: 7px;
                              "
                        :src="getImg(udidInfo['manufacturer'])"
                    />
                  </el-form-item>
                </el-form>
                <template #reference>
                  <div style="position: absolute; right: 0px; color: #909399">
                    <el-icon :size="15" style="vertical-align: middle">
                      <InfoFilled/>
                    </el-icon>
                  </div>
                </template>
              </el-popover>
            </div>
          </template>

          <!--          投屏-->
          <div style="margin-right: 40px; text-align: center">
            <div>
              <input
                  ref="inputBox"
                  v-model="inputValue"
                  class="input-box"
                  type="text"
                  :style="inputBoxStyle"
                  @input="changeInputHandle"
                  @keyup.delete="deleteInputHandle"
                  @keyup.enter="enterInputHandle"
              />
              <video
                  v-show="screenMode == 'Scrcpy'"
                  id="scrcpy-video"
                  style="display: inline-block; min-height: 100%"
                  :style="canvasRectInfo"
                  autoplay
                  muted
                  @mouseup="mouseup"
                  @mousemove="mousemove"
                  @mousedown="mousedown"
                  @mouseleave="mouseleave"
              />
              <canvas
                  v-show="screenMode != 'Scrcpy'"
                  id="canvas"
                  style="display: inline-block"
                  :style="canvasRectInfo"
                  @mouseup="mouseup"
                  @mousemove="mousemove"
                  @mousedown="mousedown"
                  @mouseleave="mouseleave"
              />
              <audio id="audio-player" hidden></audio>
            </div>
            <!--            三大金刚键-->
            <el-button-group id="pressKey">
              <el-button
                  size="small"
                  style="width: 25%"
                  type="info"
                  @click="pressKey(82)"
              >
                <el-icon :size="13" style="vertical-align: middle">
                  <Menu/>
                </el-icon>
              </el-button>
              <el-button
                  size="small"
                  style="width: 25%"
                  type="info"
                  @click="pressKey(187)"
              >
                <el-icon :size="13" style="vertical-align: middle">
                  <CopyDocument/>
                </el-icon>
              </el-button>
              <el-button
                  size="small"
                  style="width: 25%"
                  type="info"
                  @click="pressKey(3)"
              >
                <el-icon :size="13" style="vertical-align: middle">
                  <House/>
                </el-icon>
              </el-button>
              <el-button
                  size="small"
                  style="width: 25%"
                  type="info"
                  @click="pressKey(4)"
              >
                <el-icon :size="13" style="vertical-align: middle">
                  <Back/>
                </el-icon>
              </el-button>
            </el-button-group>
          </div>
          <!--一些细节按钮-->
          <div style="position: absolute; right: 5px; top: 10px">
            <el-tooltip
                :enterable="false"
                effect="dark"
                :content="$t('androidRemoteTS.code.frameNumber')"
                :placement="tabPosition == 'left' ? 'right' : 'left'"
                :offset="15"
            >
              <div>
                <el-dropdown
                    :hide-on-click="false"
                    trigger="click"
                    placement="right"
                    style="margin-top: 4px"
                >
                  <el-button size="small" type="info" circle>
                    <el-icon :size="12" style="vertical-align: middle">
                      <View/>
                    </el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu class="divider">
                      <el-radio-group
                          v-model="pic"
                          v-loading="loading"
                          size="mini"
                          @change="changePic"
                      >
                        <el-radio-button
                            :label="$t('androidRemoteTS.low')"
                        ></el-radio-button>
                        <el-radio-button
                            :label="$t('androidRemoteTS.middle')"
                        ></el-radio-button>
                        <el-radio-button
                            :label="$t('androidRemoteTS.high')"
                        ></el-radio-button>
                      </el-radio-group>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-tooltip>
            <el-tooltip
                effect="dark"
                :content="$t('androidRemoteTS.code.LUS')"
                :placement="tabPosition == 'left' ? 'right' : 'left'"
            >
              <div style="margin-top: 4px">
                <el-button
                    size="small"
                    type="primary"
                    circle
                    @click="pressKey(26)"
                >
                  <el-icon :size="12" style="vertical-align: middle">
                    <SwitchButton/>
                  </el-icon>
                </el-button>
              </div>
            </el-tooltip>
          </div>

        </el-card>

      </el-col>

      <div
          :class="{
          line: tabPosition == 'left',
          lineVertical: tabPosition == 'top',
        }"
          @mousedown="lineMousedown"
      />

      <el-col
          :span="tabPosition == 'left' ? 12 : 24"
          :style="{
          flexBasis:
            tabPosition == 'left'
              ? 100 - Number(layoutSplitInfo.left) + '%'
              : '',
          maxWidth:
            tabPosition == 'left'
              ? 100 - Number(layoutSplitInfo.left) + '%'
              : '',
        }"
      >
        <el-tabs
            v-model="activeTab"
            stretch
            class="remote-tab"
            :tab-position="tabPosition"
            @tab-click="switchTabs"
        >

          <el-tab-pane :label="$t('IOSRemote.perfmon')" name="perfmon">
            <android-perf
                ref="androidPerfRef"
                :app-list="appList"
                :udid="currentUdid"
                @start-perfmon="startPerfmon"
                @stop-perfmon="stopPerfmon"
            />
          </el-tab-pane>

          <el-tab-pane v-loading="terminalLoading" label="Terminal" name="terminal">
            <el-alert
                :title="$t('androidRemoteTS.code.precautions')"
                type="warning"
                :description="$t('androidRemoteTS.code.precautionsText')"
                show-icon
                :closable="false"
                style="margin-bottom: 10px"
            />
            <el-tabs stretch type="border-card">

              <el-tab-pane label="Shell">
                <el-card
                    style="border: 0px"
                    :body-style="{
                    color: '#FFFFFF',
                    backgroundColor: '#303133',
                    lineHeight: '1.5',
                  }"
                >
                  <el-scrollbar
                      ref="terScroll"
                      noresize
                      :native="true"
                      :style="'height:' + terminalHeight + 'px;min-height:450px'"
                  >
                    <div
                        v-for="c in cmdOutPut"
                        style="white-space: pre-wrap"
                        v-html="c"
                    ></div>
                  </el-scrollbar>
                  <div style="display: flex; margin-top: 10px">
                    <el-input
                        v-model="cmdInput"
                        size="mini"
                        :placeholder="$t('androidRemoteTS.code.inputSend')"
                        @keyup.enter="sendCmd"
                    >
                      <template #prepend>{{ cmdUser + ':/ $' }}</template>
                    </el-input>
                    <el-button
                        size="mini"
                        :disabled="cmdInput.length === 0 || !cmdIsDone"
                        style="margin-left: 5px"
                        type="primary"
                        @click="sendCmd"
                    >Send
                    </el-button>
                    <el-button
                        size="mini"
                        :disabled="cmdIsDone"
                        style="margin-left: 5px"
                        type="danger"
                        @click="stopCmd"
                    >Stop
                    </el-button>
                    <el-button
                        size="mini"
                        style="margin-left: 5px"
                        type="warning"
                        @click="clearCmd"
                    >Clear
                    </el-button>
                  </div>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="Logcat">
                <el-card
                    style="border: 0px"
                    :body-style="{
                    color: '#FFFFFF',
                    backgroundColor: '#303133',
                    lineHeight: '1.5',
                  }"
                >
                  <div style="display: flex; margin-bottom: 10px">
                    <el-select v-model="logcatFilter.level" size="mini">
                      <el-option label="VERBOSE" value="V"></el-option>
                      <el-option label="DEBUG" value="D"></el-option>
                      <el-option label="INFO" value="I"></el-option>
                      <el-option label="WARN" value="W"></el-option>
                      <el-option label="ERROR" value="E"></el-option>
                      <el-option label="FATAL" value="F"></el-option>
                      <el-option label="SILENT" value="S"></el-option>
                    </el-select>
                    <el-input
                        v-model="logcatFilter.filter"
                        style="margin-left: 5px"
                        size="mini"
                        :placeholder="$t('androidRemoteTS.code.enterInput')"
                    >
                      <template #prepend>| grep</template>
                    </el-input>
                    <el-button
                        size="mini"
                        style="margin-left: 5px"
                        type="primary"
                        @click="sendLogcat"
                    >Search
                    </el-button>
                    <el-button
                        size="mini"
                        style="margin-left: 5px"
                        type="danger"
                        @click="stopLogcat"
                    >Stop
                    </el-button>
                    <el-button
                        size="mini"
                        style="margin-left: 5px"
                        type="warning"
                        @click="clearLogcat"
                    >Clear
                    </el-button>
                  </div>
                  <el-scrollbar
                      ref="logcatScroll"
                      noresize
                      :style="'height:' + terminalHeight + 'px;min-height:450px'"
                  >
                    <div
                        v-for="l in logcatOutPut"
                        style="white-space: pre-wrap"
                        v-html="l"
                    ></div>
                  </el-scrollbar>
                </el-card>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <!--          可做可不做，做的话需要有opencv计算ssim-->
          <!--          <el-tab-pane label="过程耗时(可做可不做)" name="processTime">-->
          <!--          </el-tab-pane>-->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.line {
  width: 2px;
  height: inherit;
  background: #ccc;
  text-align: center;
  border-radius: 1px;
  margin-right: -2px;
  position: relative;
  z-index: 9;
  cursor: e-resize;

  &::after {
    content: '';
    position: absolute;
    top: 48%;
    left: -14px;
    display: block;
    width: 30px;
    height: 30px;
    background: url('@/assets/img/drag.png') no-repeat center;
    transform: rotate(90deg);
    background-size: 100% 100%;
  }
}

.lineVertical {
  width: 100%;
  height: 2px;
  background: #ccc;
  text-align: center;
  position: relative;
  cursor: n-resize;
  margin: 1em calc(16px);

  &::after {
    content: '';
    position: absolute;
    left: 48%;
    top: -14px;
    display: block;
    width: 30px;
    height: 30px;
    background: url('@/assets/img/drag.png') no-repeat center;
    background-size: 100% 100%;
  }
}

#debugPic {
  width: 100%;
  height: auto;
}

.url-install-box {
  position: relative;
  height: 100%;
}

.input-box {
  position: absolute;
  border: none;
  background-color: transparent;
  outline: none;
  z-index: -1;
  width: 1px;
}
</style>
