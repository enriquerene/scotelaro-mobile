import { TamaguiProvider } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { config } from '../tamagui.config';

export const decorators = [
  (Story) => (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Story />
      </TamaguiProvider>
    </SafeAreaProvider>
  ),
];

export default decorators;
