import { deleteDeck, saveDeck, save_card } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const NEW_CARD = "NEW_CARD";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

function addCard(info) {
  return {
    type: NEW_CARD,
    info,
  };
}

function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  };
}

export function handleDeleteDeck(deck, id) {
  return (dispatch) => {
    console.log(deck, id, 'From dispatch')
    dispatch(removeDeck(id));

    return deleteDeck(id).catch(() => {
      const info = {title : id, entry: deck}
      dispatch(newDeck(info));
      alert("An error Occured. Try again!!!");
    });
  };
}

export function newDeck(info) {
  console.log(info, "yessssssssssss");
  return (dispatch) => {
    const { title, entry } = info;
    const details = { [title]: entry };

    return saveDeck(info).then(dispatch(addDeck(details))).catch((e) => {
      console.log(e);
      alert("Something went wrong. Try again!!", e);
    });
  };
}

export function saveCard(info) {
  return (dispatch) => {
    dispatch(addCard(info));
    return save_card(info).catch((e) => {
        console.log(e);
        alert("Something went wrong. Try again!!", e);
      });
  };
}
