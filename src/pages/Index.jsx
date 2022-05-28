import { Avatar, Card, Col, List, Row, Tag, Button, Carousel,Tooltip } from 'antd';
import React, { useState } from 'react';
import { Radar } from '@ant-design/charts';
import { Link, useRequest } from 'umi';
import moment from 'moment';
import styles from './dashboard/workplace/style.less';
import { queryProjectNotice, queryActivities, fakeChartData } from './dashboard/workplace/service';
import ArticleListContent from './list/search/articles/components/ArticleListContent';
import { LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined, SoundTwoTone, RedoOutlined, ReloadOutlined } from '@ant-design/icons';
import { queryFakeList } from './list/search/articles/service';
import solarLunar from '../utils/solarLunar';
import defaultSettings from '../../config/defaultSettings';
import { getLocalSettings } from '../utils/localStorageUtils';
import { isEmpty } from '../utils/assetsUtils';

const pageSize = 5;
// 链接内容
const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

// 字体文字图标
const IconText = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'like-o':
        return (
          <span>
            <LikeOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'message':
        return (
          <span>
            <MessageOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      default:
        return null;
    }
  };

// 轮播图 样式
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
// 标签页 标题
const tabListNoTitle = [
    {
      key: 'webNotice',
      tab: '网站公告'
    },
    {
      key: 'contactUs',
      tab: '联系我们'
    }
  ];
// 标签页具体内容
const contentListNoTitle = {
  webNotice: [
    {
      noticeContent: '第一次发布',
      noticeTime: '2021-05-08 11:12:13'
    },
    {
      noticeContent: '第一次发布sdadadsd',
      noticeTime: '2021-05-08 11:12:14'
    },
    {
      noticeContent: '第一次发布测试案例博是第四十asd4ad45d45s4d5fsd54f',
      noticeTime: '2021-05-08 11:12:15'
    }
  ],
  contactUs: <h2 text-align="center" >
              Email: <br />
              <a href="mailto:1638676121@qq.com" >1638676121@qq.com</a>
            </h2>,
  };

