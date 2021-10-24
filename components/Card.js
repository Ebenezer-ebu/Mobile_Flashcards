import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { purple, white, red } from "../utils/colors";
import { handleDeleteDeck } from "../actions";
import AddCard from "./AddCard";

class Card extends React.Component {
  setTitle = (name) => {
    if (!name) return;

    this.props.navigation.setOptions({ title: name });
  };

  deleteDeck = () => {
    const { item, decks } = this.props.route.params;
    const { navigation, dispatch } = this.props;
    navigation.goBack();
    dispatch(handleDeleteDeck(decks[item], item));
  };

  componentDidMount() {
    const { item, decks } = this.props.route.params;
    this.setTitle(item);
  }

  shouldComponentUpdate(nextProps) {
    const { item } = this.props.route.params;
    if (nextProps.state[item] === undefined) {
      return false;
    } else if (
      nextProps.state[item].questions.length !==
      this.props.state[item].questions.length
    ) {
      return true;
    }
  }
  
  render() {
    const { item } = this.props.route.params;
    const cardLength = this.props.state[item].questions.length;

    return (
      <View style={{ flex: 1, marginTop: 150 }}>
        <Text style={styles.title}>{item}</Text>
        <Text style={styles.title}>{cardLength} Cards</Text>
        <TouchableOpacity
          style={styles.iosSubmitBtn}
          onPress={() => this.props.navigation.navigate("AddCard", { item })}
        >
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iosSubmitBtn}
          onPress={() => this.props.navigation.navigate("Quiz", { item })}
        >
          <Text style={styles.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.deleteDeck}>
          <Text style={styles.delete}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    margin: 5,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
  delete: {
    color: red,
    fontSize: 22,
    textAlign: "center",
    marginTop: 30,
  },
});

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Card);
