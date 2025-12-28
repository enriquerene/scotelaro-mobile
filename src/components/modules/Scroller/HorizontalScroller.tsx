import {styled, XStack} from "tamagui";

export default styled(XStack, {
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