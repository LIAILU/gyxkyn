import { useCallback } from 'react';
import { Avatar } from 'antd';
import { useModel } from 'umi';
import { DarkThemeIcon, LightThemeIcon } from '../Icons/index';
import defaultSettings from '../../../config/defaultSettings';
import { getLocalSettings, setLocalSettings } from '../../utils/localStorageUtils';
import { isEmpty } from '../../utils/assetsUtils';

// theme 类型
let navTheme = isEmpty(getLocalSettings())?defaultSettings.navTheme : getLocalSettings().navTheme;

const SysTheme = (props) => {
  const { refresh } = useModel('@@initialState');

  const onThemeClick = useCallback((event) => {
    if( navTheme === 'light' ){
        navTheme = 'realDark';
    }else{
        navTheme = 'light';
    }
    if(isEmpty(getLocalSettings())){
      defaultSettings.navTheme = navTheme;
      setLocalSettings(defaultSettings);
    }else{
      let cusSettings = getLocalSettings();
      cusSettings.navTheme = navTheme;
      setLocalSettings(cusSettings);
    }
    refresh()
  });

  return (
      <Avatar
        onClick={onThemeClick}
        size="small"
        icon={navTheme === "light" ? <DarkThemeIcon style={{ color: defaultSettings.primaryColor }} /> : <LightThemeIcon style={{ color: defaultSettings.primaryColor }} />  }
        alt="avatar"
        style={{ background: '#ffffff' }}
      />
  );
};
export default SysTheme;
