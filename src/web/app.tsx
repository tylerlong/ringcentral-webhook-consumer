import React, { useEffect, useState } from 'react';
import { ConfigProvider, Typography, theme } from 'antd';
import { auto } from 'manate/react';

import type { Store } from './store';
import CONSTS from '../constants';

const { Title, Paragraph } = Typography;

const App = (props: { store: Store }) => {
  const { store } = props;
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
  useEffect(() => {
    return global.ipc.on(CONSTS.PUBLIC_URL, (event, payload) => {
      store.publicUrl = payload;
    });
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
        {store.publicUrl.length > 0 && (
          <>
            <Paragraph>{store.publicUrl}</Paragraph>
            <Paragraph>
              <a href="http://localhost:4040" target="_blank">
                Check traffic
              </a>
            </Paragraph>
          </>
        )}
      </ConfigProvider>
    );
  };
  return auto(render, props);
};

export default App;
