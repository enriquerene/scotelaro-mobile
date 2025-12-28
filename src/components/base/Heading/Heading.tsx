import React from 'react'
import { Text, TextProps } from '../Text/Text'
import { styled } from 'tamagui'

type HeadingProps = TextProps & {
  title: string
  align?: 'left' | 'center' | 'right'
  size?: 'small' | 'medium' | 'large'
  testID?: string
}

const sizeMap = {
  small: 'h3',
  medium: 'h2',
  large: 'h1',
} as const

const StyledHeading = styled(Text, {
  name: 'Heading',
  variants: {
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
  } as const,
  defaultVariants: {
    align: 'left',
  },
})

export const Heading = ({
  title,
  align = 'left',
  size = 'medium',
  testID,
  ...props
}: HeadingProps) => {
  const variant = sizeMap[size]
  
  return (
    <StyledHeading
      testID={testID}
      variant={variant}
      align={align}
      {...props}
    >
      {title}
    </StyledHeading>
  )
}
