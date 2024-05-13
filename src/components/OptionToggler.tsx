import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import colors from '../shared/colors.ts';

interface OptionTogglerProps {
  enabled?: boolean;
  text: string;
}

const OptionToggler: React.FC<OptionTogglerProps> = ({
  enabled = false,
  text,
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState); // Toggles the state

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.switchContainer,
          { backgroundColor: isEnabled ? colors.primary : colors.grey },
        ]}>
        <Switch
          trackColor={{ false: colors.grey, true: colors.primary }}
          thumbColor={'white'}
          ios_backgroundColor={colors.grey}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
  },
  switchContainer: {
    borderRadius: 16,
  },
  text: {
    color: 'white',
    marginHorizontal: 16,
  },
});

export default OptionToggler;
