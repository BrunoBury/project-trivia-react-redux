import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import fetchQuestions from '../helpers/fetchQuestions';

class RunGame extends Component {
  state = {
    questions: undefined,
    isEnabled: true,

  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    const {
      response_code: responseCode,
      results: questions,
    } = await fetchQuestions(token);

    if (responseCode !== 0) {
      history.push('./');
      localStorage.removeItem('token');
    } else {
      this.setState({
        questions,
      }, () => {
        this.sortAnswers(questions);
      });
    }
  }

  sortAnswers = (questions, index = 0) => {
    const SUB_VALUE = 0.5;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = questions[index];
    const orgIncorrectAnswers = incorrectAnswer
      .map((incorrect) => ({ incorrectAnswer: incorrect }));
    const allAnswers = [{ correctAnswer }, ...orgIncorrectAnswers];
    const sortAnswers = allAnswers.sort(() => Math.random() - SUB_VALUE);
    this.setState({
      sortAnswers,
    });
  };

  render() {
    const {
      questions,
      sortAnswers,
      isEnabled,
    } = this.state;
    return (
      <div>
        {questions
        && (
          <>
            <h1>Perguntas:</h1>
            <h2>Categoria:</h2>
            <h3 data-testid="question-category">{questions[0].category}</h3>
            <p data-testid="question-text">{questions[0].question}</p>

            <section data-testid="answer-options">
              {sortAnswers && (sortAnswers.map((answer, index) => {
                const response = Object.keys(answer)[0];
                const alternative = Object.values(answer)[0];
                return response === 'correctAnswer'
                  ? (
                    <button
                      key={ index }
                      disabled={ !isEnabled }
                      data-testid="correct-answer"

                    >
                      {alternative}
                    </button>
                  ) : (
                    <button
                      key={ index }
                      disabled={ !isEnabled }
                      data-testid={ `wrong-answer-${index}` }

                    >
                      {alternative}
                    </button>
                  );
              })) }
            </section>
          </>
        )}
      </div>
    );
  }
}

RunGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(RunGame);
