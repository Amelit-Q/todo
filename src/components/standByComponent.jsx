import React, { useState } from "react";

export const Task = () => {
    const [todos, setTodos] = useState([])  //здесь хранятся задачи из todo list
    const [input, setInput] = useState('') //изменения тега input хранятся здесь

    function TodoModel(id, title) {
        return {
            id,
            title,
            status: 0,
        }
    }

    const todosReducer = {
        remove: id => setTodos(todos.filter(t => t.id !== id)),
        add: (title) => setTodos([...todos, new TodoModel(todos.length, input)]),
        setStatus: (id, status) => setTodos(todos.map(t => {
            if (t.id === id) {
                t.status = status
            }
            return t
        }))
    }

    const handleInputChange = e => {
        setInput(e.target.value) //через запись e.target.value, получаем знаечение из input
    }

    const handleInputKeyPress = e => {
        if (e.key === 'Enter' && input !== '') {
            todosReducer.add(input)
            setInput('')  //в данной строке, задача добавляется и input очищается 
        }
    }


    return (
        <div>
            <input placeholder='Add your todo'
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}>
            </input>
            <ul>
                {todos.map(t =>
                    <li key={t.id}>
                        <h3>
                            {t.title}
                        </h3>
                        <div>
                            {t.status === 0 ?
                                <span onClick={() => todosReducer.setStatus(t.id, 1)}>
                                    +
                            </span> : <span onClick={() => todosReducer.remove(t.id)}>
                                    -
                        </span>}
                        </div>
                    </li>)}

            </ul>
        </div >
    )


}