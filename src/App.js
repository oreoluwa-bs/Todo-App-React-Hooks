import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmit = () => {
    if (inputText !== '') {
      setTodos([...todos, { _id: uuid(), text: inputText, isCompleted: false }]);
      setInputText('');
    }
  }
  const handlePress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className='app'>
      <div className="header">
        <input type="text" className="textInput" value={inputText} placeholder="Enter an Activity..."
          onChange={(e) => handleChange(e)}
          onKeyPress={handlePress.bind(this)} />

        <div className="btn" onClick={handleSubmit}>+</div>

      </div>
      <div className='container'>
        <ul>
          {
            todos.map(todo => {
              return (
                <li key={todo._id} className="note">
                  {todo.text}
                  <div className="buttons">
                    <div className="remove" onClick={() => {
                      let newTodo = [...todos];
                      newTodo = newTodo.filter(ntodo => ntodo._id !== todo._id);
                      setTodos(newTodo);
                    }}>
                      Delete
                    </div>

                    <div className="completeDiv" onClick={() => {
                      let newTodo = [...todos];
                      let index = newTodo.findIndex(ntodo => ntodo._id === todo._id);
                      newTodo[index].isCompleted = !newTodo[index].isCompleted;
                      setTodos(newTodo);
                    }
                    }>
                      {todo.isCompleted ? <span className='complete'>Complete</span> : <span className=''>Not Complete</span>}
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;