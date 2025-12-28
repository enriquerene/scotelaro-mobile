import {styled, YStack} from "tamagui";
import BottomNavigation from "../../modules/BottomNavigation/BottomNavigation";
import {ReactElement, ReactNode} from "react";

const Screen = styled(YStack, {
  name: 'UserFlowScreen',
  padding: 0,
  margin: 0,
  height: '100%',
  width: '100%',
});

const MainContent = styled(YStack, {
  name: 'UserFlowScreenMainContent',
  padding: 0,
  margin: 0,
  flex: 1,
  overflow: 'scroll',
})

const NavigatonContainer = styled(YStack, {
  name: 'UserFlowScreenNavigationContainer',
  padding: 0,
  margin: 0,
  height: 80,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black'
})

interface UserFlowScreenProps {
  children: ReactElement | ReactNode;
}
const UserFlowScreen = ({children}: UserFlowScreenProps): ReactElement => {
  const navItems = ['financeiro', 'perfil', 'turmas', 'agenda'];
  return (
    <Screen>
      <MainContent>{children}</MainContent>
      <NavigatonContainer>
        <BottomNavigation items={navItems} />
      </NavigatonContainer>
    </Screen>
  )
}

export default UserFlowScreen;