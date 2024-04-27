/**
 * ZH_TW language
 */
const suite = {
    name: '套件名稱',
    namePlace: '請填寫套件名稱',
    perf: '性能蒐集',
    interval: '蒐集間隔',
    devicePlace: '請選擇測試設備，可輸入型號、備註、中文名稱、序列號篩選',
    selectedCase: '已選用例',
};

const code = {
    placeholder: '請選擇',
    settings: '設置',
    temp: '導入模板',
    table: {
        name: '輸入名稱搜索',
        lang: '腳本語言',
        type: '導入方式',
        add: '追加',
        replace: '替換',
    },
    tip: '編輯後記得保存哦',
};

const perf = {
    selectDeviceMess: "是否選擇該設備?",
    pleaseSelectApply: "請選擇應用",
    perfTab: "性能測試",
    reportTab: "測試報告",
    select: '(可選) 點此可指定監聽應用Process性能',
    start: '開始監控',
    stop: '停止監控',
    clear: '清空數據',
    singleCpu: 'CPU單核使用率',
    totalCpu: 'CPU總使用率',
    memUsage: '記憶體佔用',
    network: '上下行',
    procCpu: 'CPU使用率',
    emptyData: '暫無數據',
    byteData: '數據量',
};

const elements = {
    warn: '警告',
};
const devices = {
    currentApp:"当前应用",
    list: '設備列表',
    form: {
        model: '設備型號',
        manufacturer: '製造商',
        system: '設備系統',
        battery: {
            level: '電池電量',
            temperature: '電池溫度',
            voltage: '充電電壓',
        },
        testTime: "測試時間",
        testPackageName: "測試包",
        agent: '所在位置',
    },
    detail: {
        image: '設備圖片',
        uploadImg: '點擊上傳',
        nickName: '設備備註',
        nickPlaceholder: '輸入設備備註信息',
        name: '設備名稱',
        model: '設備型號',
        udId: '設備序列號',
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
    moreDetail: '更多信息',
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
        placeholder: '請輸入要篩選的型號、設備名稱或設備序列號',
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

// 布局相关
const layout = {
    languages: '多語言',
};
const form = {
    save: '保存',
    unknown: '未知',
    notEmpty: '不能為空！',
    confirm: '確定',
    cancel: '取消',
};
const report = {
    deleteMess: "是否刪除所選報告?",
    delete: "刪除",
    down: "下載",
    selectReportMess: "請輸入報告名",
    summary: {
        avgMemMess: "均值是:",
        maxMemMess: "最大值:",
        procAvgCPUUsage: "程序CPU平均使用率",
        procMaxPss: "程序PSS峰值",
        AvgFPS: "FPS均值",
        sysCpuAvg: "系統CPU均值",
        sysMaxAvg: "系統使用內存峰值",
        fpsMess: "當前所測試階段的FPS均值是:",
        jankMessPre: "當前測試階段jank數量為",
        jankMessMid: ",每秒最大峰值為:",
        jankMessEnd: ",每秒平均jank率:",
        bigJankMessPre: "當前測試階段big jank數量為",
        bigJankMessMid: ",每秒最大峰值為:",
        bigJankMessEnd: ",每秒平均big jank率:",
        procCPUMessPre: "當前所測試程序的CPU均值是:",
        procCPUMessEnd: "%,最大峰值是:",
        collectivitySysCpuPre: "當前系統整體CPU使用率均值為:",
        collectivitySysCpuEnd: "%,峰值為:",
        sysCpuPre: "使用率均值為:",
        sysCpuEnd: "%,峰值為:",
        procMemPre: "當前測試階段程序的總PSS均值是:",
        procMemEnd: "MB,最大峰值是:",
        sysMemPre: "當前系統程序的內存使用均值是:",
        sysMemEnd: "MB,最大峰值是:",
        sysNetworkPre: "上行流量為:",
        sysNetworkEnd: "MB,下行流量:",
        sysTemperaturePre: "當前測試階段系統溫度的峰值是:",
        sysTemperatureEnd: " ℃,與初始溫度的差值是:",
    }
};
const dialog = {
    welcome: '歡迎回來！',
    permissionDenied: '當前用戶暫無權限！',
    suffixError: '文件格式有誤！',
    projectInfo: '項目信息',
    agentInfo: 'Agent信息',
    myInfo: '我的信息',
    changePassword: '修改密碼',
    copy: {
        success: '複製成功！',
        fail: '複製失敗！',
    },
    ready: '後臺準備中...請稍後...',
    error: '系統出錯了！',
};
const androidRemoteTS = {
    cancelScreenMess: "取消投屏？",
    noSelectDevice: "未选择设备",
    perfmon: "性能监控",
    flushed: "刷新",
    device: "设备",
    product: "产品",
    model: "型号",
    high: '高',
    middle: '中',
    low: '低',
    loadIng: '加载应用列表中，请稍后...',
    noWebSocket: '不支持WebSocket',
    connection: '连接成功！',
    code: {
        LUS: '锁定/解锁屏幕',
        frameNumber: '投屏帧数',
        systemVersion: '系统版本',
        preparingImager: '准备图像中...',
        precautions: '注意事项',
        precautionsText: '该功能仍处于Beta测试中，暂时屏蔽reboot、rm、su等风险指令',
        inputSend: '输入指令后，点击Send或回车发送',
        enterInput: '请输入输入过滤文本',
    }
};
const indexIOSTS = {
    contentText: '切换布局',
    successText: '切换成功',
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
        elements
    },
};