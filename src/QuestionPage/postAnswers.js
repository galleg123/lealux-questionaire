export const postAnswers = async (answers) => {
  const apiUrl = "https://lealux-questionaire-backend.onrender.com/api/answers";

  const data = {
    answers,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  {
    const response = await fetch(apiUrl, requestOptions);
    const { data } = await response.json();

    console.log("Recieved data:", data);
  }
};
