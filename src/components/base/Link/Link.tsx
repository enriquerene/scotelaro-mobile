import React from 'react'
import { Pressable } from 'react-native'
import { styled, Text } from 'tamagui'

type LinkProps = {
  label: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  underline?: boolean
  disabled?: boolean
  testID?: string
}

const LinkText = styled(Text, {
  name: 'Link',
  fontSize: '$sm',
})

const LinkContainer = styled(Pressable, {
  name: 'LinkContainer',
  padding: 0,
  margin: 0,
})

export const Link = ({
  label,
  onPress,
  variant = 'primary',
  underline = false,
  disabled = false,
  testID,
}: LinkProps) => {
  const handlePress = () => {
    if (!disabled) {
      onPress()
    }
  }

  const linkColorVariants = {
    primary: '$primary',
    secondary: '$secondary',
    success: '$success',
    error: '$error',
    warning: '$warning',
    info: '$info',
    gray: '$gray',
    default: '$primary',
  }

  return (
    <LinkContainer
      onPress={handlePress} 
      disabled={disabled}
      testID={testID}
      hitSlop={8}
    >
      <LinkText
        color={linkColorVariants[variant ?? 'default']}
        textDecorationLine={underline ? 'underline' : 'none'}
        opacity={disabled ? 0.5 : 1}
      >
        {label}
      </LinkText>
    </LinkContainer>
  )
}
