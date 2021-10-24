import { receiveDecks } from "./index";
import { fetchDeckList } from "../utils/api";

export function handleInitialData() {
  return (dispatch) => {
    return fetchDeckList().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}
