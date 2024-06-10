import { useState, useEffect, useRef } from 'react';
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import List from './components/List/List';
function App() {
  const [text, setText] = useState('');
  const [todoList, setTodolist] = useState([]);
  const isListenerAdded = useRef(false);

  const addItem = () => {
    if (text !== '') {
      const newTodoItem = {
        id: uuidv4(),
        item: text,
        done: false
      }
      setTodolist([...todoList, newTodoItem])
      setText('');
    }
  }

  useEffect(() => {
    const handleDelKey = (event) => {
      if (event.key === 'Delete') {
        if (todoList.some((listItem) => listItem.done === true)) {
          if (window.confirm('Are you Sure you want to Delete?')) {
            console.log('del key pressed')
            const newItemList = todoList.filter((listItem) => listItem.done === false)
            setTodolist(newItemList);
          }
        }
        else {
          alert('Select item to delete first')
        }
      }
    }


    document.addEventListener('keydown', handleDelKey);
    isListenerAdded.current = true
    return () => { document.removeEventListener('keydown', handleDelKey) };
  }, [todoList])


  const addItemWithEnterKey = (event) => {
    if (event.key === 'Enter')
      addItem();
  }

  const handleToggle = (itemID) => {
    const newItemList = todoList.map((listItem) => {
      if (listItem.id === itemID) {
        return { ...listItem, done: !listItem.done }
      }
      return listItem;
    })
    setTodolist(newItemList);
  }

  const handleDelete = (itemID) => {
    if (window.confirm('Are you Sure you want to Delete?')) {
      console.log('del key pressed')
      const newItemList = todoList.filter((listItem) => listItem.id !== itemID)
      setTodolist(newItemList);
    }
  }

  console.log('Item', todoList);

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className='adder'>
        <input type='text'
          placeholder='Enter Item'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={addItemWithEnterKey} />
        <span onClick={addItem} >+</span>
      </div>
      <List todoList={todoList} handleToggle={handleToggle} handleDelete={handleDelete} />

    </div>
  );
}

export default App;
