import { useState } from 'react';
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import List from './components/List/List';
function App() {
  const [text, setText] = useState('');
  const [todoList, setTodolist] = useState([]);

  const addItem = () => {
    const newTodoItem = {
      id: uuidv4(),
      item: text,
      done: false
    }
    setTodolist([...todoList, newTodoItem])
    setText('');
  }

  const handleToggle = (itemID) => {
    const newItemList = todoList.map((listItem) => {
      if (listItem.id === itemID) {
        return {...listItem, done : !listItem.done}
      }
      return listItem;
    })
    setTodolist(newItemList);
  }

  const handleDelete = (itemID) => {
    const newItemList = todoList.filter((listItem) => listItem.id!==itemID)
    setTodolist(newItemList);
  }

  console.log('Item', todoList);

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className='adder'>
        <input type='text'
          placeholder='Enter Item'
          value={text}
          onChange={(e) => setText(e.target.value)} />
        <span onClick={addItem}>+</span>
      </div>
      <List todoList={todoList} handleToggle={handleToggle} handleDelete={handleDelete}/>

    </div>
  );
}

export default App;
