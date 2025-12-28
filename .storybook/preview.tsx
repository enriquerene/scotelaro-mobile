import type { Preview } from "@storybook/react";
import { TamaguiProvider, Theme } from 'tamagui';
import { config } from '../tamagui.config';
import React from 'react';
import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';

const withTamagui = (StoryFn, context) => {
  const isDark = context.globals.backgrounds?.value === '#333333' || context.globals.theme === 'dark';
  const themeName = isDark ? 'dark' : 'light';
  
  return (
    <TamaguiProvider config={config} defaultTheme={themeName}>
      <Theme name={themeName}>
        <div style={{
          backgroundColor: isDark ? '#000' : '#fff',
          color: isDark ? '#fff' : '#000',
        }}>
          <StoryFn />
        </div>
      </Theme>
    </TamaguiProvider>
  );
};

const preview: Preview = {
  decorators: [withTamagui],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
    docs: {
      inlineStories: false,
      source: {
        state: 'open',
      },
      container: ({children, context}) => (
        <TamaguiProvider config={config} defaultTheme="light">
          <Theme name="light">
            <div style={{margin: 0, padding: 0}}>{children}</div>
          </Theme>
        </TamaguiProvider>
      ),
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      // defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        showName: true,
      },
    },
  },
  // tags: ["autodocs"]
};

export default preview;
