const fetchQuestions = async (token) => {
  const API_URL = 'https://opentdb.com/api.php?amount=5&token=';
  const questions = await fetch(`${API_URL}${token}`);
  const data = await questions.json();
  return data;
};

export default fetchQuestions;
