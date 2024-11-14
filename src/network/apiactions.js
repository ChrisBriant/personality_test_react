import {conn, connWithAuth} from './api';

const getQuestions = async () => {
  const url = "/getrandomquestions/?number_of_questions=7";
  return new Promise((resolve,reject) => {
    conn.get(url)
    .then( (response) => {
      return resolve(response.data);
    }).catch((err) => {
      console.log(err);
      return reject(err);
    });
  });
}

const sendAnswers = async (data) => {
  const url = "/sendanswers/";

  return new Promise((resolve,reject) => {
    conn.post(url, data)
    .then( (response) => {
      return resolve(response.data);
    }).catch((err) => {
      console.log(err);
      return reject(err);
    });
  });
}

export {getQuestions, sendAnswers};