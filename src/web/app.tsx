import React, { useEffect, useState } from 'react';
import { ConfigProvider, Spin, Typography, theme } from 'antd';
import { auto } from 'manate/react';

import type { Store } from './store';
import CONSTS from '../constants';

const { Title } = Typography;

const App = (props: { store: Store }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const disposer = global.ipc.on(CONSTS.IS_DARK_MODE, (event, isDarkMode) => {
      document.body.style.backgroundColor = (isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm)(
        theme.defaultSeed,
      ).colorBgContainer;
      setIsDark(isDarkMode);
    });
    global.ipc.invoke(CONSTS.IS_DARK_MODE);
    return disposer;
  }, []);
  const render = () => {
    return (
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <Title>RingCentral WebHook Consumer</Title>
        <Spin />
      </ConfigProvider>
    );
  };
  return auto(render, props);
};

export default App;
