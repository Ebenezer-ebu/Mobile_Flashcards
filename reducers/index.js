import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  NEW_CARD,
} from "../actions/index";

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case REMOVE_DECK:
      // delete state[action.id];
      const { id } = action;
      const { [id]: value, ...rest } = state;
      return rest;
    case NEW_CARD:
      const { title, question, answer, checkAnswer } = action.info;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.concat([
            { question, answer, checkAnswer },
          ]),
        },
      };
    default:
      return state;
  }
}

export default entries;
