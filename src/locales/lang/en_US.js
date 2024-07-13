/**
 * EN language
 */
const suite = {
  name: "Suite Name",
  namePlace: "Please enter suite name",
  perf: "Performance Collection",
  interval: "Collection Interval",
  devicePlace:
    "Please select the test device, you can filter by model, note, Chinese name, or serial number",
  selectedCase: "Selected Cases",
};

const code = {
  placeholder: "Please select",
  settings: "Settings",
  temp: "Import Template",
  table: {
    name: "Search by name",
    lang: "Script Language",
    type: "Import Type",
    add: "Add",
    replace: "Replace",
  },
  tip: "Remember to save after editing",
};

const perf = {
  selectDeviceMess: "Would you like to select this device?",
  pleaseSelectApply: "Please select an application",
  perfTab: "Performance Test",
  reportTab: "Test Report",
  select:
    "(Optional) Click here to specify the performance of the monitored application process",
  start: "Start Monitoring",
  stop: "Stop Monitoring",
  clear: "Clear Data",
  singleCpu: "Single Core CPU Usage",
  totalCpu: "Total CPU Usage",
  memUsage: "Memory Usage",
  network: "Up and Down",
  procCpu: "Process CPU Usage",
  emptyData: "No Data Available",
  byteData: "Data Volume",
  selectTipPre: "This input box has two modes:",
  selectTipMid: "1. Enter the package name directly",
  selectTipEnd:
    "2. Specify the PID mode using :pid=(PID) , for example, :pid=0 to obtain the performance of the specified PID=0 process",
};

const elements = {
  warn: "Warning",
};

const devices = {
  currentApp: "currentApp",
  list: "Device List",
  form: {
    model: "Model",
    manufacturer: "Manufacturer",
    system: "System",
    battery: {
      level: "Battery Level",
      temperature: "Battery Temperature",
      voltage: "Charging Voltage",
    },
    testTime: "Test Time",
    testPackageName: "Test App",
    agent: "Location",
  },
  detail: {
    image: "Image",
    uploadImg: "Click to Upload",
    nickName: "Device Nickname",
    nickPlaceholder: "Enter device nickname information",
    name: "Name",
    model: "Model",
    udId: "Serial Number",
    size: "Screen Resolution",
    cpu: "CPU Type",
    pwd: "Installation Password",
    pwdPlaceholder: "Default is Sonic123456",
    operation: "Quick Operations",
    reboot: "Reboot",
    rebootTips: "Are you sure you want to reboot this device?",
    deleteTips: "Are you sure you want to delete this device?",
  },
  useRightNow: "Use Right Now",
  moreDetail: "More Information",
  deviceCenter: "Center",
  agentCenter: "Agent Center",
  status: {
    ONLINE: "Idle",
    DEBUGGING: "In Use",
    TESTING: "Testing",
    DISCONNECTED: "Disconnected",
    OFFLINE: "Offline",
    UNAUTHORIZED: "Unauthorized",
    ERROR: "Error",
  },
  filter: {
    all: "Select All",
    platform: {
      ANDROID: "Android",
      IOS: "iOS",
      HARMONY: "Harmony",
    },
    manufacturer: "Manufacturer",
    cpu: "CPU Processor",
    size: "Screen Resolution",
    agent: "Location",
    status: "Status",
    placeholder: "Enter model, device name, or device serial number to filter",
    button: "Advanced Filter",
  },
  refresh: "Auto Refresh",
  avgTem: "Current Average Battery Temperature:",
  hint: "Setting Tips",
  adTemperature: {
    temperature: "When device temperature ≥",
    height: "High Temperature Value",
    onlyAd: ", the robot will be notified for an alarm.",
    then: "Then, when",
    timeout: "High Temperature Timeout",
    continuedTime: "temperature persists for ≥",
    onlyAdNotice: ", the robot will be notified and",
    shutdown: "Shutdown",
  },
};
const layout = {
  languages: "Multiple languages",
};

