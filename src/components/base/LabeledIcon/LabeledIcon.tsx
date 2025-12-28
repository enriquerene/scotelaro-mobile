import { YStack, Text, styled } from "tamagui"

interface LabeledIconProps {
    icon: React.ReactNode;
    label: string;
    color?: string;
    bold?: boolean;
}

const Container = styled(YStack, {
  name: 'LabeledIconContainer',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$xs',
  width: '$iconBox',
  height: '$iconBox',
});


const LabeledIcon = ({ icon, label, color, bold = false }: LabeledIconProps) => {

    return (
        <Container>
            {icon}
            <Text
              color={color ?? 'white'}
              fontSize={10}
              fontWeight={bold ? 'bold' : 'normal'}
            >{label}</Text>
        </Container>
    )
}

export default LabeledIcon;