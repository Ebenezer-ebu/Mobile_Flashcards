import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { gray, white } from '../utils/colors';

function DeckList({ deck, item }) {
    const list = deck;
    const cardLength = list[item].questions.length;
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item}</Text>
        <Text style={styles.title}>{cardLength} Cards</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: gray,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
      fontSize: 20,
      color: white,
  },
});

export default connect()(DeckList);