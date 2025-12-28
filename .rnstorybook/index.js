import { getStorybookUI } from '@storybook/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { config } from '../tamagui.config';

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({
  // Async storage is disabled because we don't have async storage in web
  asyncStorage: null,
  // Enable on-device UI
  onDeviceUI: true,
  // Persist story selection between app reloads
  shouldPersistSelection: true,
  // Enable keyboard avoiding view
  shouldDisableKeyboardAvoidingView: false,
  // Theme configuration
  theme: {
    backgroundColor: '#fff',
    headerTextColor: '#000',
    labelColor: '#000',
    borderColor: '#e6e6e6',
    previewBorderColor: '#b3b3b3',
    buttonTextColor: '#999',
    buttonActiveTextColor: '#000',
  },
});

// Wrap the Storybook UI with necessary providers
function StorybookUIRootWithProviders() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <StorybookUIRoot />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

export default StorybookUIRootWithProviders;
