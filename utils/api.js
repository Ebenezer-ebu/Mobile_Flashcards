import AsyncStorage from "@react-native-async-storage/async-storage";

export const DECK_STORAGE_KEY = "Mobile:flashcard";

export function fetchDeckList() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) =>
    JSON.parse(results)
  );
}

export function deleteDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    // data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}

export async function saveDeck({ entry, title }) {
  try {
    let value = await fetchDeckList();
    if (!value) {
      return AsyncStorage.setItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [title]: entry,
        })
      );
    }
    if (!Object.keys(value).includes(title)) {
      return AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({
          [title]: entry,
        })
      );
    } else {
      throw new Error("You can't have cards of same name");
    }
  } catch (error) {
    return "Error: ", error;
  }
}

export function save_card({ title, question, answer, checkAnswer }) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title] = {
        ...data[title],
        questions: data[title].questions.concat([
          { question, answer, checkAnswer },
        ]),
      };

      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
}
