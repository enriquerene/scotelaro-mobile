import {styled, XStack, YStack} from 'tamagui';
import React from "react";
import BottomNavigationItem from "../BottomNavigationItem";

const NavigationContainer = styled(XStack, {
  width: '$full',
  justifyContent: 'space-around',
});

const NavigationItem = styled(YStack, {
  padding: '$md',
});

interface BottomNavigationProps {
  items: string[];
}
const BottomNavigation = ({items}: BottomNavigationProps) => {
    return (
        <NavigationContainer>
            {items.map((item: string, index: number): React.ReactNode => (
                <BottomNavigationItem name={item} key={index} />
            ))}
        </NavigationContainer>
    )
};

export default BottomNavigation;