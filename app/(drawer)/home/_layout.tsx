import { DrawerToggleButton } from '@react-navigation/drawer';
import { colorTokens } from '@tamagui/themes';
import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from 'tamagui';

const Layout = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Moviestart',
          headerLeft: () => <DrawerToggleButton tintColor="#FFF" />,
        }}
      />
      <Stack.Screen
        name="movie/[id]"
        options={{
          title: 'Moviestart',
        }}
      />
    </Stack>
  );
};

export default Layout;
