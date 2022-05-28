import { List, Switch } from 'antd';
import React, { Fragment } from 'react';
import $ from 'jquery';
import defaultSettings from '../../../../../config/defaultSettings';
import { getLocalSettings, setLocalSettings } from '../../../../utils/localStorageUtils';
import { isEmpty } from '../../../../utils/assetsUtils';

const hideSettingsDrawChange = (checked, event) => {
  if(isEmpty(getLocalSettings())){
    defaultSettings.hideSettingsDraw = !checked;
    setLocalSettings(defaultSettings);
  }else{
    let cusSettings = getLocalSettings();
    cusSettings.hideSettingsDraw = !checked;
    setLocalSettings(cusSettings);
  }
  if(checked){
    $('body').removeClass('hideSettingsDraw')
  }else{
    $('body').addClass('hideSettingsDraw')
  }
}

const AnotherView = () => {
  const getData = () => {
    let hideSettingsDraw ;
    if(isEmpty(getLocalSettings())){
      hideSettingsDraw = !(defaultSettings.hideSettingsDraw);
    }else{
      hideSettingsDraw = !(getLocalSettings().hideSettingsDraw);
    }
    let Action ;
    if(hideSettingsDraw){
      Action = <Switch checkedChildren="显示" unCheckedChildren="隐藏" onChange={hideSettingsDrawChange} defaultChecked />;
    }else{
      Action = <Switch checkedChildren="显示" unCheckedChildren="隐藏" onChange={hideSettingsDrawChange} />;
    }
    
    return [
      {
        title: '全局样式小齿轮',
        description: '是否显示全局样式小齿轮',
        actions: [Action],
      },
    ];
  };

  const data = getData();
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default AnotherView;
