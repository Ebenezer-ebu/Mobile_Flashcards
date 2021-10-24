import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import reducer from "./reducers";
import middleware from "./middleware";
import { setLocalNotification } from "./utils/helpers";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import Card from "./components/Card";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { purple, white } from "./utils/colors";

function MobileStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 56,
          backgroundColor: Platform.OS === "ios" ? white : purple,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
        tabBarActiveTintColor: Platform.OS === "ios" ? purple : white,
      }}
    >
      <Tabs.Screen
        name="Decks"
        component={Decks}
        options={{
          headerShown: false,
          tabBarLabel: "DECKS",
          tabBarIcon: ({ tintColor }) => (
            <Ionicons
              name="file-tray-stacked-outline"
              size={30}
              color={tintColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          headerShown: false,
          tabBarLabel: "ADD DECK",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="plus-square" size={30} color={tintColor} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Card"
          component={Card}
          options={{
            headerTintColor: white,
            headerStyle: {
              backgroundColor: purple,
            },
          }}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={{
            headerTintColor: white,
            headerStyle: {
              backgroundColor: purple,
            },
          }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{
            headerTintColor: white,
            headerStyle: {
              backgroundColor: purple,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const store = createStore(reducer, middleware);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MobileStatusBar backgroundColor={purple} barStyle="light-content" />
          <MyStack />
          <StatusBar style="auto" />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
