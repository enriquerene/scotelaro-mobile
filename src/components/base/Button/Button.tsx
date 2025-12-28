import React from 'react'
import { Button as ButtonFrame, styled } from 'tamagui'
import type { GetProps } from 'tamagui'



// Base styled button component
const StyledButton = styled(ButtonFrame, {
  name: 'Button',
  variants: {
    variant: {
      'solid-primary': {
        backgroundColor: '$primary',
        color: '$white',
        hoverStyle: { backgroundColor: '$primaryDark' },
        pressStyle: { backgroundColor: '$primaryDark' },
      },
      'solid-secondary': {
        backgroundColor: '$secondary',
        color: '$white',
        hoverStyle: { backgroundColor: '$secondaryDark' },
        pressStyle: { backgroundColor: '$secondaryDark' },
      },
      'outline-primary': {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$primary',
        color: '$primary',
        hoverStyle: { backgroundColor: '$primary', color: '$white' },
        pressStyle: { backgroundColor: '$primaryDark', color: '$white' },
      },
      'outline-secondary': {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$secondary',
        color: '$secondary',
        hoverStyle: { backgroundColor: '$secondary', color: '$white' },
        pressStyle: { backgroundColor: '$secondaryDark', color: '$white' },
      },
    } as const,
    size: {
      small: { height: 32, paddingHorizontal: 12, borderRadius: 6 },
      medium: { height: 40, paddingHorizontal: 16, borderRadius: 8 },
      large: { height: 48, paddingHorizontal: 24, borderRadius: 10 },
    } as const,
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'solid-primary',
    size: 'medium',
  },
})

/**
 * Props for the Button component
 */
export interface ButtonProps extends Omit<GetProps<typeof StyledButton>, 'variant'> {
  variant?: 'solid' | 'outline'
  color?: 'primary' | 'secondary'
}

/**
 * A customizable button component with separate variant and color props.
 * Supports solid/outline variants and primary/secondary colors.
 */
export const Button = React.forwardRef<
  React.ElementRef<typeof StyledButton>,
  ButtonProps
>(({ variant = 'solid', color = 'primary', ...props }, ref) => {
  const combinedVariant = `${variant}-${color}` as const
  
  return (
    <StyledButton
      ref={ref}
      variant={combinedVariant}
      {...props}
    />
  )
})

Button.displayName = 'Button'
