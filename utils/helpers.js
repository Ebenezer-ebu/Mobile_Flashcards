import React from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

const NOTIFICATIONS_KEY = "MobileFlash:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Log your stats",
    body: "👋🏼 don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    andriod: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function getNewQuestion(arr, index) {
  return arr.filter((el, i) => i === index);
}

export function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};
