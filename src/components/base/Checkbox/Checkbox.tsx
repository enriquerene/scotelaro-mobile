import React from 'react'
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { Checkbox as TamaguiCheckbox, Label, XStack } from 'tamagui'

type CheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  testID?: string
}

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  testID,
  ...props
}: CheckboxProps) => {
  const handlePress = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  const iconSizeMap = {
    small: 16,
    medium: 20,
    large: 24,
  }
  const boxSizeMap = {
    small:4,
    medium: 6,
    large: 8,
  }

  const iconSize = iconSizeMap[size]
  const boxSize = boxSizeMap[size]

  return (
    <XStack
      alignItems="center"
      space="$space.md"
      onPress={handlePress}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
    >
      <TamaguiCheckbox
        testID={testID}
        sizeAdjust={boxSize}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        borderWidth={1}
        borderColor={checked ? '$primary' : '$gray3'}
        backgroundColor={checked ? 'white' : 'transparent'}
        {...props}
      >
        <TamaguiCheckbox.Indicator>
          <CheckIcon color="$primary" size={iconSize * 0.6} />
        </TamaguiCheckbox.Indicator>
      </TamaguiCheckbox>
      
      {label && (
        <Label
          size={size}
          color={disabled ? '$textDisabled' : '$text'}
          htmlFor={testID}
          pressStyle={{ opacity: 0.8 }}
          onPress={handlePress}
        >
          {label}
        </Label>
      )}
    </XStack>
  )
}

export default Checkbox