const form = {
  save: "Save",
  unknown: "Unknown",
  notEmpty: "Cannot be empty!",
  confirm: "Confirm",
  cancel: "Cancel",
};

const report = {
  deleteMess: "Delete selected report?",
  delete: "Delete",
  down: "Download",
  comparison: "comparison",
  comparisonMode: "comparison mode",
  displaysTable: "displays table",
  displaysChart: "displays chart",
  selectReportMess: "Please enter report name",
  summary: {
    avgMemMess: "Average is:",
    maxMemMess: "Maximum value:",
    procAvgCPUUsage: "Average CPU usage of program",
    procMaxPss: "Program PSS peak value",
    AvgFPS: "Average FPS",
    sysCpuAvg: "Average system CPU",
    sysMaxAvg: "Peak value of system memory usage",
    fpsMess: "Average FPS of current test phase is:",
    jankMessPre: "Jank count for current test phase is",
    jankMessMid: ", with a maximum peak of per second:",
    jankMessEnd: ", and an average jank rate per second:",
    bigJankMessPre: "Big jank count for current test phase is",
    bigJankMessMid: ", with a maximum peak of per second:",
    bigJankMessEnd: ", and an average big jank rate per second:",
    procCPUMessPre: "Average CPU usage of current test program is:",
    procCPUMessEnd: "%, with a maximum peak of:",
    collectivitySysCpuPre: "Average overall CPU usage of current system is:",
    collectivitySysCpuEnd: "%, with a peak of:",
    sysCpuPre: "Average CPU usage is:",
    sysCpuEnd: "%, with a peak of:",
    procMemPre: "Average total PSS of current test program is:",
    procMemEnd: "MB, with a maximum peak of:",
    sysMemPre: "Average memory usage of current system programs is:",
    sysMemEnd: "MB, with a maximum peak of:",
    sysNetworkPre: "Upstream traffic is:",
    sysNetworkEnd: "MB, downstream traffic is:",
    sysTemperaturePre: "Peak temperature of current test phase system is:",
    sysTemperatureEnd: " ℃, with a difference from initial temperature:",
  },
};
const dialog = {
  welcome: "Welcome back!",
  permissionDenied: "Current user has no permission!",
  suffixError: "Incorrect file format!",
  projectInfo: "Project Information",
  agentInfo: "Agent Information",
  myInfo: "My Information",
  changePassword: "Change Password",
  copy: {
    success: "Copied successfully!",
    fail: "Copy failed!",
  },
  ready: "Backend is preparing... Please wait...",
  error: "System error!",
};
const androidRemoteTS = {
  useScreenCasting: "Use Screen Casting",
  reselectTheDevice: "Reselect the Device?",
  isUseScreen: "Is Use Screen?",
  cancelScreenMess: "Cancel screen casting?",
  noSelectDevice: "No device selected",
  perfmon: "Performance Monitoring",
  flushed: "Flushed",
  device: "Device",
  product: "Product",
  model: "Model",
  high: "High",
  middle: "Medium",
  low: "Low",
  loadIng: "Loading application list, please wait...",
  noWebSocket: "WebSocket not supported",
  connection: "Connection successful!",
  code: {
    LUS: "Lock/Unlock Screen",
    frameNumber: "Video quality",
    systemVersion: "System Version",
    preparingImager: "Preparing image...",
    precautions: "Precautions",
    precautionsText:
      "This feature is still in beta testing and risk commands such as reboot, rm, su are temporarily blocked",
    inputSend: "After entering the command, click Send or press Enter to send",
    enterInput: "Please enter input filter text",
  },
};
const indexIOSTS = {
  contentText: "Switch layout",
  successText: "Switch successful",
};
export default {
  message: {
    dialog,
    devices,
    layout,
    androidRemoteTS,
    indexIOSTS,
    perf,
    code,
    suite,
    report,
    form,
    elements,
  },
};
