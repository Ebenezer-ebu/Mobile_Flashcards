import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { white } from "../utils/colors";
import DeckList from "./DeckList";
import Card from "./Card";
import { handleInitialData } from "../actions/shared";

class Decks extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  render() {
    const { decks } = this.props;
    const keys = Object.keys(decks);
    if (keys.length === 0) {
      return (
        <View style={styles.item}>
          <Text style={styles.noDataText}>
            You Have Not Added Any Decks Yet. Proceed To Clicking On The Add
            Deck Button To Add A Deck
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.noDataText}>Your Decks</Text>
        <FlatList
          data={keys}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Card", { decks, item })
              }
            >
              <DeckList deck={decks} item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => decks[item].id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    decks: state,
  };
}

export default connect(mapStateToProps)(Decks);
