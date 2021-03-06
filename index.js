import React from "react";
import { View, PanResponder, NativeModules, Platform } from "react-native";

const { RNDevmenuTrigger, DevMenu } = NativeModules;

const PlatformDevMenu = Platform.select({
  ios: DevMenu,
  android: RNDevmenuTrigger,
  default: { show: () => {} }
});

const responder = PanResponder.create({
  onStartShouldSetPanResponder: (evt, gestureState) => {
    if (gestureState.numberActiveTouches === 3) {
      PlatformDevMenu.show();
    }
    return false;
  }
});

const withDevMenuTrigger = WrappedComponent => props => {
  if (!__DEV__) {
    return <WrappedComponent {...props} />;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: null
      }}
      {...responder.panHandlers}>
      <WrappedComponent {...props} />
    </View>
  );
};

export { withDevMenuTrigger };
