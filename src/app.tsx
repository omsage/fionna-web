import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer, RouteContext } from '@ant-design/pro-components';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import React, { useState, useEffect } from 'react';
import Tabs from 'antd/lib/tabs';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const TabPane = Tabs.TabPane;
const tabTitles: any = {};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      // history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const [activeTab, setActiveTab] = useState();
  const [tabItems, setTabItems] = useState(JSON.parse(localStorage.getItem('tabPages') || '[]'));
  const getCurrTab = (newActiveTab) => tabItems.find((item) => item.id === newActiveTab);

  // 切换 Tab
  const switchTab = (newActiveTab) => {
    const currTab = getCurrTab(newActiveTab);
    if (currTab) {
      history.push(currTab.pathname);
      setActiveTab(newActiveTab);
    }
  };

  // 移除 Tab
  const removeTab = (tabKey: string) => {
    let newActiveTab = activeTab;
    let lastIndex = -1;
    tabItems.forEach((item, i) => {
      if (item.id === tabKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = tabItems.filter((item) => item.id !== tabKey);
    if (newPanes.length && newActiveTab === tabKey) {
      if (lastIndex >= 0) {
        newActiveTab = newPanes[lastIndex].id;
      } else {
        newActiveTab = newPanes[0].id;
      }
    }
    setTabItems(newPanes);
    switchTab(newActiveTab);
  };

  // 激活 Tab
  const activateTab = () => {
    const { location } = history;
    const currTab: any = tabItems.find((item) => item.pathname === location.pathname);
    if (currTab) {
      setActiveTab(currTab.id);
    }
  };

  // 任何 Tab 变动，激活正确的 Tab，并更新缓存
  useEffect(() => {
    activateTab();
    localStorage.setItem('tabPages', JSON.stringify(tabItems));
  }, [tabItems]);

  return {
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // history.push(loginPath);
      }
      const pathname = location.pathname;
      const currtabItem = {
        id: location.key,
        title: tabTitles[pathname],
        pathname,
      };
      if (pathname !== '/') {
        // 构建开启的 Tab 列表，并更新国际化的 Tab 标题
        setTabItems((prev: any) => {
          const next = prev.find((item) => item.pathname === pathname)
            ? prev
            : [...prev, currtabItem];
          return next.map((item) => ({ ...item, title: tabTitles[item.pathname] }));
        });
      } else {
        history.push('/home');
      }
      activateTab();
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: () => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <RouteContext.Consumer>
            {(ctx) => {
              // 从上下文的 routes 中构建 Map，引用各页面的 children
              const tabContents = {};
              const getTabContents = (arr = []) => {
                arr.forEach((ele) => {
                  tabContents[ele.path] = ele.element;
                  if (ele.children) {
                    getTabContents(ele.children);
                  }
                });
              };
              getTabContents(ctx.route.routes);

              // 从上下文构建 Map，缓存国际化的 Tab 标题
              const getTabTitles = (arr = []) => {
                arr.forEach((ele) => {
                  if (ele.name) {
                    tabTitles[ele.path] = ele.name;
                  }
                  if (ele.children) {
                    getTabTitles(ele.children);
                  }
                });
              };
              getTabTitles(ctx.menuData);

              return (
                <Tabs
                  type="editable-card"
                  hideAdd
                  onChange={switchTab}
                  activeKey={activeTab}
                  onEdit={removeTab}
                >
                  {tabItems.length > 0 &&
                    tabItems.map((tabItem) => {
                      return (
                        <TabPane
                          tab={tabItem.title}
                          key={tabItem.id}
                          closable={tabItems.length > 1}
                        >
                          {/* 替换原来直接输出的 children */}
                          {tabContents[tabItem.pathname]}
                        </TabPane>
                      );
                    })}
                </Tabs>
              );
            }}
          </RouteContext.Consumer>
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
