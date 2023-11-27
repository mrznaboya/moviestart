import { View } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';

const Page = () => {
  return (
    <View>
      <Redirect href={'/(drawer)/home/'} />
    </View>
  );
};

export default Page;
