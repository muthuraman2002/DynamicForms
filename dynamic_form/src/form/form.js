import React, { useState } from "react";
import './form.css'
// Question Component to render each question

// Main Form Component to handle dynamic form creation
const  Form =(props)=> {
  
const Question = ({ question, index, handleChange }) => {
  const renderInputField = () => {
    switch (question.type) {
      case "text":
        return (
          <input
            type="text"
            value={question.answer}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Your answer"
          />
        );
      case "multipleChoice":
        return question.options.map((option, i) => (
          <div key={i}>
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              checked={question.answer === option}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            {option}
          </div>
        ));
      case "checkbox":
        return question.options.map((option, i) => (
          <div key={i}>
            <input
              type="checkbox"
              value={option}
              checked={question.answer.includes(option)}
              onChange={(e) => {
                const updatedAnswer = [...question.answer];
                if (e.target.checked) {
                  updatedAnswer.push(option);
                } else {
                  const idx = updatedAnswer.indexOf(option);
                  if (idx !== -1) updatedAnswer.splice(idx, 1);
                }
                handleChange(index, updatedAnswer);
              }}
            />
            {option}
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="question">
      <h3>{question.questionText}</h3>
      {renderInputField()}
    </div>
  );
};

// FormBuilder Component - for dynamically adding questions
const FormBuilder = ({ addQuestion }) => {
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    type: "text", // Default type is text
    options: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value,
    });
  };

  const handleAddQuestion = () => {
    addQuestion(newQuestion);
    setNewQuestion({ questionText: "", type: "text", options: [] }); // Reset input
  };

  const handleAddOption = () => {
    setNewQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = e.target.value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  return (
    <div>
      <h2>Create a Question</h2>
      <input
        type="text"
        name="questionText"
        value={newQuestion.questionText}
        onChange={handleInputChange}
        placeholder="Question text"
      />
      <select
        name="type"
        value={newQuestion.type}
        onChange={handleInputChange}
      >
        <option value="text">Text</option>
        <option value="multipleChoice">Multiple Choice</option>
        <option value="checkbox">Checkbox</option>
      </select>

      {newQuestion.type !== "text" && (
        <>
          <h4>Options</h4>
          {newQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
          <button onClick={handleAddOption}>Add Option</button>
        </>
      )}

      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, { ...newQuestion, answer: "" }]);
  };

  const handleChangeAnswer = (index, answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = answer;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setResponses(questions.map((q) => q.answer));
    alert("Form submitted! Check the console for responses.");
    console.log("Responses:", responses);
  };

  return (
    <div className="dynamic-form">
      <h1>Dynamic  Forms </h1>

      <FormBuilder addQuestion={handleAddQuestion} />

      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            index={index}
            handleChange={handleChangeAnswer}
          />
        ))}

        {questions.length > 0 && <button type="submit">Submit</button>}
      </form>

      {responses.length > 0 && (
        <div>
          <h3>Responses:</h3>
          <pre>{JSON.stringify(responses, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
 export default Form;