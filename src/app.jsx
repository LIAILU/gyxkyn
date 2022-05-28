import { PageLoading,SettingDrawer } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, SmileOutlined, ProfileOutlined, HomeOutlined,
  CheckCircleOutlined, DashboardOutlined, HeartOutlined, FormOutlined,
  WarningOutlined, UserOutlined, HighlightOutlined, TableOutlined, UnorderedListOutlined,
  ConsoleSqlOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { getLocalSettings, setLocalSettings } from './utils/localStorageUtils';
import { isEmpty } from './utils/assetsUtils';
import { colorList } from './components/SysTheme/colorList';
import $ from 'jquery';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  dashboard: <DashboardOutlined />,
  profile: <ProfileOutlined />,
  CheckCircleOutlined: <CheckCircleOutlined />,
  warning: <WarningOutlined />,
  user: <UserOutlined />,
  highlight: <HighlightOutlined />,
  ConsoleSql: <ConsoleSqlOutlined />,
  table: <TableOutlined />,
  list: <UnorderedListOutlined />,
  form: <FormOutlined />,
  home: <HomeOutlined />,
};
const loopMenuItem = (menus) => {
  return  menus.map(({ icon, routes, ...item }) => ({
     ...item,
     icon: icon && IconMap[icon],
     routes: routes && loopMenuItem(routes),
   }))
 };
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行

  
  if(isEmpty(getLocalSettings())){
    setLocalSettings(defaultSettings);
  }
  defaultSettings = getLocalSettings();
  if(defaultSettings.hideSettingsDraw){
    $('body').addClass('hideSettingsDraw')
  }else{
    $('body').removeClass('hideSettingsDraw')
  }

  if (history.location.pathname !== loginPath) {
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
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState, setInitialState }) => {
  // console.log(initialState)
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userid,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        // const menuData = await fetchMenuData();
        return initialState.currentUser === undefined ?initialState:loopMenuItem(initialState.currentUser.menus);
      },
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link key="swagger" to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          { !props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              className={ initialState?.settings.selfDisplay }
              hideHintAlert={initialState?.settings.hideHintAlert}
              hideCopyButton={initialState?.settings.hideCopyButton}
              colorList={colorList}
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
