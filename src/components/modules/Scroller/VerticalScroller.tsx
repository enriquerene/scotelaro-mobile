import {styled, YStack} from "tamagui";

export default styled(YStack, {
  height: '100%',
  width: '100%',
  overflow: 'scroll',
  padding: '$sm',
  gap: '$sm',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none'
  },
});