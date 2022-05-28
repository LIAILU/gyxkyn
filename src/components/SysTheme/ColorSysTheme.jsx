import { useCallback } from 'react';
import { Avatar, Menu } from 'antd';
import { useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import { ColorThemeIcon } from '../Icons/index';
import { colorList } from './colorList';
import defaultSettings from '../../../config/defaultSettings';
import { getLocalSettings, setLocalSettings } from '../../utils/localStorageUtils';
import { isEmpty } from '../../utils/assetsUtils';

// 主题选中
let selectedKeys = [isEmpty(getLocalSettings())?defaultSettings.primaryColor.substring(1) : getLocalSettings().primaryColor.substring(1)];

const ColorSysTheme = (props) => {
  const { refresh } = useModel('@@initialState');

  const {
    className
  } = props;

  const onMenuClick = useCallback((event) => {
    const { key } = event;
    const primaryColor = '#' + key;
    selectedKeys[0] = key;
    if(isEmpty(getLocalSettings())){
      defaultSettings.primaryColor = primaryColor;
      setLocalSettings(defaultSettings);
    }else{
      let cusSettings = getLocalSettings();
      cusSettings.primaryColor = primaryColor;
      setLocalSettings(cusSettings);
    }
    refresh()
  });


  const menuHeaderDropdown = (
    <Menu selectedKeys={ selectedKeys } onClick={onMenuClick}>
      {colorList.map((item) => {
        return (
          <Menu.Item key={item.color.substring(1)}>
            <ColorThemeIcon width="16" height="16" style={{ color: item.color }} />
            {item.value}主题
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Avatar
        size="small"
        icon={<ColorThemeIcon style={{ color: defaultSettings.primaryColor }} />}
        alt="avatar"
        style={{ background: '#ffffff' }}
      />
    </HeaderDropdown>
  );
};
export default ColorSysTheme;
