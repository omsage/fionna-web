import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Card, Select, Tooltip, Checkbox, Switch, Drawer } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const Performance: React.FC = () => {
    const [perfConfig, setPerfConfig] = useState({ deviceSerial: '', packageName: '' });
    const [deviceSerialList, setDeviceSerialList] = useState<string[]>([]);
    const [packageNameList, setPackageNameList] = useState<string[]>([]);
    const [isMultiple, setIsMultiple] = useState(false);
    const [isScreenCasting, setIsScreenCasting] = useState(false);
    const [isStartPerf, setIsStartPerf] = useState(false);
  
    const handleSerialSelect = (serial: string) => {
      setPerfConfig(config => ({ ...config, deviceSerial: serial }));
      // TODO: Add more logic here depending on your needs.
    };
  
    const handlePackageSelect = (packageName: string) => {
      setPerfConfig(config => ({ ...config, packageName }));
      // TODO: Add more logic here depending on your needs.
    };
  
    const startBtnCallback = () => setIsStartPerf(start => !start);

    return (
        <Layout className="common-layout">
          <Layout>
            <Sider width={270}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Card>
                  <Select
                    value={perfConfig.deviceSerial}
                    // onChange={handleDeviceSerialChange}
                    // onFocus={serialListSelectOpenCallback}
                    placeholder="输入设备serial"
                    allowClear
                    style={{ width: 228 }}
                  >
                    {/* {deviceSerialList.map((serialItem) => (
                      <Option key={serialItem.SerialName} value={serialItem.SerialName}>{serialItem.SerialName}</Option>
                    ))} */}
                  </Select>
                  <br/>
                  <br/>
                  <Select
                    value={perfConfig.packageName}
                    // onChange={handlePackageNameChange}
                    // onFocus={() => packageNameSelectOpenCallback(perfConfig.deviceSerial || '')}
                    placeholder="输入包名或者bundle"
                    allowClear
                    style={{ width: 159 }}
                  >
                    {/* {packageNameList.map((packageItem) => (
                      <Option key={packageItem.value} value={packageItem.value}>{packageItem.label}</Option>
                    ))} */}
                  </Select>
                  <Tooltip title="获取设备前台应用包名">
                    {/* <Button type="primary" onClick={() => pickCurrentPackageCallback(perfConfig.deviceSerial || '')}>Pick</Button> */}
                  </Tooltip>
                </Card>
    
                <Card>
                  <Checkbox name="procCPU">proc-cpu</Checkbox>
                  <Checkbox name="procMem">proc-pss</Checkbox>
                  <Checkbox name="procThread">proc-thread</Checkbox>
                  <Checkbox name="frame">frame</Checkbox>
                  <Checkbox name="sysCpu">sys-cpu</Checkbox>
                  <Checkbox name="sysMem">sys-mem</Checkbox>
                </Card>
    
                <Card>
                  <Switch checked={isScreenCasting} onChange={(checked) => setIsScreenCasting(checked)} disabled={!perfConfig.deviceSerial} />
                  <Switch checked={isMultiple} onChange={(checked) => setIsMultiple(checked)} disabled={!perfConfig.deviceSerial} />
                  <Drawer title="I am the title" width={270} visible={isMultiple} onClose={() => setIsMultiple(false)}>
                    {/* {deviceSerialList.map((item) => (
                      <Card title={`${item.SerialName} ${item.ProductDevice} ${item.OSVersion}`} extra={<Checkbox />} key={item.SerialName} />
                    ))} */}
                  </Drawer>
                </Card>
              </Space>
            </Sider>
    
            <Content>
              {/* Render PerfHome component with isStartPerf and perfConfig props */}
            </Content>
          </Layout>
    
          {/* <div className="start-to-home" onClick={() => setIsStartPerf(!isStartPerf)}>
            {!isStartPerf ? <VideoCameraOutlined size={60} color="#4caf50" /> : <PauseOutlined size={60} color="#d80f0f" />}
          </div> */}
        </Layout>
      );
    };

export default Performance;