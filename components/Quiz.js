import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import QuizList from "./QuizList";
import { gray, white } from "../utils/colors";

function Quiz(props) {
  const { route, state } = props;
  const { item } = route.params;
  if (state[item].questions.length === 0) {
    return (
      <View style={styles.item}>
        <Text style={styles.noDataText}>
          Sorry, you cannot take a quiz because there are no cards in the deck.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <QuizList questions={state[item].questions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: gray,
  },
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 14 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 200,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noDataText: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Quiz);
