
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req, res) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */

let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
}; // 代码中会兼容本地 service mock 以及部署站点的静态数据

const getMenus = () => {
  if(getAccess() === 'user'){
    return [
      {
        path: '/',
        redirect: '/index',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/index',
        name: 'home',
        icon: 'smile',
        component: './Index',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard',
            redirect: '/dashboard/analysis',
          },
          {
            name: 'analysis',
            icon: 'smile',
            path: '/dashboard/analysis',
            component: './dashboard/analysis',
          },
          {
            name: 'monitor',
            icon: 'smile',
            path: '/dashboard/monitor',
            component: './dashboard/monitor',
          },
          {
            name: 'workplace',
            icon: 'smile',
            path: '/dashboard/workplace',
            component: './dashboard/workplace',
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          {
            path: '/profile',
            redirect: '/profile/basic',
          },
          {
            name: 'basic',
            icon: 'smile',
            path: '/profile/basic',
            component: './profile/basic',
          },
          {
            name: 'advanced',
            icon: 'smile',
            path: '/profile/advanced',
            component: './profile/advanced',
          },
        ],
      },
      {
        name: 'result',
        icon: 'CheckCircleOutlined',
        path: '/result',
        routes: [
          {
            path: '/result',
            redirect: '/result/success',
          },
          {
            name: 'success',
            icon: 'smile',
            path: '/result/success',
            component: './result/success',
          },
          {
            name: 'fail',
            icon: 'smile',
            path: '/result/fail',
            component: './result/fail',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          {
            path: '/exception',
            redirect: '/exception/403',
          },
          {
            name: '403',
            icon: 'smile',
            path: '/exception/403',
            component: './exception/403',
          },
          {
            name: '404',
            icon: 'smile',
            path: '/exception/404',
            component: './exception/404',
          },
          {
            name: '500',
            icon: 'smile',
            path: '/exception/500',
            component: './exception/500',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account',
            redirect: '/account/center',
          },
          {
            name: 'center',
            icon: 'smile',
            path: '/account/center',
            component: './account/center',
          },
          {
            name: 'settings',
            icon: 'smile',
            path: '/account/settings',
            component: './account/settings',
          },
        ],
      },
      {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        routes: [
          {
            path: '/editor',
            redirect: '/editor/flow',
          },
          {
            name: 'flow',
            icon: 'smile',
            path: '/editor/flow',
            component: './editor/flow',
          },
          {
            name: 'mind',
            icon: 'smile',
            path: '/editor/mind',
            component: './editor/mind',
          },
          {
            name: 'koni',
            icon: 'smile',
            path: '/editor/koni',
            component: './editor/koni',
          },
        ],
      },
      {
        component: '404',
      },
    ];
  }else {
    return [
      {
        path: '/',
        redirect: '/index',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/index',
        name: 'home',
        icon: 'smile',
        component: './Index',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard',
            redirect: '/dashboard/analysis',
          },
          {
            name: 'analysis',
            icon: 'smile',
            path: '/dashboard/analysis',
            component: './dashboard/analysis',
          },
          {
            name: 'monitor',
            icon: 'smile',
            path: '/dashboard/monitor',
            component: './dashboard/monitor',
          },
          {
            name: 'workplace',
            icon: 'smile',
            path: '/dashboard/workplace',
            component: './dashboard/workplace',
          },
        ],
      },
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form',
            redirect: '/form/basic-form',
          },
          {
            name: 'basic-form',
            icon: 'smile',
            path: '/form/basic-form',
            component: './form/basic-form',
          },
          {
            name: 'step-form',
            icon: 'smile',
            path: '/form/step-form',
            component: './form/step-form',
          },
          {
            name: 'advanced-form',
            icon: 'smile',
            path: '/form/advanced-form',
            component: './form/advanced-form',
          },
        ],
      },
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/search',
            name: 'search-list',
            component: './list/search',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                name: 'articles',
                icon: 'smile',
                path: '/list/search/articles',
                component: './list/search/articles',
              },
              {
                name: 'projects',
                icon: 'smile',
                path: '/list/search/projects',
                component: './list/search/projects',
              },
              {
                name: 'applications',
                icon: 'smile',
                path: '/list/search/applications',
                component: './list/search/applications',
              },
            ],
          },
          {
            path: '/list',
            redirect: '/list/table-list',
          },
          {
            name: 'table-list',
            icon: 'smile',
            path: '/list/table-list',
            component: './list/table-list',
          },
          {
            name: 'basic-list',
            icon: 'smile',
            path: '/list/basic-list',
            component: './list/basic-list',
          },
          {
            name: 'card-list',
            icon: 'smile',
            path: '/list/card-list',
            component: './list/card-list',
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          {
            path: '/profile',
            redirect: '/profile/basic',
          },
          {
            name: 'basic',
            icon: 'smile',
            path: '/profile/basic',
            component: './profile/basic',
          },
          {
            name: 'advanced',
            icon: 'smile',
            path: '/profile/advanced',
            component: './profile/advanced',
          },
        ],
      },
      {
        name: 'result',
        icon: 'CheckCircleOutlined',
        path: '/result',
        routes: [
          {
            path: '/result',
            redirect: '/result/success',
          },
          {
            name: 'success',
            icon: 'smile',
            path: '/result/success',
            component: './result/success',
          },
          {
            name: 'fail',
            icon: 'smile',
            path: '/result/fail',
            component: './result/fail',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          {
            path: '/exception',
            redirect: '/exception/403',
          },
          {
            name: '403',
            icon: 'smile',
            path: '/exception/403',
            component: './exception/403',
          },
          {
            name: '404',
            icon: 'smile',
            path: '/exception/404',
            component: './exception/404',
          },
          {
            name: '500',
            icon: 'smile',
            path: '/exception/500',
            component: './exception/500',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account',
            redirect: '/account/center',
          },
          {
            name: 'center',
            icon: 'smile',
            path: '/account/center',
            component: './account/center',
          },
          {
            name: 'settings',
            icon: 'smile',
            path: '/account/settings',
            component: './account/settings',
          },
        ],
      },
      {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        routes: [
          {
            path: '/editor',
            redirect: '/editor/flow',
          },
          {
            name: 'flow',
            icon: 'smile',
            path: '/editor/flow',
            component: './editor/flow',
          },
          {
            name: 'mind',
            icon: 'smile',
            path: '/editor/mind',
            component: './editor/mind',
          },
          {
            name: 'koni',
            icon: 'smile',
            path: '/editor/koni',
            component: './editor/koni',
          },
        ],
      },
      {
        component: '404',
      },
    ]
  }
};

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req, res) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }

    res.send({
      success: true,
      data: {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
        menus: getMenus()
      },
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req, res) => {
    const { password, username, type } = req.body;
    await waitTime(2000);

    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
        routes: [
          {
            path: '/user',
            layout: false,
            routes: [
              {
                path: '/user/login',
                layout: false,
                name: 'login',
                component: './user/Login',
              },
              {
                path: '/user',
                redirect: '/user/login',
              },
              {
                name: 'register-result',
                icon: 'smile',
                path: '/user/register-result',
                component: './user/register-result',
              },
              {
                name: 'register',
                icon: 'smile',
                path: '/user/register',
                component: './user/register',
              },
              {
                component: '404',
              },
            ],
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            routes: [
              {
                path: '/dashboard',
                redirect: '/dashboard/analysis',
              },
              {
                name: 'analysis',
                icon: 'smile',
                path: '/dashboard/analysis',
                component: './dashboard/analysis',
              },
              {
                name: 'monitor',
                icon: 'smile',
                path: '/dashboard/monitor',
                component: './dashboard/monitor',
              },
              {
                name: 'workplace',
                icon: 'smile',
                path: '/dashboard/workplace',
                component: './dashboard/workplace',
              },
            ],
          },
          {
            path: '/form',
            icon: 'form',
            name: 'form',
            routes: [
              {
                path: '/form',
                redirect: '/form/basic-form',
              },
              {
                name: 'basic-form',
                icon: 'smile',
                path: '/form/basic-form',
                component: './form/basic-form',
              },
              {
                name: 'step-form',
                icon: 'smile',
                path: '/form/step-form',
                component: './form/step-form',
              },
              {
                name: 'advanced-form',
                icon: 'smile',
                path: '/form/advanced-form',
                component: './form/advanced-form',
              },
            ],
          },
          {
            path: '/list',
            icon: 'table',
            name: 'list',
            routes: [
              {
                path: '/list/search',
                name: 'search-list',
                component: './list/search',
                routes: [
                  {
                    path: '/list/search',
                    redirect: '/list/search/articles',
                  },
                  {
                    name: 'articles',
                    icon: 'smile',
                    path: '/list/search/articles',
                    component: './list/search/articles',
                  },
                  {
                    name: 'projects',
                    icon: 'smile',
                    path: '/list/search/projects',
                    component: './list/search/projects',
                  },
                  {
                    name: 'applications',
                    icon: 'smile',
                    path: '/list/search/applications',
                    component: './list/search/applications',
                  },
                ],
              },
              {
                path: '/list',
                redirect: '/list/table-list',
              },
              {
                name: 'table-list',
                icon: 'smile',
                path: '/list/table-list',
                component: './list/table-list',
              },
              {
                name: 'basic-list',
                icon: 'smile',
                path: '/list/basic-list',
                component: './list/basic-list',
              },
              {
                name: 'card-list',
                icon: 'smile',
                path: '/list/card-list',
                component: './list/card-list',
              },
            ],
          },
          {
            path: '/profile',
            name: 'profile',
            icon: 'profile',
            routes: [
              {
                path: '/profile',
                redirect: '/profile/basic',
              },
              {
                name: 'basic',
                icon: 'smile',
                path: '/profile/basic',
                component: './profile/basic',
              },
              {
                name: 'advanced',
                icon: 'smile',
                path: '/profile/advanced',
                component: './profile/advanced',
              },
            ],
          },
          {
            name: 'result',
            icon: 'CheckCircleOutlined',
            path: '/result',
            routes: [
              {
                path: '/result',
                redirect: '/result/success',
              },
              {
                name: 'success',
                icon: 'smile',
                path: '/result/success',
                component: './result/success',
              },
              {
                name: 'fail',
                icon: 'smile',
                path: '/result/fail',
                component: './result/fail',
              },
            ],
          },
          {
            name: 'exception',
            icon: 'warning',
            path: '/exception',
            routes: [
              {
                path: '/exception',
                redirect: '/exception/403',
              },
              {
                name: '403',
                icon: 'smile',
                path: '/exception/403',
                component: './exception/403',
              },
              {
                name: '404',
                icon: 'smile',
                path: '/exception/404',
                component: './exception/404',
              },
              {
                name: '500',
                icon: 'smile',
                path: '/exception/500',
                component: './exception/500',
              },
            ],
          },
          {
            name: 'account',
            icon: 'user',
            path: '/account',
            routes: [
              {
                path: '/account',
                redirect: '/account/center',
              },
              {
                name: 'center',
                icon: 'smile',
                path: '/account/center',
                component: './account/center',
              },
              {
                name: 'settings',
                icon: 'smile',
                path: '/account/settings',
                component: './account/settings',
              },
            ],
          },
          {
            name: 'editor',
            icon: 'highlight',
            path: '/editor',
            routes: [
              {
                path: '/editor',
                redirect: '/editor/flow',
              },
              {
                name: 'flow',
                icon: 'smile',
                path: '/editor/flow',
                component: './editor/flow',
              },
              {
                name: 'mind',
                icon: 'smile',
                path: '/editor/mind',
                component: './editor/mind',
              },
              {
                name: 'koni',
                icon: 'smile',
                path: '/editor/koni',
                component: './editor/koni',
              },
            ],
          },
          {
            path: '/',
            redirect: '/dashboard/analysis',
          },
          {
            component: '404',
          },
        ],
      });
      access = 'user';
      return;
    }

    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/login/outLogin': (req, res) => {
    access = '';
    res.send({
      data: {},
      success: true,
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
      success: true,
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
