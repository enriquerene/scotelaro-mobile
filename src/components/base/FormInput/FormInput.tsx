import React, { useState, useEffect } from 'react'
import { Input as TamaguiInput, YStack, Label, Text, styled } from 'tamagui'
import { Eye, EyeOff } from '@tamagui/lucide-icons'

type FormInputProps = {
  label: string
  type?: 'text' | 'password' | 'email' | 'phone'
  initialValue?: string
  onValidate?: (value: string) => boolean
  error?: string
  onChangeText?: (text: string) => void
  testID?: string
}

export const FormInput = ({
  label,
  type = 'text',
  initialValue = '',
  onValidate,
  error,
  onChangeText,
  testID,
  ...props
}: FormInputProps) => {
  const [value, setValue] = useState(initialValue)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (onValidate && value) {
      setIsValid(onValidate(value))
    } else {
      setIsValid(null)
    }
  }, [value, onValidate])

  const handleChange = (text: string) => {
    setValue(text)
    if (onChangeText) {
      onChangeText(text)
    }
  }

  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address'
      case 'phone':
        return 'phone-pad'
      default:
        return 'default'
    }
  }

  const isPassword = type === 'password'
  const showPasswordToggle = isPassword

  const FieldContainer = styled(YStack, {
    name: 'FormFieldContainer',
    width: '$max',
    space: '$sm',
    marginVertical: '$md',
  });
  const InputContainer = styled(YStack, {
    name: 'FormInputContainer',
    width: '$full',
    flexDirection: 'row',
    marginVertical: 0,
    paddingVertical: '$sm',
    paddingHorizontal: '$xs',
    alignItems: 'center',
    borderColor: '$gray3',
    borderWidth: 1,
    borderRadius: '$md',
  });
  const Input = styled(TamaguiInput, {
    name: 'FormInput',
    borderWidth: 0,
    flex: 1,
    padding: '$xs',
  });
  const IconContainer = styled(YStack, {
    name: 'FormInputIconContainer',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '$sm',
    pressStyle: { opacity: 0.5 },
  });
  const ErrorMessage = styled(Text, {
    name: 'FormInputErrorMessage',
    color: '$error',
    fontSize: '$sm',
    marginTop: 0,
  });

  return (
    <FieldContainer>
      <Label htmlFor={label} fontSize="$lg" color="$text">
        {label}
      </Label>
      <InputContainer position="relative">
        <Input
          id={label}
          testID={testID}
          value={value}
          onChangeText={handleChange}
          secureTextEntry={isPassword && !isPasswordVisible}
          keyboardType={getKeyboardType()}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          autoCorrect={type !== 'email'}
          autoComplete={type === 'email' ? 'email' : type === 'password' ? 'password' : 'off'}
          {...props}
        />
        {showPasswordToggle && (
          <IconContainer onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <EyeOff size="$lg" color="$color10" />
            ) : (
              <Eye size="$lg" color="$color10" />
            )}
          </IconContainer>
        )}
      </InputContainer>
      {(error || isValid === false) && (
        <ErrorMessage>{error || 'Validation failed'}</ErrorMessage>
      )}
    </FieldContainer>
  )
}