const Index = () => {
  const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  const { data } = useRequest(fakeChartData);
  const { data: articlesData, reload: articlesReload, loading: articlesLoading, loadMore, loadingMore } = useRequest(
    () => {
      return queryFakeList({
        count: pageSize,
      });
    },
    {
      loadMore: true,
    },
  );

  let primaryColor = isEmpty(getLocalSettings())? defaultSettings.primaryColor : getLocalSettings().primaryColor;

  const list = articlesData?.list || [];

  const loadMoreDom = list.length > 0 && (
        <div
            style={{
            textAlign: 'center',
            marginTop: 16,
            }}
        >
            <Button
            onClick={loadMore}
            style={{
                paddingLeft: 48,
                paddingRight: 48,
            }}
            >
            {loadingMore ? (
                <span>
                <LoadingOutlined /> 加载中...
                </span>
            ) : (
                '加载更多'
            )}
            </Button>
        </div>
    );

    const [activeTabKey1, setActiveTabKey1] = useState('webNotice');
  
    const onTab1Change = key => {
      setActiveTabKey1(key);
    };
  const { lunarDate, lunarDateSecond } = solarLunar.getLunarDate();

  const renderActivities = (item) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
      
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{
              marginBottom: 24,
            }}
            title={ <span className='selfHoverColor' > 【今日推荐】 </span> }
            bordered={false}
            loading={projectLoading}
            bodyStyle={{
                padding: '8px 32px 32px 32px',
            }}
          >
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Card>
          <Card
            className={styles.projectList}
            style={{
              marginBottom: 24,
            }}
            title={ <span className='selfHoverColor' > 最新发布 </span> }
            bordered={false}
            extra={<Link to="/">全部项目</Link>}
            loading={projectLoading}
            bodyStyle={{
                padding: '8px 32px 32px 32px',
            }}
          >
            <List
                size="large"
                loading={articlesLoading}
                rowKey="id"
                itemLayout="vertical"
                loadMore={loadMoreDom}
                dataSource={list}
                renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                    <IconText key="star" type="star-o" text={item.star} />,
                    <IconText key="like" type="like-o" text={item.like} />,
                    <IconText key="message" type="message" text={item.message} />,
                    ]}
                    // extra={''}
                >
                    <List.Item.Meta
                    title={
                        <a className={styles.listItemMetaTitle} href={item.href}>
                        {item.title}
                        </a>
                    }
                    description={
                        <span>
                        <Tag>Ant Design</Tag>
                        <Tag>设计语言</Tag>
                        <Tag>蚂蚁金服</Tag>
                        </span>
                    }
                    />
                    <ArticleListContent data={item} />
                </List.Item>
                )}
            />
          </Card>
          <Card
            bodyStyle={{
              padding: 0,
            }}
            bordered={false}
            className={styles.activeCard}
            title={ <span className='selfHoverColor' > 最新全网动态 </span> }
            loading={activitiesLoading}
          >
            <List
              loading={activitiesLoading}
              renderItem={(item) => renderActivities(item)}
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ width: '100%',marginBottom: 24, }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey1}
            tabBarExtraContent={ activeTabKey1 === 'contactUs' ? '' : <a> More </a> }
            onTabChange={key => {
              onTab1Change(key);
            }}
            bordered={false}
            bodyStyle={{
              padding: '0 16px',
            }}
          >
            { activeTabKey1 === 'contactUs' ? <div style={{ textAlign: 'center' }}>{ contentListNoTitle[activeTabKey1] }</div> : 
              <List
              itemLayout="horizontal"
              dataSource={contentListNoTitle[activeTabKey1]}
              renderItem={(item, index) => (
                <Tooltip placement="left" title={ item.noticeContent } color="#00fdff">
                  <List.Item 
                  style={{ cursor: "pointer" }}
                  >
                    <List.Item.Meta
                      avatar={index === 0 ? <SoundTwoTone twoToneColor="#F5222D" /> : 
                            index === 1 ?  <SoundTwoTone twoToneColor="#FA541C" /> :
                            <SoundTwoTone twoToneColor="#FAAD14" />
                            }
                      description={item.noticeContent.length > 9 ? item.noticeContent.substring(0,9) + '...' : item.noticeContent}
                    />
                    <div><a >{ item.noticeTime }</a></div>
                  </List.Item>
                </Tooltip>
              )}
            />
            }
          </Card>
          <Card
            style={{
              marginBottom: 24,
            }}
            title={ <span className='selfHoverColor' > 躲在时光深处~ </span> }
            extra={<Link to="/"><ReloadOutlined /> 换一换</Link>}
            bordered={false}
            bodyStyle={{
              padding: '0 16px',
            }}
          >
              <h4><font style={{ fontFamily:'STXingkai',fontSize:'20px',color: primaryColor }}><b>{ lunarDate }</b></font></h4>
              <h4><font style={{ fontFamily:'STXingkai',fontSize:'20px',color: primaryColor }} ><b>{ lunarDateSecond }</b></font></h4>
              <p><font style={{ fontFamily:'STXingkai',fontSize:'22px' }}>时间是不会等人的,等你的人是我</font></p>
          </Card>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title={ <span className='selfHoverColor' > 热门文章 </span> }
            loading={data?.radarData?.length === 0}
            bodyStyle={{
              padding: '8px 32px 32px 32px',
            }}
          >
            <List
                size="large"
                loading={articlesLoading}
                rowKey="id"
                itemLayout="vertical"
                loadMore={loadMoreDom}
                dataSource={list}
                renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                    <IconText key="star" type="star-o" text={item.star} />,
                    <IconText key="like" type="like-o" text={item.like} />,
                    <IconText key="message" type="message" text={item.message} />,
                    ]}
                    extra={<div className={styles.listItemExtra} />}
                >
                    <List.Item.Meta
                    title={
                        <a className={styles.listItemMetaTitle} href={item.href}>
                        {item.title}
                        </a>
                    }
                    description={
                        <span>
                        <Tag>Ant Design</Tag>
                        <Tag>设计语言</Tag>
                        <Tag>蚂蚁金服</Tag>
                        </span>
                    }
                    />
                    <ArticleListContent data={item} />
                </List.Item>
                )}
            />
          </Card>
          <Card
            bodyStyle={{
              paddingTop: 12,
              paddingBottom: 12,
            }}
            bordered={false}
            title={ <span className='selfHoverColor' > 友情链接 </span> }
            loading={projectLoading}
          >
            <div className={styles.members}>
              <Row gutter={48}>
                {projectNotice.map((item) => (
                  <Col span={12} key={`members-item-${item.id}`}>
                    <Link to={item.href}>
                      <Avatar src={item.logo} size="small" />
                      <span className={styles.member}>{item.member}</span>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
  );
};

export default Index;
