/**
 * ZH_TW language
 */
const element = {
  currentIteration: '当前迭代控件',
  modelFilter: '模块筛选',
  nameFilter: '已选控件',
  namePlace: '可输入控件名称筛选',
  iterationList: '迭代控件列表',
  whenList: '当父级步骤存在',
  thenList: '时，可选择本控件作为',
  last: ' 进行操作',
  paramTip: '需要临时变量或全局变量时，可以添加 双花括号包含变量名 的形式',
  name: '控件名称',
  nameMsg: '请输入控件元素名称',
  type: '定位类型',
  typePlace: '请选择定位类型',
  deviceType: '移动端常用定位方式',
  specType: '特殊定位方式',
  point: '坐标（支持相对坐标）',
  poco: 'POCO（仅支持游戏控件）',
  image: '图片',
  webViewType: 'WebView常用定位方式',
  value: '控件元素值',
  valuePlace: '请输入控件元素值',
  model: '所属模块',
  modelPlace: '请选择模块',
};
const suite = {
  name: '套件名称',
  namePlace: '请填写套件名称',
  perf: '性能采集',
  interval: '采集间隔',
  devicePlace: '请选择测试设备，可输入型号、备注、中文名称、序列号筛选',
  selectedCase: '已选用例',
};
const testcase = {
  info: '用例信息',
  namePlace: '输入用例名称搜索',
  model: '模块名称',
  version: '版本名称',
  designer: '设计人',
  editTime: '最后修改日期',
  deleteTip: '确定删除该用例吗？用例下的步骤将移出该用例',
  name: '用例名称',
  nameMsg: '请填写用例名称',
  project: '所属项目',
  projectPlace: '请选择项目',
  platform: '平台',
  platformPlace: '请选择平台',
  modelLabel: '模块',
  modelPlace: '请选择模块',
  versionLabel: '版本',
  versionPlace: '请选择版本',
  des: '用例描述',
  desPlace: '输入用例描述',
  empty: '暂无用例',
  add: '马上添加',
  list: '用例列表',
};
const pubSteps = {
  pList: '公共步骤列表',
  alertOne: '该步骤已存在于以下公共步骤中！',
  alertTwo: '选择【仅移出本用例】后，步骤从本用例删除，不影响以下公共步骤。',
  alertThree:
    '选择【彻底删除】后，本步骤从本用例删除，并且从以下公共步骤中删除本步骤。',
  resetCaseId: '仅移出本用例',
  deleteReal: '彻底删除',
  auto: '自动保存中...',
  selectPass: '选择成功！已加入到已选步骤',
  removePass: '移出成功！',
  stepInfo: '步骤信息',
  name: '公共步骤名称',
  nameMsg: '公共步骤名称不能为空',
  namePlace: '请输入公共步骤名称',
  platform: '平台',
  platformPlace: '请选择平台',
  stepTip: '保存后即可编辑已选步骤',
  selected: '已选步骤',
  list: '步骤列表',
  listTip: '从此处添加或编辑步骤，并加入到已选步骤中',
  addStep: '添加步骤',
  searchPlace: '按照控件元素名称搜索',
  search: '搜索',
  case: '所属用例Id',
  deleteCaseTip: '确定彻底删除该步骤吗？',
  goToCase: '前往用例详情',
  goToCaseTip: '该步骤存在于用例中，删除前需前往用例详情移出！',
};
const steps = {
  step: '步骤',
  cases: '所属用例：',
  empty: '暂无步骤',
  remove: '确定移除该步骤吗？',
  run: '开始运行',
  forceStep: '强制终止',
  clear: '清空',
  status: '状态',
  time: '时间',
  detail: '步骤详情',
  script: '点击展开/收起脚本',
  running: '运行中',
  done: '运行完毕',
  loading: '加载中',
  loadDone: '加载完毕',
  loadMore: '加载更多',
  copyStepTips: '确定复制该步骤吗？点击周围空白处取消',
  copyToNextLine: '复制到当前行',
  copyToLastLine: '复制到最后行',
  addStepTips: '选择添加步骤的位置，点击周围空白处取消',
  addToNextLine: '添加到下一行',
  addToBeforeLine: '添加到上一行',
};
const code = {
  placeholder: '请选择',
  settings: '设置',
  temp: '导入模板',
  table: {
    name: '输入名称搜索',
    lang: '脚本语言',
    type: '导入方式',
    add: '追加',
    replace: '替换',
  },
  tip: '编辑后记得保存哦',
};
const token = {
  day: '过期天数',
  result: '生成结果',
  click: '(请点击复制)',
  copy: '点击确定后在此处复制',
};
const project = {
  logo: '项目Logo',
  name: '项目名称',
  nameMessage: '项目名称不能为空',
  namePlace: '请输入项目名',
  des: '项目描述',
  desPlace: '请输入项目描述',
  delete: '删除项目',
  deleteConfirmMsg: '确定删除这个项目吗？',
  deleteConfirmMsgDes: '项目包含的所有信息将一并删除！',
};
const perf = {
  select: '(可选) 点此可指定监听应用Process性能',
  start: '开始监控',
  stop: '停止监控',
  clear: '清空数据',
  singleCpu: 'CPU单核使用率',
  totalCpu: 'CPU总使用率',
  memUsage: '内存占用',
  network: '上下行',
  procCpu: 'CPU使用率',
  emptyData: '暂无数据',
  byteData: '数据量',
};
const script = {
  name: '模板名称',
  namePlace: '请填写模板名称',
  info: '模板信息',
  add: '新增模板',
  typeSearch: '输入名称搜索',
  lang: '脚本语言',
  deleteMsg: '确定删除该脚本模板吗？',
};
const robot = {
  robotType: '機器人類型',
  robotTypePlaceholder: '請選擇機器人類型',
  robotToken: 'WebHook',
  robotTokenPlaceholder: '請輸入群機器人的WebHook',
  robotSecret: 'Secret',
  robotSecretPlaceholder: '（可選）請輸入群機器人的金鑰',
};
const agent = {
  hub: {
    config: 'Hub配置',
    info: '設備信息',
    voltage: '電量',
    temperature: '溫度',
    action: '操作',
    switch: '切換',
    status: '號USB口未接入設備',
    relate: '關聯',
    poweron: '通電',
    poweroff: '斷電',
    allpoweron: '全部開機',
    allpoweroff: '全部關機',
  },
  newAgent: '新增Agent',
  clickToCopy: '點擊複製',
  status: {
    name: '狀態',
    online: '線上',
    offline: '離線',
    s2ae: 'S2AE',
  },
  system: '運行系統',
  version: '運行版本',
  operation: '快捷操作',
  shutdown: '終止運行',
  edit: {
    name: 'Agent名稱',
    highTemp: '高溫值',
    highTempTime: '高溫超時',
    rule: 'Agent名稱不能空白',
    namePlaceholder: '請輸入Agent名稱',
  },
};
const devices = {
  title: 'Sonic雲真機平台',
  list: '設備清單',
  form: {
    model: '設備型號',
    manufacturer: '製造商',
    system: '設備系統',
    battery: {
      level: '電池電量',
      temperature: '電池溫度',
      voltage: '充电电压',
    },
    agent: '所在位置',
  },
  detail: {
    image: '設備圖片',
    uploadImg: '點擊上傳',
    nickName: '設備備註',
    nickPlaceholder: '輸入裝置備註信息',
    name: '設備名稱',
    model: '設備型號',
    udId: '設備序號',
    size: '螢幕解析度',
    cpu: 'CPU類型',
    pwd: '安裝密碼',
    pwdPlaceholder: '默認為Sonic123456',
    operation: '快捷操作',
    reboot: '重啟',
    rebootTips: '確定重啟該設備嗎？',
    deleteTips: '確定刪除該設備嗎？',
  },
  useRightNow: '馬上使用',
  moreDetail: '更多資訊',
  deviceCenter: '設備中心',
  agentCenter: 'Agent中心',
  status: {
    ONLINE: '空閒中',
    DEBUGGING: '佔用中',
    TESTING: '測試中',
    DISCONNECTED: '已斷開',
    OFFLINE: '已離線',
    UNAUTHORIZED: '未授權',
    ERROR: '異常中',
  },
  filter: {
    all: '全選',
    platform: {
      ANDROID: '安卓系統',
      IOS: 'iOS系統',
      HARMONY: '鴻蒙系統',
    },
    manufacturer: '設備製造商',
    cpu: 'CPU處理器',
    size: '螢幕解析度',
    agent: '所在位置',
    status: '設備狀態',
    placeholder: '請輸入要篩選的型號、設備名稱或設備序號',
    button: '高級篩選',
  },
  refresh: '自動刷新',
  avgTem: '當前平均電池溫度：',
  hint: '設置提示',
  adTemperature: {
    temperature: '當設備溫度≥',
    height: '高溫值',
    onlyAd: '時，會通知機器人告警。',
    then: '當',
    timeout: '高溫超時',
    continuedTime: '時間內溫度持續≥',
    onlyAdNotice: '時，會通知機器人並',
    shutdown: '關機',
  },
};
// 佈局相關
const layout = {
  // header
  theme: '當前主題：',
  languages: '多語言',
  deviceCenter: '設備中心',
  myInfo: '我的資訊',
  changePassword: '修改密碼',
  signOut: '登出',
  aboutSonic: '關於Sonic',
  backHome: '回到首頁',
  welcomeSpeech: '歡迎來到Sonic雲真機測試平台，請選擇項目進入',
  addProject: '新增項目',
  officialWebSite: 'Sonic官方網站',
  document: '使用文档',
  versionUpdateRecord: '版本更新記錄',
};
// 表單相關
const form = {
  save: '保存',
  unknown: '未知',
  notEmpty: '不能空白！',
  differentInput: '兩次輸入不一致！',
  username: '用戶名',
  role: '角色',
  testEngineer: '測試工程師',
  developmentEngineer: '開發工程師',
  oldPasswordNotEmpty: '舊密碼不能空白',
  oldPassword: '舊密碼',
  inputOldPassword: '請輸入舊密碼',
  newPasswordNotEmpty: '新密碼不能空白',
  newPassword: '新密碼',
  inputNewPassword: '請輸入新密碼',
  inputNewPasswordAgain: '請再次輸入新密碼',
  confirm: '確定',
  cancel: '取消',
};
// 彈出型視窗相關
const dialog = {
  welcome: '歡迎回來！',
  permissionDenied: '暫不許可當前用戶！',
  suffixError: '檔案格式有誤！',
  projectInfo: '專案資訊',
  agentInfo: 'Agent資訊',
  myInfo: '我的資訊',
  changePassword: '修改密碼',
  copy: {
    success: '複製成功！',
    fail: '複製失敗！',
  },
  ready: '后台准备中...请稍后...',
  error: '系统出错了！',
};
// 一般操作
const common = {
  release: '超時後將自動解除佔用',
  releaseTip: '确定强制解除该设备占用状态吗？',
  at: '在 ',
  hour: '时',
  min: '分',
  sec: '秒',
  null: '無',
  delete: '刪除',
  edit: '編輯',
  operate: '操作',
  copy: '複製',
  inuse: '已使用',
  inidle: '已閒置',
};
// 路由
const routes = {
  login: '登入',
  home: '首頁',
  deviceCenter: '設備中心',
  remoteControl: '遠端控制',
  androidTestCase: '安卓測試案例',
  iosTestCase: 'iOS測試案例',
  operateSteps: '操作步驟',
  testSuite: '測試套件',
  testResult: '測試結果',
  reportDetails: '報告詳情',
  publicSteps: '公共步驟',
  controlElement: '控件元素',
  globalParameter: '全域參數',
  moduleManage: '模組管理',
  versionIteration: '版本反覆運算',
  timedTask: '定時任務',
  projectSetting: '項目設定',
  projectPage: '項目首頁',
  resource: '资源管理',
  role: '角色管理',
  users: '用户配置',
  sysJobs: '系统定时任务',
  remoteSettings: '远程控制配置',
  scripts: '脚本模板',
};
const setting = {
  title: 'Manage Center',
};
const androidTestCase = {
  addCase: '添加案例',
};
const elements = {
  eleInfo: '控件元素資訊',
  stepInfo: '步驟資訊',
  warn: '警告',
  warnInfo:
    '該控件已存在於以下步驟中，删除該控件後會影響以下步驟！ 請删除後前往對應步驟修改控件或確認對應步驟已廢棄！',
  stepList: {
    stepId: '步驟Id',
    useCaseId: '所屬案例Id',
    userCaseName: '所屬案例名稱',
    noCase: '無所屬案例',
  },
  sureDelete: '確認刪除',
  addElement: '添加控件元素',
  controlId: '控件id',
  inputNameSearch: '輸入元素控件名稱搜索',
  moduleName: '模組名稱',
  targetingType: '定位類型',
  coordinate: '座標',
  picture: '圖片',
  notSpecified: '未指定',
  cEleValue: '控件元素值',
  inputKeySearch: '輸入控件元素值搜索',
  sureDelInfo: '確定刪除該控件元素嗎?',
};
const globalParamsTs = {
  dialogVisible: {
    info: '全域參數資訊',
    specialUse: '特殊使用',
    messageInfo:
      "如有多個參數值可以用 '{'|'}' 號隔開，分配設備時會隨機分配，單次任務內參數值只會取同一個。【random】和【timestamp】參數已內置，可用作構造亂數據",
    keyName: '參數名',
    keyNameMessage: '參數名不能空白，建議使用英文',
    inputName: '請輸入參數名',
    valueName: '參數值',
    valueNameMessage: "參數值不能空白，多個可以用 '{'|'}' 號隔開",
    inputValue: "請輸入參數值，多個可以用 '{'|'}' 號隔開",
  },
  addGlobalParams: '添加全域參數',
  paramsList: {
    id: '參數id',
    name: '參數名',
    value: '參數值',
  },
  delMessage: '確定刪除該全域參數嗎?',
};
const homeTS = {
  projectOverview: '項目概況',
  testCaseManagement: '測試案例管理',
  testCase: {
    case: '測試案例',
    adCase: '安卓端測試案例',
    iosCase: 'iOS端測試案例',
  },
  testSuite: '測試套件',
  testDataManagement: '測試資料管理',
  testResults: '測試結果分析',
  setting: '持續整合設置',
  package: {
    mange: '安裝包管理',
    bulk: '批次裝包',
  },
  crashReport: 'Crash報告',
  projectSetting: {
    setting: '專案相關設置',
    mange: '模組管理',
    update: '版本反覆運算',
  },
};
const jobsTS = {
  dialogVisible: {
    message: '排程任務資訊',
    name: '任務名稱',
    nameIsNull: '任務名稱不能空白',
    inputName: '請輸入任務名稱',
    testSuiteIsNull: '測試套件不能空白',
    chooseTestSuite: '請選擇測試套件',
    cron: 'Cron表達式',
    cronIsNull: 'Cron表達式不能空白',
    inputCron: '請輸入Cron表達式',
  },
  addCron: '新增排程任務',
  whatCron: '什麼是Cron表達式？',
  cronNoNext: "N/A",
  cronInfo: {
    one: '* 第一位，表示秒，取值 0-59',
    two: '* 第二位，表示分，取值 0-59',
    three: '* 第三位，表示小時，取值 0-23',
    four: '* 第四位，日期，取值 1-31',
    five: '* 第五位，月份，取值 1-12',
    six: '* 第六位，星期幾，取值 1-7',
    seven: '* 第七位，年份，可以留空，取值 1970-2099',
    asterisk: '(*) 星號：可以理解為“每”的意思，每秒、每分',
    questionMark:
      '(?) 問號：只能出現在日期和星期這兩個位置，表示這個位置的值不確定',
    bar: '(-) 表達一個範圍，如在小時欄位中使用 10-12 ，表示從10點到12點',
    comma:
      '(,) 逗號，表達一個列表值，如在星期欄位中使用 1,2,4\n' +
      '，則表示星期一、星期二、星期四',
    slash:
      '(/) 斜線，如 x/y ，x是起始值，y是間隔時間，如在第一位(秒)使用\n' +
      '0/15，表示從0秒開始，每15秒',
    official: '官方解釋：',
    demoOne: '0 0 3 * * ? 每天 3 點執行',
    demoTwo: '0 5 3 * * ? 每天 3 點 5 分執行',
    demoThree: '0 5 3 ? * * 每天 3 點 5 分執行',
    demoFour:
      '0 5/10 3 * * ? 每天 3 點 5 分，15 分，25 分，35 分，45 分，55\n' +
      '分這幾個時間點執行',
    demoFive: '0 10 3 ? * 1 每週星期天的 3 點10 分執行，注：1 表示星期天',
    demoSix:
      '0 10 3 ? * 1#3 每個月的第三個星期的星期天執行，#號只能出現在星期的位置',
    hint: '注：第六位(星期幾)中的數位可能表達不太正確，可以使用英文縮寫來表示，如：Sun',
  },
  taskId: '任務id',
  run: '立即運行',
  del: '確定刪除該排程任務嗎？',
};
const loginTS = {
  testPlatform: '一站式雲真機測試平台',
  login: {
    message: '註冊帳號/LDAP網域帳號登入',
    register: '註冊帳號登錄',
    LDAPLogin: 'LDAP網域帳號登入',
  },
  user: {
    inputUserName: '請輸入帳戶名',
    inputPassword: '請輸入密碼',
    longin: '登入',
    register: '註冊',
  },
};
const modulesTS = {
  info: '模組資訊',
  name: '模組名稱',
  isNotNull: '模組名稱不能空白',
  inputName: '請輸入模組名稱',
  sure: '確定',
  add: '添加模組',
  del: '確定刪除該模組嗎?',
};
const packagesTS = {
  accessGuide: '存取指南',
  buildLink: '建立連結',
  platform: '平台',
  no: '未指定',
  packageName: '安裝包名稱',
  branch: '分支',
  inputName: '輸入分支名稱',
  downloadLink: '下載連結',
  copyUrl: '複製url',
  creatTime: '創立時間',
  updateTime: '更新時間',
};
const projectIndexTS = {
  code: {
    lastWeek: '最近一周',
    lastMonth: '最近一個月',
    lastThreeMonth: '最近三個月',
    day: '天',
    hour: '小時',
    minute: '分',
    second: '秒',
    runInfo: '運行情況總覽',
    unit: '單位(%)',
    passRate: '當天通過率',
    stateDis: '狀態分佈',
    other: '其他',
    pass: '通過',
    fail: '失敗',
  },
  page: {
    to: '至',
    startTime: '開始日期',
    endTime: '結束日期',
    caseTop5: '案例運行時長排行榜（Top 5）',
    caseId: '案例id',
    caseName: '案例名稱',
    timeLong: '時長',
    equipmentTop5: '設備運行時長排行榜（Top 5）',
    eqId: '設備型號',
    serialNumber: '序號',
  },
};
const publicStepTS = {
  info: '公共步驟資訊',
  add: '添加公共步驟',
  id: '公共步驟Id',
  name: '公共步驟名稱',
  platform: '平台',
  android: '安卓',
  list: '步驟清單',
  stepId: '步驟Id',
  useCase: '所屬案例',
  stepInfo: '步驟詳情',
  viewSteps: '查看步驟',
  sureDel: '確定刪除該公共步驟嗎?',
};
const resultDetailTS = {
  memoryInfo: '記憶體詳情',
  unit: '單位(KB)',
  battery: '電量詳情',
  memoryShort: '記憶體資料不足',
  batteryShort: '電量數據不足',
  performance: '性能資料不足',
  caseRun: '案例運行狀態分佈',
  noStart: '未開始',
  runIng: '運行中',
  caseStatus: '案例狀態',
  page: {
    reportInfo: '報告資訊',
    resultId: '結果Id',
    executeUser: '執行用戶',
    runStatus: '運行狀態',
    testPass: '測試通過',
    testFail: '測試失敗',
    testAlert: '測試警報',
    endTime: '結束時間',
    totalTime: '總耗時',
    runInfo: '運行資訊',
    total: '耗時',
    runLog: '運行日誌',
    performanceInfo: '性能資訊',
    runRecording: '運行錄影',
    onRecording: '暫無錄影',
  },
};
const ResultsTS = {
  name: '測試套件名稱',
  testReport: '測試報告',
  lookReport: '查看報告',
  interruptTest: '確定中斷本次測試嗎?',
  interrupt: '中斷',
  del: '確定刪除該測試報告嗎?',
};
const stepListViewTS = {
  caseInfo: '案例詳情',
  platformToBe: '所屬平台',
  module: '模組',
  versionName: '版本名稱',
  designer: '設計人',
  last: '最後修改日期',
  testMessage: '案例描述',
};
const testSuitesTS = {
  testStart: '測試已開始...',
  info: '測試套件資訊',
  add: '添加測試套件',
  id: '套件Id',
  searchMessage: '輸入測試套件名稱搜索',
  kitPlatform: '套件平台',
  coverType: '覆蓋類型',
  testCover: '案例覆蓋',
  deviceCover: '設備覆蓋',
  associated: '關聯設備',
  device: {
    id: '設備id',
  },
  viewList: '查看列表',
  associatedCase: '關聯案例',
  run: '運行',
  delMessage: '確定刪除該測試套件嗎？套件下的案例將移出該套件',
};
const versionsTS = {
  name: '名称',
  iteration: '版本反覆運算資訊',
  noNull: '版本名稱不能空白',
  inputName: '請輸入版本名稱',
  time: '時間',
  timeNoNull: '時間不能空白',
  selectTime: '選擇日期時間',
  addVersions: '添加版本反覆運算',
  delMessage: '確定刪除該版本嗎？',
};
const androidRemoteTS = {
  element: {
    windows: {
      single: '单窗口模式',
      multi: '多窗口模式',
    },
    visible: {
      hid: '隐藏Invisible控件',
      show: '显示Invisible控件',
    },
    unimportant: {
      ignore: '忽略不重要视图',
      show: '不忽略不重要视图',
    },
  },
  driverStatus: {
    success: '初始化 UIAutomator2 Server 完成！',
    fail: '初始化 UIAutomator2 Server 失败！',
  },
  repairedSuccess: '修復成功',
  associationSuccess: '關聯成功',
  copySuccess: '複製成功',
  copyFail: '複製失敗',
  noWebSocket: '不支持WebSocket',
  connection: '連接成功',
  systemException: '系統出現異常！已斷開遠端控制！',
  messageOne: '檢測到螢幕旋轉！請稍後...',
  getPocoSuccess: '獲取Poco控件成功！',
  getPocoFail: '獲取POCO控件失敗！請確保已經打開對應遊戲引擎並接入Poco-SDK',
  pullFile: {
    success: '拉取檔成功',
    fail: '拉取檔失敗',
  },
  pushFile: {
    success: '上傳檔成功！',
    fail: '上傳檔失敗！上傳目錄需要補齊檔名',
  },
  getEle: {
    success: '獲取原生控件元素成功！',
    fail: '獲取控件元素失敗！請重新獲取',
  },
  install: {
    success: '安裝成功!',
    fail: '安裝失敗!',
  },
  uninstall: {
    success: '卸載成功！',
    fail: '卸載失敗!',
  },
  runOver: '運行完畢',
  getSuccess: '獲取成功!',
  getPsSuccess: '獲取快照成功!',
  loadIng: '載入應用列表中，請稍後...',
  messageTwo: '已取消自動全域代理，請手動設定代理',
  startUninstall: '開始卸載！請稍後...',
  failErr: '檔案格式有誤！',
  addOne: '只能新增一個檔案！請先移除舊檔案',
  startInstall: '開始安裝！請稍後...',
  high: '高',
  middle: '中',
  low: '低',
  deviceFail: '該設備暫時不可使用!',
  remoteAudio: '遠端音頻已開啟，請勿重複操作！',
  audio: '遠端音頻廣播已連接!',
  audioFail: '遠端音頻廣播已斷開！',
  audioSuccess: '遠端音頻同步成功！',
  code: {
    elementsSnapshot: '控件元素快照',
    eleName: '控件元素名稱',
    eleNullName: '控件元素名稱不能空白',
    inputName: '請輸入控件元素名稱',
    saveEle: '保存為圖片元素',
    preparingImager: '準備圖像中...',
    systemVersion: '系統版本',
    projectionMode: '投屏模式',
    frameNumber: '投屏幀數',
    manualRepair: '手動修復',
    fixBlackScreen: '修復黑屏',
    fixTouch: '修復觸控',
    fixScreen: '修復橫豎屏',
    remoteAudioTran: '遠端音頻廣播',
    batterySimulation: '電池模擬',
    simulatePowerOutage: '模擬斷電',
    reset: '重置',
    physicalLookup: '實體查詢',
    BV: '亮度/音量',
    dial: '撥號',
    photograph: '拍照',
    browser: '瀏覽器',
    LUS: '鎖定/解鎖螢幕',
    remoteControlPanel: '遠控面板',
    inputText: '輸入文本',
    pleaseText: '請輸入要發送的文字，支援繁體中文',
    clear: '清空输入框',
    send: '发送',
    keyboard: '清空输入框与实时输入仅在Sonic输入法开启时可用',
    startKeyboard: '启动Sonic输入法',
    stopKeyboard: '禁用Sonic输入法',
    remoteADB: '遠端ADB',
    noAgent: '所在Agent未開啟該功能！',
    UIAutomator2ServerInit: '初始化UIAutomator2Server',
    closeDriver: '停止UIAutomator2Server',
    closeDriverMessage: '停止UIAutomator2Server成功！',
    automaticInitialization: '下次進入自動初始化',
    scanQRCode: '掃描二維碼',
    errTitle: 'OPPO、vivo部分機型上傳二維碼後不出現在相冊，需要重啟後生效',
    messageThree: '將二維碼圖片拖到此處，或',
    messageFour: '只能上傳jpg/png檔',
    fileTransfer: '文件互傳',
    upFile: '上傳文件',
    messageFive: '將文件拖到此處，或',
    pleaseFilePath: '請輸入上傳目標路徑（加上檔名）',
    filePath: '拉取文件',
    pullFilePath: '請輸入拉取目標路徑',
    installFile: '下載檔案',
    app: '應用程式',
    pushInstall: '上傳安裝',
    apkFile: '將APK文件拖到此處，或',
    onlyAPKFile: '只能上傳apk檔',
    URLInstall: 'URL安裝',
    linkInstall: '持續集成管理安裝',
    hintAssociatedProject: '該功能需要先從上方關聯項目',
    hint: '請輸入apk下載連結或本地路徑',
    refresh: '刷新',
    appName: 'App名稱',
    packagesName: 'Package名稱',
    version: '版本號',
    subversion: '子版本號',
    nameSearch: '輸入App名稱或Package名稱搜索',
    open: '打開',
    kill: '停止',
    killMsg: '停止成功！',
    unInstall: '卸載',
    packet: '網路抓包',
    startPacket: '開始抓包',
    downloadCertificate: '下載證書',
    cancelGlobalProxy: '取消全域代理',
    proxyConnection: '代理連接',
    useTeaching: '使用教學',
    connectWifi: '連接Wifi',
    connectWifiText:
      '未連接Wifi的話，需前往Wifi列表連接你的Wifi。Wifi需要與Agent的網路互通，連接後點擊刷新重新獲取Wifi狀態',
    installCertificate: '安裝證書',
    installCertificateText:
      '首次抓包需要安裝證書，點擊下載按鈕後下載證書並安裝。如瀏覽器無法訪問，請確認Agent已關閉防火牆。',
    startCapturing: '開始抓包',
    startCapturingText:
      '點擊開始抓包後，就可以開始體驗啦！（預設自動全域代理，如果不需要可以點擊取消全域代理按鈕，然後自行前往Wifi頁面手動設定）',
    screenshotQuick: '快速截圖',
    screenshot: '截圖',
    clean: '清空',
    noScreenshots: '暫無截圖',
    savePicture: '保存圖片',
    precautions: '注意事項',
    precautionsText: '該功能仍處於Beta測試中，暫時屏蔽reboot、rm、su等危險指令',
    inputSend: '輸入指令後，點擊Send或Enter發送',
    enterInput: '請輸入輸入過濾文本',
    UIAutomation: {
      UIAutomationName: 'UI自動化',
      testInfo: '案例資訊',
      clean: '取消關聯',
      fatherPlayed: '所屬項目',
    },
    associatedProject: '關聯項目',
    chooseProject: '請選擇關聯項目',
    addCase: '新增案例',
    hintText: '提示',
    hintMessage: '該功能需要先從上方關聯測試案例',
    nativeControls: '原生控件',
    retrieveControlEle: '重新獲取控件元素',
    activity: '當前Activity',
    webViewList: 'WebView列表',
    classFilter: '輸入class或resource-id進行過濾',
    addControls: '添加控件',
    controlSnapshot: '控件快照',
    titleMessage: '關聯專案後即可保存控件',
    pocoRecommend: 'POCO推荐',
    pocoNull: '暂无POCO推荐语法',
    xpath: 'xpath推薦',
    xpathNull: '暫無xpath推薦語法',
    absolutePath: '絕對路徑',
    centerXY: '中心座標',
    label: {
      checkable: 'checkable',
      checked: 'checked',
      clickable: 'clickable',
      selected: 'selected',
      displayed: 'displayed',
      enabled: 'enable',
      focusable: 'focusable',
      focused: 'focused',
      longClickable: 'long-clickable',
      scrollable: 'scrollable',
    },
    subTitleText: '請先獲取控件元素，該功能需要初始化Driver',
    getEle: '獲取控件元素',
    poco: 'Poco控件',
    getPoco: '獲取Poco控件',
    pocoSDK: 'Poco-SDK 接入指南',
    moreFeaturesAdd: '更多功能正在加入...',
    getPocoSDKMessage: '請先獲取Poco控件元素，該功能需要引擎已接入Poco-SDK',
    webView: {
      webDebug: '網頁除錯',
      err: '暫無webView進程',
      getWeb: '獲取webView進程',
      againGetWeb: '重新獲取webView進程',
      Untitled: '無標題',
      nowDebug: '馬上除錯',
      return: '返回',
      nowWeb: '目前頁面',
      messageInfo: '如果您的瀏覽器不相容該功能，請您及時反映到',
      here: '這裡',
    },
  },
};
const indexIOSTS = {
  contentText: '切換佈局',
  successText: '切換成功',
};
const settingIndexTS = {
  center: {
    background: '後台管理中心',
    rights: '許可權設定',
    resource: '資源管理',
    roleText: '角色管理',
    userCon: '使用者配置',
    systemCon: '系統組態',
    scheduled: '系統排程任務',
    remoteSettings: '远程控制配置',
  },
  remote: {
    alertMsg:
      '用於配置遠程控製的最長占用時間，超過該時間後，會自動解除當前的占用情況恢復為空閑。（僅影響遠程控制和通過REST API佔用的最大時長，運行測試的設備不受影響）',
    text: '遠控最長占用時間：',
    idle_alertMsg:
      '用於配置遠程控製的最長閑置時間，若用戶超過該時間長度無任何操作，會自動解除當前的占用情況恢復為空閑。（僅影響遠程控製，運行測試的設備不受影響）',
    idle_text: '遠控最長閑置時間：',
  },
};
const resourceTS = {
  syncSucceed: '同步成功!',
  syncResource: '同步資源',
  syncResourceInfo: '同步資源說明',
  syncResourceInfoMessage:
    '重新全量更新應用內所有請求資源資訊，一般版本更新需要同步',
  pageData: {
    idText: '資源id',
    message: '描述',
    path: '路徑',
    inputPathName: '輸入路徑名稱',
    callMethod: '調用方法',
    requiredText: '是否需要鑒權',
  },
};
const roleTS = {
  dialogVisible: {
    addOrEdit: '新增/編輯角色',
    roleName: '角色名稱',
    roleNoNull: '角色名稱不能空白',
    inputParam: '請輸入參數名',
    paramNoNull: '參數值不能空白',
    roleInfo: '請輸入角色描述',
    addRole: '新增角色',
  },
  pageData: {
    role: '角色',
    nameL: '名稱',
    delMessage: '確定刪除該角色嗎?',
  },
};
const sysJobsTS = {
  code: {
    cleanFile: '清理系統檔',
    cleanFileText:
      '清理測試過程產生的圖片、錄影或遠控期間臨時apk包等等檔，保留天數為 [前兩次排程任務到本次定時任務間隔] 天數。',
    cleanResult: '清理測試報告',
    cleanResultText:
      '清理測試報告，保留天數為 [前兩次排程任務到本次定時任務間隔] 天數。',
    sendDayReport: '發送日報',
    sendDayReportText: '發送測試日報到群機器人.',
    sendWeekReport: '發送週報',
    sendWeekReportText: '發送測試週報到群機器人.',
  },
  page: {
    type: '類型',
    nextTriggerDate: '下次觸發日期',
    editTime: '編輯系統排程任務',
  },
};
const usersTS = {
  dialogVisible: {
    editUser: '編輯用戶角色',
    userName: '用戶名',
    chooseUserName: '請選擇用戶角色',
  },
  pageData: {
    userId: '用戶id',
    userName: '用戶名',
    inputName: '輸入用戶名',
    roleConfiguration: '角色配置',
  },
};
const IOSRemote = {
  depth: '最大遍历深度',
  driverStatus: {
    success: '初始化 WebDriverAgent 完成！',
    fail: '初始化 WebDriverAgent 失败！',
  },
  eleScreen: {
    err: '获取元素截图失败！',
  },
  perfmon: '性能监控',
  startSimulating: '開始模擬定位...',
  positioningRestored: '已恢復定位',
  loadingAppList: '載入應用列表中，請稍後...',
  calibration: '校準完畢',
  clipboard: {
    SentSuccessfully: '發送剪貼簿成功!',
    text: '獲取剪貼簿文字成功!',
    operate: '剪貼簿操作',
    inputText: '請輸入你要發送到剪貼簿的內容',
    send: '發送到剪貼簿',
    getText: '獲取剪貼簿文字',
  },
  clarityAndFps: '清晰度與FPS',
  calibrationCoordinates: '校準座標',
  volume: '音量',
  siri: {
    command: 'Siri指令',
    inputCommand: '請輸入siri指令，例：what day is it today?',
  },
  positioning: {
    mock: '模擬定位',
    x: '經度',
    y: '緯度',
    start: '開始模擬',
    end: '恢復定位',
  },
  remoteWDA: '遠端WDA',
  remoteSIB: '遠端SIB',
  driverNotSuccess: 'driver未初始化成功',
  errLog: '檔互傳與crash日誌',
  waitOpen: '該功能即將開放',
  moveIPA: '將ipa文件拖到此處，或',
  onlyIPAFile: '只能上傳ipa檔',
  installIPA: '安裝IPA',
  pleaseIPAFilePath: '請輸入ipa下載連結或本地路徑',
  openWeb: '打開瀏覽器',
  web: {
    openInput: '打開瀏覽器後輸入網址',
  },
  messageStep:
    '進入手機【設定】->【一般】->【VPN與裝置管理 / 描述檔與設備管理 / 設備管理 / 描述檔】->找到mitmproxy憑證安裝',
  trustCertificate: '信任憑證',
  certificateStep:
    '進入手機【設定】->【一般】->【關於本機】最下方->【憑證信任設定】信任對應憑證',
  startPacketMessage:
    '點擊開始抓包後，Wifi設置手動代理，連接右上角對應的ip與port，即可開啟抓包',
  filterClassOrName: '輸入class或name進行過濾',
  predicate: 'Predicate推薦',
  noRecommend: '暫無推薦語法',
};
const stepDetail = {
  app: {
    authorize: '授权应用',
    path: '应用路径: ',
    pkg: '应用包名',
    installFromPkglist: '从安装包列表安装',
    close: '关闭应用',
    branchName: '分支名称',
    emptyCache: '清空应用缓存',
    empty: '清空应用',
    clear: '清除应用',
  },
  attribute: '属性',
  attributeToVariable: '属性至变量',
  activityBlacklist: 'Activity黑名单',
  andClick: '并点击',
  bufferMemory: '缓存内存',
  click: {
    action: '点击',
    coordinate: '点击坐标',
    target: '点击目标',
    expandOrCollapse: '点击展开/收起脚本编辑器',
  },
  close: '关闭',
  control: {
    name: '控件',
    attribute: '控件属性',
    element: '控件元素',
    info: '控件信息',
    strategy: '控件策略',
    screenshot: '控件截图',
    subControl: '子控件',
  },
  commonKey: '常用按键',
  communicationPort: '通信端口',
  declearedRights: '声明的权限',
  des: {
    monkeyOptions: {
      sleepTime: '指定事件间的时延，单位ms',
      tapEvent: '随机坐标轻触',
      longPressEvent: '随机坐标长按1～3秒',
      swipeEvent: '随机两个坐标滑动',
      systemEvent: 'Home、返回键等等',
      navEvent: '安卓：随机开关WIFI；iOS：后台运行当前应用',
      isOpenPackageListener: '检测当前应用是否为被测应用，为否时将重新拉起被测应用',
      isOpenH5Listener: '检测是否长时间停留在H5页面 (Android Only)',
      isOpenActivityListener: '检测当前Activity是否在黑名单内 (Android Only)',
      isOpenNetworkListener: '检测设备是否处于飞行模式和WIFI网络 (Android Only)',
    },
  },
  detailConfigure: '详细配置',
  delete: '删除',
  detect: '检测',
  dragTo: '滑动拖拽至',
  display: '显示',
  downwards: '向下',
  exception: {
    handling: '异常处理',
    ignore: '忽略 ',
    warning: '告警 ',
    interrupt: '中断 ',
    msgException: '意为该测试步骤出现异常时的处理方案',
    msgContinue: '忽略异常并继续执行（逻辑处理时不抛出异常）',
    msgWarning:
      '忽标记警告并获取异常截图和异常堆栈，然后继续执行（逻辑处理时不抛出异常）',
    msgInterrupt:
      '标记失败并获取异常截图、异常堆栈和测试录像，然后中断执行（逻辑处理时抛出异常）',
  },
  engine: '引擎',
  enterNum: '输入数量',
  eventConfigure: '事件配置',
  elementAttribute: '元素属性',
  empty: '清空',
  enterText: '输入文本',
  eventsNum: '事件数',
  fromControl: '从控件',
  gameEngine: '游戏引擎',
  get: '获取',
  getToVariable: '提取至变量',
  handleSwitchInfo: '句柄切换信息',
  handleInfo: 'handle信息',
  hide: '隐藏',
  ignoreOrNot: '是否忽略',
  inputValue: '输入值',
  identifyLanguages: '识别语言',
  installation: '安装方式',
  installPath: '安装路径',
  imageSimilarity: '图像相似度',
  inputMethod: '输入法输入',
  inputBox: '输入框',
  iterate: '迭代',
  its: '的',
  key: '键',
  keyCode: '按键code',
  label: {
    monkeyOptions: {
      sleepTime: '用户操作时延',
      tapEvent: '轻触事件权重',
      longPressEvent: '长按事件权重',
      swipeEvent: '滑动事件权重',
      systemEvent: '物理按键事件权重',
      navEvent: '系统导航事件权重',
      isOpenPackageListener: '应用包名监听器',
      isOpenH5Listener: 'H5页面监听器 (Android Only)',
      isOpenActivityListener: '黑名单Activity监听器 (Android Only)',
      isOpenNetworkListener: '网络状态监听器 (Android Only)',
    },
    androidOptions: {
      system: {
        self: '设备操作',
        rotateDevice: {
          self: '屏幕交互',
          lock: '锁定屏幕',
          unlock: '解锁屏幕',
          screenSub: '左转屏幕',
          screenAdd: '右转屏幕',
          screenAbort: '关闭自动旋转',
        },
        keyboard: {
          self: '输入法与剪切板',
          sendKeyForce: 'Sonic输入法输入',
          closeKeyboard: '关闭Sonic输入法',
          setClipperByKeyboard: '设置文本到剪切板',
          getClipperByKeyboard: '获取剪切板文本',
        },
        interaction: {
          self: '特殊交互',
          keyCode: '系统按键',
          keyCodeSelf: '系统按键（自定义）',
          swipeByDefinedDirection: '从屏幕中央滑动距离',
        },
        network: {
          self: '网络相关',
          airPlaneMode: '切换飞行模式',
          wifiMode: '切换WIFI模式',
          locationMode: '切换位置服务',
        },
      },
      app: {
        self: '应用操作',
        openApp: '打开应用',
        terminate: '终止应用',
        install: '安装应用',
        uninstall: '卸载应用',
        appReset: '清空App内存缓存',
        appAutoGrantPermissions: '自动授权应用权限',
      },
      element: {
        self: '控件元素操作',
        uiEle: {
          self: '安卓原生控件',
          findElementInterval: '设置查找控件策略',
          switchWindowMode: '切换窗口模式',
          switchVisibleMode: '切换Invisible控件展示',
          switchIgnoreMode: '切换忽略不重要视图模式',
          isExistEle: '判断控件元素是否存在',
          isExistEleNum: '判断控件元素存在个数',
          click: '点击控件元素',
          sendKeys: '输入文本',
          sendKeysByActions: '输入文本(Actions)',
          swipe2: '拖拽控件元素',
          scrollToEle: '滚动到控件元素',
          longPress: '长按控件元素',
          clear: '清空输入框',
          obtainElementAttr: '获取控件属性',
          getElementAttr: '验证控件属性',
          getTextValue: '获取文本',
          assertText: '断言文本',
          logElementAttr: '日志输出控件信息',
          iteratorAndroidElement: '迭代控件列表',
        },
        coordinate: {
          self: '坐标控件',
          tap: '点击坐标',
          longPressPoint: '长按坐标',
          swipe: '滑动拖拽',
        },
        webView: {
          self: 'WebView控件',
          setDefaultFindWebViewElementInterval: '设置查找控件策略',
          toWebView: '切换WebView',
          toHandle: '切换Handle',
          isExistWebViewEle: '判断控件元素是否存在',
          isExistWebViewEleNum: '判断控件元素存在个数',
          webViewClick: '点击控件元素',
          webElementScrollToView: '滚动控件至顶部可见',
          webViewSendKeys: '输入文本',
          webViewSendKeysByActions: '输入文本(Actions)',
          webViewClear: '清空输入框',
          getWebViewTextValue: '获取文本',
          assertWebViewText: '断言文本',
          getTitle: '验证标题',
          getUrl: '验证网址',
          webViewRefresh: '刷新页面',
          webViewBack: '回退页面',
        },
        poco: {
          self: 'POCO控件',
          startPocoDriver: '启动PocoDriver',
          setDefaultFindPocoElementInterval: '设置查找控件策略',
          setTheRealPositionOfTheWindow: '设置偏移量',
          isExistPocoEle: '判断控件元素是否存在',
          isExistPocoEleNum: '判断控件元素存在个数',
          pocoClick: '点击控件元素',
          pocoLongPress: '长按控件元素',
          pocoSwipe: '拖拽控件元素',
          freezeSource: '冻结控件树',
          thawSource: '解冻控件树',
          closePocoDriver: '关闭PocoDriver',
          obtainPocoElementAttr: '获取控件属性',
          getPocoElementAttr: '验证控件属性',
          getPocoTextValue: '获取文本',
          assertPocoText: '断言文本',
          logPocoElementAttr: '日志输出控件信息',
          iteratorPocoElement: '迭代控件列表',
        },
      },
      check: {
        self: '验证操作',
        getActivity: '验证Activity',
        assert: {
          self: '自定义断言',
          assertEquals: '断言验证(相等)',
          assertNotEquals: '断言验证(不相等)',
          assertTrue: '断言验证(包含)',
          assertNotTrue: '断言验证(不包含)',
        },
      },
      img: {
        self: '图像操作',
        stepScreen: '获取截图',
        checkImage: '检测图像相似度',
        clickByImg: '图像定位并点击',
      },
      spec: {
        self: '特殊操作',
        publicStep: '公共步骤',
        runScript: '自定义脚本',
        monkey: '随机事件',
        pause: '强制等待',
      },
      settings: {
        self: '运行设置',
        stepHold: '步骤间隔设置',
        switchTouchMode: '触控模式设置',
      }, 
    },
    iOSOptions: {
      system: {
        self: '设备操作',
        rotateDevice: {
          self: '屏幕交互',
          lock: '锁定屏幕',
          unlock: '解锁屏幕',
        },
        specaction: {
          self: '特殊交互',
          siriCommand: 'Siri指令',
          sendKeyForce: '键盘输入',
          swipeByDefinedDirection: '从屏幕中央滑动距离',
        },
        interaction: {
          self: '物理交互',
          keyCode: '系统按键',
        },
        pasteboard: {
          self: '剪切板管理',
          setPasteboard: '设置文本',
          getPasteboard: '获取文本',
        },
      },
      app: {
        self: '应用操作',
        openApp: '打开应用',
        terminate: '终止应用',
        install: '安装应用',
        uninstall: '卸载应用',
        runBack: '后台运行应用',
      },
      element: {
        self: '控件元素操作',
        xcEle: {
          self: 'iOS原生控件',
          findElementInterval: '设置查找控件策略',
          isExistEle: '判断控件元素是否存在',
          isExistEleNum: '判断控件元素存在个数',
          click: '点击控件元素',
          sendKeys: '输入文本',
          sendKeysByActions: '输入文本(Actions)',
          swipe2: '拖拽控件元素',
          scrollToEle: '滚动到控件元素',
          longPress: '长按控件元素',
          clear: '清空输入框',
          obtainElementAttr: '获取控件属性',
          getElementAttr: '验证控件属性',
          getTextValue: '获取文本',
          assertText: '断言文本',
          logElementAttr: '日志输出控件信息',
          iteratorIOSElement: '迭代控件列表',
          setSnapshotMaxDepth: '设置控件获取最大遍历深度',
        },
        coordinate: {
          self: '坐标控件',
          tap: '点击坐标',
          longPressPoint: '长按坐标',
          swipe: '滑动拖拽',
        },
        poco: {
          self: 'POCO控件',
          startPocoDriver: '启动PocoDriver',
          setDefaultFindPocoElementInterval: '设置查找控件策略',
          setTheRealPositionOfTheWindow: '设置偏移量',
          isExistPocoEle: '判断控件元素是否存在',
          isExistPocoEleNum: '判断控件元素存在个数',
          pocoClick: '点击控件元素',
          pocoLongPress: '长按控件元素',
          pocoSwipe: '拖拽控件元素',
          freezeSource: '冻结控件树',
          thawSource: '解冻控件树',
          closePocoDriver: '关闭PocoDriver',
          obtainPocoElementAttr: '获取控件属性',
          getPocoElementAttr: '验证控件属性',
          getPocoTextValue: '获取文本',
          assertPocoText: '断言文本',
          logPocoElementAttr: '日志输出控件信息',
          iteratorPocoElement: '迭代控件列表',
        },
      },
      check: {
        self: '验证操作',
        assert: {
          self: 'assert',
          assertEquals: '断言验证(相等)',
          assertNotEquals: '断言验证(不相等)',
          assertTrue: '断言验证(包含)',
          assertNotTrue: '断言验证(不包含)',
        },
      },
      img: {
        self: '图像操作',
        stepScreen: '获取截图',
        checkImage: '检测图像相似度',
        clickByImg: '图像定位并点击',
      },
      spec: {
        self: '特殊操作',
        publicStep: '公共步骤',
        runScript: '自定义脚本',
        monkey: '随机事件',
        pause: '强制等待',
      },
      settings: {
        self: '运行设置',
        stepHold: '步骤间隔设置',
      },
    },
  },
  language: {
    type: '语言类型',
    english: '英文',
    simplifiedChinese: '简体中文',
  },
  logic: {
    process: '逻辑处理',
    condition: '逻辑条件',
    msgProcess: '意为该测试步骤关联的逻辑处理',
    msgSubStep: '该步骤无异常时，会执行子步骤',
    msgIf: '如果上一个if条件步骤有异常，则进入该逻辑判断，无异常时会执行子步骤',
    msgFailure: '如果以上条件全失败，则执行子步骤',
    msgRepeat: '如果条件无异常，则重复执行子步骤',
  },
  layer: '层',
  localization: '定位',
  logOutput: '日志输出',
  longPress: '长按',
  max: '最大',
  maxTries: '最大尝试',
  multiWindowMode: '多窗口模式',
  mode: '模式',
  maxDepth: '最大深度',
  maxScroll: '最多滚动',
  msg: {
    coordinate: '请选择坐标控件元素',
    text: '请输入期望包含的文本内容',
    touch: '请选择触控模式,默认为APK触控',
    poco: '请选择POCO控件元素',
    startPkgName: '请输入启动的App包名',
    stopPkgName: '请输入终止的App包名',
    installDefine: '自定义下载路径或本地安装',
    installList: '已有安装包列表安装',
    installPathInput: '请输入App下载路径或本地apk路径',
    branchName: '请输入分支名称，支持模糊匹配，可以为空',
    uninstallPkgName: '请输入卸载的App包名',
    clearAppPkgName: '请输入清空应用的App包名',
    authPkgNameInput: '请输入自动授权应用权限的App包名',
    webviewPkgName: '请输入WebView所在包名',
    processName: '（可选）请输入WebView所在进程名，不输入默认为包名',
    titleInput: '请输入Handle页面标题 或 地址 或 index下标',
    expected: '请输入期望值或选择全局变量',
    control: '请选择控件属性，可多选',
    notBeEmpty: '不能为空',
    siri: '请输入siri指令，例：what day is it today?',
    publicStep: '该项目暂未添加公共步骤',
    exception: '请选择异常处理方式',
    input: '请输入',
    select: '请选择',
  },
  msgTips: {
    variable: 'TIPS: 需要临时变量或全局变量时，可以添加',
    install:
      'TIPS: 需要先接入Jenkins插件，并确认安装包管理有对应安装包。多个符合条件的安装包优先选择最新的安装。',
    tab: 'TIPS: Handle相当于页面的Tab，切换WebView后找不到页面可以尝试切换Handle',
    androidPkgName:
      'TIPS: 传递Android应用的App包名，该步骤可实现自动授权目标App所需要的所有权限',
    focus: 'TIPS: 在文本框需要先获取焦点，才能进行输入时，使用此方式。',
    sysKey:
      'TIPS: 本功能需要先唤醒系统键盘。需要临时变量或全局变量时，可以添加', 
    table: 'TIPS: 长列表的场景下，可通过该方法连续滚动，尝试让目标元素可见',
    text: 'TIPS: 可以将获取的文本放入临时变量中',
    controlAttribute: 'TIPS: 可以将获取的控件属性放入临时变量中',
    verify: 'TIPS: 将全局变量或临时变量插入，验证时将替换该内容为变量值',
    order: 'TIPS: 默认按顺序使用SIFT特征匹配、AKAZE特征匹配和模板匹配算法',
    language:
      'TIPS: 默认语言包只有简体中文和英文，需要额外添加可以咨询管理员。',
    publicStep:
      'TIPS: 设置后从该步骤开始，后面的每个步骤都会按照设置值来间隔。',
    reference: 'TIPS: 保存后直接在步骤列表编辑脚本，关于脚本的使用，可参考',
    iteration:
      'TIPS: 用于迭代操作控件列表，子步骤中引用【当前迭代控件】以操作列表中的控件',
  },
  number: '个数',
  native: '原生',
  new: '新增',
  none: '无',
  noException: '无异常',
  offsetWidth: 'offsetWidth',
  offsetHeight: 'offsetHeight',
  openOrNot: '开启与否',
  others: '其他',
  open: '开启',
  pressSys: '按下系统 ',
  pressCoordinate: '长按坐标',
  pageScreenshot: '页面截图',
  path: '路径',
  pressTime: '长按时间',
  processName: '进程名',
  pocoControl: 'POCO控件',
  port: '端口',
  randomEventsTest: '随机事件测试',
  refreshPage: '刷新页面',
  reminderDisplay: '三个指令前端显示上保留，用于兼容老版本升级上来之后，依然能正常的显示和运行',
  reminderVersion: '大于2.5.0版本，增强的文本断言能力',
  retries: '重试次数',
  retriesInterval: '重试间隔',
  rollbackPage: '回退页面',
  scrollControl: '滚动控件',
  scrollTo: '滚动至',
  runSelfDefinedScript: '运行自定义脚本',
  scrollOrientation: '滚动方向',
  scrollNum: '滚动次数',
  slideDistance: '滑动距离',
  side: '方向',
  status: '状态',
  stepInterval: '步骤间隔',
  stepType: '步骤类型',
  stepTypeInput: '请填写步骤类型',
  screenCenter: '设备屏幕中央向',
  sendSiriCmd: '发送Siri指令',
  set: {
    to: '设置为：',
    clipboardText: '设置剪切板文本',
    maxControlTraverseDepth: '设置控件获取最大遍历深度',
    offset: '设置偏移量',
    search: '设置查找',
    textInfo: '设置的文本信息',
    textToClipboard: '设置文本至剪切板',
    stepsInterval: '步骤间隔设置',
    touchMode: '触控模式设置',
},
  swipe: '滑动',
  switch: {
    handler: '切换句柄',
    webview: '切换webview',
    mode: '切换模式',
    display: '切换显示',
  },
  singleWindowMode: '单窗口模式',
  siriCmd: 'Siri指令',
  submit: '提交',
  table: '表格',
  targetAttr: '目标属性',
  textInfo: '文本信息',
  testPkgName: '测试包名',
  touchMode: '触控模式',
  targetControl: '目标控件',
  text: '文本',
  textIdentifyInImage: '图像文字识别',
  times: '次',
  topVisible: '至顶部可见',
  use: '使用',
  usePublicSteps: '使用公共步骤',
  unknownScrollSideType: '未知滚动方向类型',
  upwards: '向上',
  userDoc: '使用文档',
  variable: '变量',
  variableName: '变量名',
  verify: {
    actualValue: '实际值',
    assert: '断言',
    assertType: '断言类型',
    contain: '包含',
    expect: '期望',
    expectContain: '期望包含',
    expectedText: '期望文本',
    existedOrNot: '存在与否',
    expectedMatchRatio: '期望匹配度',
    expectedValue: '期望值',
    existed: '存在',
    verify: '验证',
    num: '验证个数',
    equalTo: '等于',
    greaterThan: '大于',
    ignore: '忽略',
    lessThan: '小于',
    notLessThan: '大于等于',
    notGreaterThan: '小于等于',
    notEqual: '不等于',
    notContain: '不包含',
    normal: '正常',
    notIgnore: '不忽略',
    notExisted: '不存在',
    title: '验证标题',
    url: '验证网址',
    activity: '验证活动',
    unknownType: '未知类型',
  },
  waitTime: '等待时间',
  windowHeight: 'windowHeight',
  windowWidth: 'windowWidth',
  wait: '等待',
  WebviewName: 'webview名称',
};
export default {
  message: {
    robot,
    agent,
    common,
    devices,
    layout,
    form,
    dialog,
    routes,
    setting,
    androidTestCase,
    elements,
    globalParamsTs,
    homeTS,
    jobsTS,
    loginTS,
    modulesTS,
    packagesTS,
    projectIndexTS,
    publicStepTS,
    resultDetailTS,
    ResultsTS,
    stepListViewTS,
    testSuitesTS,
    versionsTS,
    androidRemoteTS,
    indexIOSTS,
    settingIndexTS,
    resourceTS,
    roleTS,
    sysJobsTS,
    usersTS,
    IOSRemote,
    script,
    perf,
    steps,
    code,
    token,
    project,
    pubSteps,
    testcase,
    suite,
    element,
    stepDetail,
  },
};