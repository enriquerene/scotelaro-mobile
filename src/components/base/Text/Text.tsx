import { styled } from 'tamagui'
import { Text as TextFrame } from 'tamagui'
import type { GetProps } from 'tamagui'

export const Text = styled(TextFrame, {
  name: 'Text',
  variants: {
    variant: {
      h1: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '700',
      },
      h2: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
      },
      body: {
        fontSize: 16,
        lineHeight: 24,
      },
      caption: {
        fontSize: 12,
        lineHeight: 16,
        color: '$textSecondary',
      },
    } as const,
    bold: {
      true: {
        fontWeight: '600',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'body',
  },
})

export type TextProps = GetProps<typeof Text>
