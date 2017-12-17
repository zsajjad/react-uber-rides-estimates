# React UBER Rides Estimates
> React Higher Order Component to get Uber Rides Estimates

### This is not the wrapper for [UBER Rides SDK Native Solution](https://developer.uber.com/docs/riders/ride-requests/introduction). Please refer to [React Native UBER Rides](https://github.com/Kureev/react-native-uber-rides) for native solution.

## Install
```
npm install react-uber-rides-estimates
```

## How to use
```js
import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import UberButton from "./app/react-uber-rides";

export default class TestingApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <UberButton
          clientId="your.uber.client.id"
          serverToken="your.uber.server.token"
        >
          {uberRides => {
            if (uberRides.loading) {
              return <ActivityIndicator />;
            }
            if (uberRides.priceEstimate) {
              return (
                <Text>
                  {JSON.stringify(uberRides.priceEstimate)}
                </Text>
              );
            }
            if (uberRides.timeEstimate) {
              return (
                <Text>
                  {JSON.stringify(uberRides.timeEstimate)}
                </Text>
              );
            }
            return (
              <TouchableOpacity
                onPress={() =>
                  uberRides.getPriceEstimate({
                    pickupLocation: {
                      lat: 37.775304,
                      long: -122.417522,
                      nickname: "Uber HQ",
                      formattedAddress: "1455 Market Street, San Francisco"
                    },
                    dropoffLocation: {
                      lat: 37.795079,
                      long: -122.4397805,
                      nickname: "Embarcadero",
                      formattedAddress: "One Embarcadero Center, San Francisco"
                    }
                  })}
              >
                <View>
                  <Text>Ride with UBER</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        </UberButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
});

AppRegistry.registerComponent("TestingApp", () => TestingApp);
```

### API

documentation coming soon


### Follow me on Twitter: [@zsajjad93](https://twitter.com/zsajjad93)
