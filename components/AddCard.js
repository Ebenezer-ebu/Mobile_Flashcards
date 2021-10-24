import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { white, green, gray } from "../utils/colors";
import { saveCard } from "../actions";

function AddCard(props) {
  const [value, setValue] = useState("correct");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    const { dispatch, navigation } = props;
    const { item: title } = props.route.params;
    const checkAnswer = value;
      dispatch(saveCard({ ...data, checkAnswer, title }));
      navigation.goBack();
  };
  console.log("errors", errors);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.label}>Question</Text>
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
        name="question"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Answer</Text>
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
        name="answer"
        rules={{ required: true }}
      />
      <Text style={styles.label2}>Correct / Incorrect</Text>
      <RadioButton.Group
        onValueChange={(value) => setValue(value)}
        value={value}
      >
        <RadioButton.Item label="Correct" value="correct" />
        <RadioButton.Item label="Incorrect" value="incorrect" />
      </RadioButton.Group>
      <KeyboardAvoidingView behavior="padding" style={styles.button}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  label2: {
    color: white,
    marginTop: 20,
    marginLeft: 0,
    fontSize: 20,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 8,
    backgroundColor: gray,
  },
  input: {
    backgroundColor: white,
    height: 50,
    padding: 10,
    borderRadius: 5,
  },
  drop: {
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

export default connect(mapStateToProps)(AddCard);
