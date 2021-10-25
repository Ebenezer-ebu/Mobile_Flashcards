import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { gray, green, white, purple } from "../utils/colors";
import { getNewQuestion } from "../utils/helpers";

function QuizList(props) {
  const [quiz, setQuiz] = useState({
    index: 0,
    count: 1,
    grade: 0,
    showAnswer: false,
    set: [],
  });
  const { questions, state, navigation} = props;
  console.log(props);
  const handleCorrect = () => {
    const { set } = quiz;
    setQuiz({
      ...quiz,
      count:
        quiz.count === questions.length ? questions.length : quiz.count + 1,
      index:
        quiz.index === questions.length ? questions.length : quiz.index + 1,
      grade: set[0].checkAnswer === "correct" ? quiz.grade + 1 : quiz.grade,
    });
  };

  const handleIncorrect = () => {
    const { set } = quiz;
    setQuiz({
      ...quiz,
      count:
        quiz.count === questions.length ? questions.length : quiz.count + 1,
      index:
        quiz.index === questions.length ? questions.length : quiz.index + 1,
      grade: set[0].checkAnswer === "incorrect" ? quiz.grade + 1 : quiz.grade,
    });
  };

  const handleRestart = () => {
    setQuiz({
      index: 0,
      count: 1,
      grade: 0,
      showAnswer: false,
      set: [],
    });
  };

  const handleSwap = () => {
    setQuiz({
      ...quiz,
      showAnswer: !quiz.showAnswer,
    });
  };

  useEffect(() => {
    const setArr = getNewQuestion(questions, quiz.index);
    setQuiz({ ...quiz, set: setArr });
  }, [quiz.index]);

  if (quiz.index === questions.length) {
    const percentScore = (quiz.grade / questions.length) * 100;
    return (
      <View style={styles.container}>
        <Text style={styles.question}>
          Horray!!!, you have finished answering all the questions
        </Text>
        <Text style={styles.length}>Score: {percentScore} % </Text>
        <View style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.length}>
        {quiz.count} / {questions.length}
      </Text>
      <FlatList
        data={quiz.set}
        renderItem={({ item }) => (
          <View>
            {quiz.showAnswer ? (
              <View>
                <Text style={styles.answer}>{item.answer}</Text>
                <TouchableOpacity onPress={handleSwap}>
                  <Text style={styles.question}>Question</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.question}>{item.question}</Text>
                <TouchableOpacity onPress={handleSwap}>
                  <Text style={styles.answer}>Show Answer</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.button}>
              <TouchableOpacity onPress={handleCorrect} style={styles.button}>
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={handleIncorrect} style={styles.button}>
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.question}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: white,
    borderRadius: 8,
  },
  button: {
    backgroundColor: green,
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: white,
    fontSize: 16,
  },
  length: {
    fontSize: 30,
    padding: 10,
    color: gray,
  },
  question: {
    fontSize: 20,
    color: purple,
    justifyContent: "center",
    alignSelf: "center",
    padding: 20,
  },
  answer: {
    fontSize: 20,
    color: green,
    justifyContent: "center",
    alignSelf: "center",
    padding: 20,
  },
});

function mapStateToProps(state, { questions, navigation }) {
  return {
    state,
    questions,
    navigation,
  };
}

export default connect(mapStateToProps)(QuizList);
