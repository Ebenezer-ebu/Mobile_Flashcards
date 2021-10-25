import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { newDeck } from "../actions";
import { white, green, gray } from "../utils/colors";
import { uniqueId } from "../utils/helpers";

function AddDeck(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    const { dispatch, state, navigation } = props;
    let details = {
      title: data.title,
      entry: { title: data.title, questions: [], id: uniqueId() },
    };
    let key = Object.keys(state);
    if (!key.includes(data.title)) {
      const item = data.title;
      const decks = state;
      dispatch(newDeck(details));
      navigation.navigate('Card', {decks, item});
    } else {
      Alert.alert(
        "Alert Title",
        "You can't add a deck with a title that has been added before",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
  };

  console.log("errors", errors);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>What is the title of your new deck?</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="title"
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: white,
    margin: 20,
    marginLeft: 0,
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    backgroundColor: gray,
  },
  input: {
    backgroundColor: white,
    height: 50,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: green,
    alignSelf: "center",
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(AddDeck);
