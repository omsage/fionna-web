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
  VideoPause,
  Refresh,
  Connection,
  Place,
  Search,
  SwitchButton,
  Position,
  Pointer,
  Camera,
  Sunny,
  Phone,
  PhoneFilled,
  Minus,
  MuteNotification,
  Plus,
  CaretRight,
  CaretLeft,
  Operation,
  Cellphone,
  Menu,
  CopyDocument,
  House,
  Back,
  View,
  InfoFilled,
  Bell,
  Service,
  VideoCamera,
  Postcard,
} from '@element-plus/icons';

import {useI18n} from 'vue-i18n';

import RenderDeviceName from '../../components/RenderDeviceName.vue';
import Scrcpy from './Scrcpy';
import AndroidPerf from '../../components/AndroidPerf.vue';
import DeviceInfoCard from "@/components/DeviceInfoCard.vue";

const pocoPaneRef = ref(null);
const androidPerfRef = ref(null);
const {t: $t} = useI18n();

const {toClipboard} = useClipboard();
const route = useRoute();
const store = useStore();
const router = useRouter();
const wifiList = ref([]);
const currentWifi = ref('');
const isConnectWifi = ref(false);
const terminalHeight = ref(0);
const loading = ref(false);
const driverLoading = ref(false);
const appList = ref([]);
const device = ref({});
const agent = ref({});
const text = ref({content: ''});
let imgWidth = 0;
let imgHeight = 0;
// 旋转状态 // 0 90 180 270
const directionStatus = {
  value: -1,
};
let moveX = 0;
let moveY = 0;
let isFixTouch = false;
let isPress = false;
let loop = null;
let time = 0;
let isLongPress = false;
let mouseMoveTime = 0;
let touchWrapper = null;
const pic = ref('高');
const _screenMode = window.localStorage.getItem('screenMode');
const screenMode = ref(_screenMode || 'Scrcpy'); // Scrcpy,Minicap
const isDriverFinish = ref(false);
const project = ref(null);
const testCase = ref({});
const activeTab = ref('perfmon');
const activeTab2 = ref('step');
const stepLog = ref([]);
const debugLoading = ref(false);
const webViewListDetail = ref([]);
const title = ref('');
const webViewLoading = ref(false);
const cmdInput = ref('');
const cmdOutPut = ref([]);
const cmdUser = ref('');
const logcatOutPut = ref([]);
const terScroll = ref(null);
const logcatScroll = ref(null);
const cmdIsDone = ref(true);
const logcatFilter = ref({
  level: 'E',
  filter: '',
});
let oldBlob;
const element = ref({
  id: null,
  moduleId: 0,
  eleName: '',
  eleType: 'image',
  eleValue: '',
  projectId: 0,
});
const switchTabs = (e) => {
  if (e.props.name === 'proxy') {
    getWifiList();
  }
  if (e.props.name === 'apps' || e.props.name === 'perfmon') {
    if (appList.value.length === 0) {
      refreshAppList();
    }
  }
  if (e.props.name === 'terminal') {
    terminalHeight.value = document.getElementById('pressKey').offsetTop - 150;
  }
  if (e.props.name === 'webview') {
    if (webViewListDetail.value.length === 0) {
      getWebViewForward();
    }
  }
};
const startPerfmon = (bundleId) => {
  websocket.send(
      JSON.stringify({
        type: 'startPerfmon',
        bundleId,
      })
  );
};
const stopPerfmon = () => {
  websocket.send(
      JSON.stringify({
        type: 'stopPerfmon',
      })
  );
};
const img = import.meta.globEager('../../assets/img/*');
let websocket = null;
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
const openSocket = (host, port, key, udId) => {
  if ('WebSocket' in window) {
    //
    websocket = new WebSocket(
        `ws://${host}:${port}/websockets/android/${key}/${udId}/${localStorage.getItem(
            'SonicToken'
        )}`
    );
    //
    __Scrcpy = new Scrcpy({
      socketURL: `ws://${host}:${port}/websockets/android/screen/${key}/${udId}/${localStorage.getItem(
          'SonicToken'
      )}`,
      node: 'scrcpy-video',
      onmessage: screenWebsocketOnmessage,
      excuteMode: screenMode.value,
    });
    screenWebsocket = __Scrcpy.websocket;
    changeScreenMode(screenMode.value, 1);
    //
    terminalWebsocket = new WebSocket(
        `ws://${host}:${port}/websockets/android/terminal/${key}/${udId}/${localStorage.getItem(
            'SonicToken'
        )}`
    );
  } else {
    console.error($t('androidRemoteTS.noWebSocket'));
  }
  websocket.onmessage = websocketOnmessage;
  websocket.onclose = (e) => {
  };
  terminalWebsocket.onmessage = terminalWebsocketOnmessage;
  terminalWebsocket.onclose = (e) => {
  };
  driverLoading.value = true;
};
const sendLogcat = () => {
  terminalWebsocket.send(
      JSON.stringify({
        type: 'logcat',
        level: logcatFilter.value.level,
        filter: logcatFilter.value.filter,
      })
  );
};
const getWifiList = () => {
  terminalWebsocket.send(
      JSON.stringify({
        type: 'wifiList',
      })
  );
};
const clearLogcat = () => {
  logcatOutPut.value = [];
};
const stopLogcat = () => {
  terminalWebsocket.send(
      JSON.stringify({
        type: 'stopLogcat',
      })
  );
};
const sendCmd = () => {
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
          type: 'command',
          detail: cmdInput.value,
        })
    );
    cmdInput.value = '';
  }
};
const clearCmd = () => {
  cmdOutPut.value = [];
};
const stopCmd = () => {
  cmdIsDone.value = true;
  terminalWebsocket.send(
      JSON.stringify({
        type: 'stopCmd',
      })
  );
};
const terminalWebsocketOnmessage = (message) => {
  switch (JSON.parse(message.data).msg) {
    case 'wifiListDetail': {
      isConnectWifi.value = JSON.parse(message.data).detail.isConnectWifi;
      currentWifi.value = JSON.parse(message.data).detail.connectedWifi.SSID;
      break;
    }
    case 'appListDetail': {
      appList.value.push(JSON.parse(message.data).detail);
      break;
    }
    case 'logcat':
      logcatOutPut.value.push($t('androidRemoteTS.connection'));
      break;
    case 'logcatResp':
      logcatOutPut.value.push(
          JSON.parse(message.data)
              .detail.replace(/ I /g, "<span style='color: #0d84ff'> I </span>")
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
    case 'terminal':
      cmdUser.value = JSON.parse(message.data).user;
      cmdOutPut.value.push($t('androidRemoteTS.connection'));
      break;
    case 'terResp':
      cmdOutPut.value.push(JSON.parse(message.data).detail);
      nextTick(() => {
        terScroll.value.wrap.scrollTop = terScroll.value.wrap.scrollHeight;
      });
      break;
    case 'terDone':
      cmdIsDone.value = true;
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
  if (typeof message.data === 'object') {
    oldBlob = message.data;
    const blob = new Blob([message.data], {type: 'image/jpeg'});
    const URL = window.URL || window.webkitURL;
    const img = new Image();
    const canvas = document.getElementById('canvas');
    const g = canvas.getContext('2d');
    img.onload = function () {
      // 不根据按钮组，使用数据源的分辨率点对点
      const {width} = img;
      const {height} = img;
      canvas.width = width;
      canvas.height = height;
      g.drawImage(img, 0, 0, width, height);
    };
    const u = URL.createObjectURL(blob);
    img.src = u;
  } else {
    switch (JSON.parse(message.data).msg) {
      case 'rotation': {
        if (directionStatus.value !== -1) {
          loading.value = true;
          ElMessage.success({
            message: $t('androidRemoteTS.messageOne'),
          });
        }
        directionStatus.value = JSON.parse(message.data).value; // TODO
        // 旋转需要重置一下jmuxer
        if (screenMode.value == 'Scrcpy') {
          // 重置播放器
          __Scrcpy.jmuxer && __Scrcpy.jmuxer.reset();
        }
        break;
      }
      case 'support': {
        ElMessage.error({
          message: JSON.parse(message.data).text,
        });
        loading.value = false;
        break;
      }
      case 'size': {
        imgWidth = JSON.parse(message.data).width;
        imgHeight = JSON.parse(message.data).height;
        loading.value = false;
        pocoPaneRef.value.setSize(
            JSON.parse(message.data).width,
            JSON.parse(message.data).height
        );
        break;
      }
      case 'picFinish': {
        loading.value = false;
        break;
      }
      case 'error':
        ElMessage.error({
          message: $t('androidRemoteTS.systemException'),
        });
        close();
        break;
    }
  }
};
const websocketOnmessage = (message) => {
  switch (JSON.parse(message.data).msg) {
    case 'perfDetail':
      androidPerfRef.value.setData(JSON.parse(message.data).detail);
      break;
    case 'paste': {
      paste.value = JSON.parse(message.data).detail;
      ElMessage.success({
        message: $t('IOSRemote.clipboard.text'),
      });
      break;
    }
    case 'step': {
      setStepLog(JSON.parse(message.data));
      break;
    }
    case 'status': {
      debugLoading.value = false;
      ElMessage.info({
        message: $t('androidRemoteTS.runOver'),
      });
      break;
    }
    case 'forwardView': {
      webViewLoading.value = false;
      ElMessage.success({
        message: $t('androidRemoteTS.getSuccess'),
      });
      webViewListDetail.value = JSON.parse(message.data).detail;
      break;
    }
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
const paste = ref('');
const changeInputHandle = () => {
  if (inputValue.value) {
    websocket.send(
        JSON.stringify({
          type: 'text',
          detail: inputValue.value,
        })
    );
    inputValue.value = '';
  }
};
const deleteInputHandle = () => {
  websocket.send(
      JSON.stringify({
        type: 'text',
        detail: 'CODE_AC_BACK',
      })
  );
};
const setPasteboard = (text) => {
  websocket.send(
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
  websocket.send(
      JSON.stringify({
        type: 'getPasteboard',
      })
  );
};
const enterInputHandle = () => {
  websocket.send(
      JSON.stringify({
        type: 'text',
        detail: 'CODE_AC_ENTER',
      })
  );
};
const openDriver = () => {
  driverLoading.value = true;
  websocket.send(
      JSON.stringify({
        type: 'debug',
        detail: 'openDriver',
      })
  );
};
const closeDriver = () => {
  isDriverFinish.value = false;
  websocket.send(
      JSON.stringify({
        type: 'debug',
        detail: 'closeDriver',
      })
  );
  ElMessage.success({
    message: $t('androidRemoteTS.code.closeDriverMessage'),
  });
};
const getCurLocation = () => {
  let x;
  let y;
  let _x;
  let _y;
  const canvas = touchWrapper;
  const rect = canvas.getBoundingClientRect();
  if (directionStatus.value != 0 && directionStatus.value != 180) {
    // 左右旋转
    _x = parseInt(
        (event.clientY - rect.top) * (imgWidth / canvas.clientHeight)
    );
    //
    _y = parseInt(
        (event.clientX - rect.left) * (imgHeight / canvas.clientWidth)
    );
    x = directionStatus.value == 90 ? imgWidth - _x : _x - imgWidth * 3;
    y = directionStatus.value == 90 ? _y : -_y;
  } else {
    _x = parseInt(
        (event.clientX - rect.left) * (imgWidth / canvas.clientWidth)
    );
    x = directionStatus.value == 180 ? imgWidth - _x : _x;
    //
    _y = parseInt(
        (event.clientY - rect.top) * (imgHeight / canvas.clientHeight)
    );
    y = directionStatus.value == 180 ? imgHeight - _y : _y;
  }
  inputBoxStyle.value = {
    left: `${event.clientX - rect.left}px`,
    top: `${event.clientY - rect.top}px`,
  };
  return {
    x,
    y,
  };
};
const getCurLocationForAdb = () => {
  let x;
  let y;
  let _x;
  let _y;
  const canvas = touchWrapper;
  const rect = canvas.getBoundingClientRect();
  if (directionStatus.value != 0 && directionStatus.value != 180) {
    // 左右旋转
    _x = parseInt(
        (event.clientY - rect.top) * (imgWidth / canvas.clientHeight)
    );
    _y = parseInt(
        (event.clientX - rect.left) * (imgHeight / canvas.clientWidth)
    );
    x = _y;
    y = _x;
  } else {
    _x = parseInt(
        (event.clientX - rect.left) * (imgWidth / canvas.clientWidth)
    );
    x = directionStatus.value == 180 ? imgWidth - _x : _x;
    //
    _y = parseInt(
        (event.clientY - rect.top) * (imgHeight / canvas.clientHeight)
    );
    y = directionStatus.value == 180 ? imgHeight - _y : _y;
  }
  inputBoxStyle.value = {
    left: `${event.clientX - rect.left}px`,
    top: `${event.clientY - rect.top}px`,
  };
  return {
    x,
    y,
  };
};
const mouseup = (event) => {
  if (!isFixTouch) {
    if (isPress) {
      isPress = false;
      websocket.send(
          JSON.stringify({
            type: 'touch',
            detail: 'up\n',
          })
      );
      inputBox.value.focus();
    }
  } else {
    clearInterval(loop);
    time = 0;
    const {x, y} = getCurLocationForAdb();
    if (moveX === x && moveY === y) {
      if (!isLongPress) {
        websocket.send(
            JSON.stringify({
              type: 'debug',
              detail: 'tap',
              point: `${x},${y}`,
            })
        );
        inputBox.value.focus();
      }
    } else {
      websocket.send(
          JSON.stringify({
            type: 'debug',
            detail: 'swipe',
            pointA: `${moveX},${moveY}`,
            pointB: `${x},${y}`,
          })
      );
      inputBox.value.focus();
    }
    isLongPress = false;
  }
};
const mouseleave = () => {
  if (isFixTouch) {
    clearInterval(loop);
    isLongPress = false;
  } else if (isPress) {
    isPress = false;
    websocket.send(
        JSON.stringify({
          type: 'touch',
          detail: 'up\n',
        })
    );
  }
};
const mousedown = (event) => {
  if (!isFixTouch) {
    // 安卓高版本
    const {x, y} = getCurLocation();
    isPress = true;
    websocket.send(
        JSON.stringify({
          type: 'touch',
          detail: `down ${x} ${y}\n`,
        })
    );
  } else {
    const {x, y} = getCurLocationForAdb();
    moveX = x;
    moveY = y;
    clearInterval(loop);
    loop = setInterval(() => {
      time += 500;
      if (time >= 1000 && isLongPress === false) {
        websocket.send(
            JSON.stringify({
              type: 'debug',
              detail: 'longPress',
              point: `${moveX},${moveY}`,
            })
        );
        isLongPress = true;
      }
    }, 500);
  }
};
const mousemove = (event) => {
  if (!isFixTouch) {
    if (isPress) {
      if (mouseMoveTime < 1) {
        mouseMoveTime++;
      } else {
        const {x, y} = getCurLocation();
        websocket.send(
            JSON.stringify({
              type: 'touch',
              detail: `move ${x} ${y}\n`,
            })
        );
        mouseMoveTime = 0;
      }
    }
  }
};
const findElementByPoint = (ele, x, y) => {
  const result = [];
  for (const i in ele) {
    const eleStartX = ele[i].detail.bStart.substring(
        0,
        ele[i].detail.bStart.indexOf(',')
    );
    const eleStartY = ele[i].detail.bStart.substring(
        ele[i].detail.bStart.indexOf(',') + 1
    );
    const eleEndX = ele[i].detail.bEnd.substring(
        0,
        ele[i].detail.bEnd.indexOf(',')
    );
    const eleEndY = ele[i].detail.bEnd.substring(
        ele[i].detail.bEnd.indexOf(',') + 1
    );
    if (x >= eleStartX && x <= eleEndX && y >= eleStartY && y <= eleEndY) {
      result.push({
        ele: ele[i],
        size: (eleEndY - eleStartY) * (eleEndX - eleStartX),
      });
    }
    if (ele[i].children) {
      const childrenResult = findElementByPoint(ele[i].children, x, y);
      if (childrenResult.length > 0) {
        result.push.apply(result, childrenResult);
      }
    }
  }
  return result;
};

const openApp = (pkg) => {
  websocket.send(
      JSON.stringify({
        type: 'debug',
        detail: 'openApp',
        pkg,
      })
  );
};
const killApp = (pkg) => {
  websocket.send(
      JSON.stringify({
        type: 'debug',
        detail: 'killApp',
        pkg,
      })
  );
  ElMessage.success({
    message: $t('androidRemoteTS.code.killMsg'),
  });
};
const refreshAppList = () => {
  appList.value = [];
  ElMessage.success({
    message: $t('androidRemoteTS.loadIng'),
  });
  terminalWebsocket.send(
      JSON.stringify({
        type: 'appList',
      })
  );
};
const clearProxy = () => {
  ElMessage.success({
    message: $t('androidRemoteTS.messageTwo'),
  });
  websocket.send(
      JSON.stringify({
        type: 'clearProxy',
      })
  );
};
const uninstallApp = (pkg) => {
  ElMessage.success({
    message: $t('androidRemoteTS.startUninstall'),
  });
  websocket.send(
      JSON.stringify({
        type: 'uninstallApp',
        detail: pkg,
      })
  );
};
const setStepLog = (data) => {
  stepLog.value.push(data);
};
const runStep = () => {
  debugLoading.value = true;
  activeTab2.value = 'log';
  websocket.send(
      JSON.stringify({
        type: 'debug',
        detail: 'runStep',
        caseId: testCase.value.id,
        pwd: device.value.password,
      })
  );
};
const stopStep = () => {
  debugLoading.value = false;
  websocket.send(
      JSON.stringify({
        type: 'debug',
        detail: 'stopStep',
        udId: device.value.udId,
        caseId: testCase.value.id,
        pf: device.value.platform,
      })
  );
};
const pressKey = (keyNum) => {
  websocket.send(
      JSON.stringify({
        type: 'keyEvent',
        detail: keyNum,
      })
  );
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
const changeScreenMode = (type, isInit) => {
  if (isInit !== 1) {
    loading.value = true;
    __Scrcpy.switchMode(type);
    screenMode.value = type;
    oldBlob = undefined;
  }
  if (type === 'Minicap') {
    touchWrapper = document.getElementById('canvas');
  } else {
    oldBlob = undefined; // 清除记录
    touchWrapper = document.getElementById('scrcpy-video');
  }
  // 储存最后模式
  window.localStorage.setItem('screenMode', type);
};
const scan = (url) => {
  websocket.send(
      JSON.stringify({
        type: 'scan',
        url,
      })
  );
};
const startKeyboard = () => {
  websocket.send(
      JSON.stringify({
        type: 'startKeyboard',
      })
  );
};
const stopKeyboard = () => {
  websocket.send(
      JSON.stringify({
        type: 'stopKeyboard',
      })
  );
};
const close = () => {
  if (websocket !== null) {
    websocket.close();
    websocket = null;
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
  window.close();
};
onBeforeUnmount(() => {
  close();
});
const getDeviceById = (id) => {
  loading.value = true;
  axios.get('/controller/devices', {params: {id}}).then((resp) => {
    if (resp.code === 2000) {
      device.value = resp.data;
      if (device.value.status !== 'ONLINE') {
        ElMessage.error({
          message: $t('androidRemoteTS.deviceFail'),
        });
        router.replace('/Index/Devices');
        return;
      }
      axios
          .get('/controller/agents', {params: {id: device.value.agentId}})
          .then((resp) => {
            if (resp.code === 2000) {
              agent.value = resp.data;
              openSocket(
                  agent.value.host,
                  agent.value.port,
                  agent.value.secretKey,
                  device.value.udId
              );
            }
          });
    }
  });
};
const getProjectList = () => {
  axios.get('/controller/projects/list').then((resp) => {
    store.commit('saveProjectList', resp.data);
  });
};

const udidList = ref([])
const getAndroidDeviceList = () => {
  axios.get('/android/serial/list').then((resp) => {
    for (let i in resp.data) {
      udidList.value.push(resp.data[i])
    }
    udidListLoading.value = false
  });
};

let activeTime = 0;
const idleCount = ref(0);

const udidListLoading = ref(true)
onMounted(() => {
  getAndroidDeviceList()

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
const remoteTimeout = ref(0);
const ticker = ref(0);


const deviceSelected = ref(false)
const selectDeviceUdid = ref("")
const showCardMode = ref(0)
const udidInfo = ref({})
const infoLoading = ref(false)

watch(selectDeviceUdid, (selectDeviceUdid) => {
  if (selectDeviceUdid !== "") {
    deviceSelected.value = true
  }
})

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
      infoLoading.value = false;
      udidInfo.value = resp.data
    })
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
          <el-col style="padding-left: 10px; padding-right: 10px; margin-top: 20px;"
                  v-for="item in udidList"
                  :key="item"
                  :value="item"
          >
            <el-radio v-model="selectDeviceUdid" @input="selectGroupDevices" :label="item" border>
              设备{{ item }}
            </el-radio>
          </el-col>
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
                :content="$t('androidRemoteTS.code.projectionMode')"
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
                      <VideoCamera/>
                    </el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu class="divider">
                      <el-radio-group
                          v-model="screenMode"
                          v-loading="loading"
                          size="mini"
                          @change="changeScreenMode"
                      >
                        <el-radio-button label="Scrcpy"></el-radio-button>
                        <el-radio-button label="Minicap"></el-radio-button>
                      </el-radio-group>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-tooltip>
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
                @start-perfmon="startPerfmon"
                @stop-perfmon="stopPerfmon"
            />
          </el-tab-pane>
          <el-tab-pane label="Terminal" name="terminal">
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
          <el-tab-pane label="过程耗时(可做可不做)" name="processTime">
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
