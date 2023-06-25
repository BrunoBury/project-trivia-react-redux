import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchQuestions from '../helpers/fetchQuestions';
import { incrementScore } from '../redux/actions';

class RunGame extends Component {
  state = {
    questions: undefined,
    isEnabled: true,
    isRightAnswer: undefined,
    timer: 30,
    intervalId: null,
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
    this.handleTimer();
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

  handleAnswer = (event) => {
    const { target } = event;
    const rightAnswer = target.getAttribute('data-testid').includes(
      'correct-answer',
    );
    const { intervalId, questions } = this.state;
    clearInterval(intervalId);
    if (rightAnswer) {
      this.setState(
        {
          isRightAnswer: true,
        },
        () => {
          this.verifyScore();
        },
      );
    } else {
      this.setState({
        isRightAnswer: false,
      });
      this.setState((prevState) => ({
        questions: prevState.questions + 1,
      }), () => {
        this.sortAnswers(questions);
      });
    }
  };

  wrongButtonColor = () => {
    const { isRightAnswer } = this.state;
    if (isRightAnswer !== undefined) {
      return { border: '3px solid red' };
    }
  };

  rightButtonColor = () => {
    const { isRightAnswer } = this.state;
    if (isRightAnswer !== undefined) {
      return { border: '3px solid rgb(6, 240, 15)' };
    }
  };

  verifyScore = () => {
    const { isRightAnswer } = this.state;
    const somNumber = 10;
    const { incrementScores } = this.props;
    if (isRightAnswer === true) {
      incrementScores(somNumber);
    }
  };

  handleTimer = () => {
    const refresh = 1000;
    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer <= 0) {
          clearInterval(intervalId);
          this.setState({
            isEnabled: false,
            isRightAnswer: false,
            intervalId: null,
          });
        }
      });
    }, refresh);
    this.setState({
      intervalId,
    });
  };

  render() {
    const {
      questions,
      sortAnswers,
      isEnabled,
      timer,
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
                      style={ this.rightButtonColor() }
                      data-testid="correct-answer"
                      onClick={ this.handleAnswer }

                    >
                      {alternative}
                    </button>
                  ) : (
                    <button
                      key={ index }
                      style={ this.wrongButtonColor() }
                      disabled={ !isEnabled }
                      data-testid={ `wrong-answer-${index}` }
                      onClick={ this.handleAnswer }

                    >
                      {alternative}
                    </button>
                  );
              })) }
            </section>
          </>
        )}
        <h3>{ timer }</h3>
      </div>
    );
  }
}

RunGame.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  incrementScores: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  incrementScores: (score) => dispatch(incrementScore(score)),
});

export default connect(null, mapDispatchToProps)(withRouter(RunGame));
