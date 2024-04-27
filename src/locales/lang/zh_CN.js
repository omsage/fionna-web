/**
 * ZH_CN language
 */
const suite = {
    name: '套件名称',
    namePlace: '请填写套件名称',
    perf: '性能采集',
    interval: '采集间隔',
    devicePlace: '请选择测试设备，可输入型号、备注、中文名称、序列号筛选',
    selectedCase: '已选用例',
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

const perf = {
    selectDeviceMess: "是否选择该设备?",
    pleaseSelectApply: "请选择应用",
    perfTab: "性能测试",
    reportTab: "测试报告",
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
const elements = {
    warn: '警告',
};
const devices = {
    currentApp:"当前应用",
    list: '设备列表',
    form: {
        model: '设备型号',
        manufacturer: '制造商',
        system: '设备系统',
        battery: {
            level: '电池电量',
            temperature: '电池温度',
            voltage: '充电电压',
        },
        testTime: "测试时间",
        testPackageName: "测试包",
        agent: '所在位置',
    },
    detail: {
        image: '设备图片',
        uploadImg: '点击上传',
        nickName: '设备备注',
        nickPlaceholder: '输入设备备注信息',
        name: '设备名称',
        model: '设备型号',
        udId: '设备序列号',
        size: '屏幕分辨率',
        cpu: 'CPU类型',
        pwd: '安装密码',
        pwdPlaceholder: '默认为Sonic123456',
        operation: '快捷操作',
        reboot: '重启',
        rebootTips: '确定重启该设备吗？',
        deleteTips: '确定删除该设备吗？',
    },
    useRightNow: '马上使用',
    moreDetail: '更多信息',
    deviceCenter: '设备中心',
    agentCenter: 'Agent中心',
    status: {
        ONLINE: '空闲中',
        DEBUGGING: '占用中',
        TESTING: '测试中',
        DISCONNECTED: '已断开',
        OFFLINE: '已离线',
        UNAUTHORIZED: '未授权',
        ERROR: '异常中',
    },
    filter: {
        all: '全选',
        platform: {
            ANDROID: '安卓系统',
            IOS: 'iOS系统',
            HARMONY: '鸿蒙系统',
        },
        manufacturer: '设备制造商',
        cpu: 'CPU处理器',
        size: '屏幕分辨率',
        agent: '所在位置',
        status: '设备状态',
        placeholder: '请输入要筛选的型号、设备名称或设备序列号',
        button: '高级筛选',
    },
    refresh: '自动刷新',
    avgTem: '当前平均电池温度：',
    hint: '设置提示',
    adTemperature: {
        temperature: '当设备温度≥',
        height: '高温值',
        onlyAd: '时，会通知机器人告警。',
        then: '当',
        timeout: '高温超时',
        continuedTime: '时间内温度持续≥',
        onlyAdNotice: '时，会通知机器人并',
        shutdown: '关机',
    },
};
// 布局相关
const layout = {
    languages: '多语言',
};
const form = {
    save: '保存',
    unknown: '未知',
    notEmpty: '不能为空！',
    confirm: '确定',
    cancel: '取消',
};
const report = {
    deleteMess: "是否删除所选报告?",
    delete: "删除",
    down: "下载",
    selectReportMess: "请输入报告名",
    summary: {
        avgMemMess: "均值是:",
        maxMemMess: "最大值:",
        procAvgCPUUsage: "程序CPU平均使用率",
        procMaxPss: "程序PSS峰值",
        AvgFPS: "FPS均值",
        sysCpuAvg: "系统CPU均值",
        sysMaxAvg: "系统使用内存峰值",
        fpsMess: "当前所测试阶段的FPS均值是:",
        jankMessPre: "当前测试阶段jank数量为",
        jankMessMid: ",每秒最大峰值为:",
        jankMessEnd: ",每秒平均jank率:",
        bigJankMessPre: "当前测试阶段big jank数量为",
        bigJankMessMid: ",每秒最大峰值为:",
        bigJankMessEnd: ",每秒平均big jank率:",
        procCPUMessPre: "当前所测试程序的CPU均值是:",
        procCPUMessEnd: "%,最大峰值是:",
        collectivitySysCpuPre: "当前系统整体CPU使用率均值为:",
        collectivitySysCpuEnd: "%,峰值为:",
        sysCpuPre: "使用率均值为:",
        sysCpuEnd: "%,峰值为:",
        procMemPre: "当前测试阶段程序的总PSS均值是:",
        procMemEnd: "MB,最大峰值是:",
        sysMemPre: "当前系统程序的内存使用均值是:",
        sysMemEnd: "MB,最大峰值是:",
        sysNetworkPre: "上行流量为:",
        sysNetworkEnd: "MB,下行流量:",
        sysTemperaturePre: "当前测试阶段系统温度的峰值是:",
        sysTemperatureEnd: " ℃,与初始温度的差值是:",
    }
};
const dialog = {
    welcome: '欢迎回来！',
    permissionDenied: '当前用户暂无权限！',
    suffixError: '文件格式有误！',
    projectInfo: '项目信息',
    agentInfo: 'Agent信息',
    myInfo: '我的信息',
    changePassword: '修改密码',
    copy: {
        success: '复制成功！',
        fail: '复制失败！',
    },
    ready: '后台准备中...请稍后...',
    error: '系统出错了！',
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
