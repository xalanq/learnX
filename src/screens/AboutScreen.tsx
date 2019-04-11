import React from "react";
import { Linking, SafeAreaView, ScrollView } from "react-native";
import { iOSUIKit } from "react-native-typography";
import Text from "../components/Text";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import { INavigationScreen } from "../types/NavigationScreen.js";

const AboutScreen: INavigationScreen<{}> = () => {
  const onGitHubLinkPress = () => {
    Linking.openURL("https://github.com/robertying/learnX");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 30,
          paddingBottom: 30
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            marginBottom: 20,
            fontSize: iOSUIKit.bodyObject.fontSize
          }}
        >
          Copyright (c) 2019 Rui Ying
        </Text>
        <TextButton
          style={{
            alignSelf: "center",
            marginBottom: 20,
            fontSize: iOSUIKit.bodyObject.fontSize
          }}
          onPress={onGitHubLinkPress}
        >
          robertying / learnX @ GitHub
        </TextButton>
      </ScrollView>
    </SafeAreaView>
  );
};

// tslint:disable-next-line: no-object-mutation
AboutScreen.navigationOptions = {
  title: "关于"
};

export default AboutScreen;