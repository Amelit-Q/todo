import React, { useState } from 'react'

export const TaskList = () => {

    const [taskState, setTaskState] = useState([])
    const [input, setInput] = useState('')

    function TaskModel(id, task) {
        return {
            id,
            task,
            status: false
        }
    }

    const TaskReducer = {
        remove: id => setTaskState(taskState.filter(t => t.id !== id)),
        add: (title) => setTaskState([...taskState, new TaskModel(taskState.length, input)]),
        setStatus: (id, status) => setTaskState(taskState.map(t => {
            if (t.id === id) {
                t.status = status
            }
            return t
        }))
    }

    const handleInputChange = e => {
        setInput(e.target.value)
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter' && input !== '') {
            TaskReducer.add(input)
            setInput('')
        }
    }


    return (
        <div>
            <input placeholder='add your task'
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}>
            </input>
            <ul>
                {taskState.map(t =>
                    <li key={t.id}>
                        <h2>{t.task}</h2>
                        <div>
                            {t.status === false ? <span onClick={() => TaskReducer.setStatus(t.id, true)}> ++++ </span> :
                                <span onClick={() => TaskReducer.remove(t.id)}>----</span>}
                        </div>

                    </li>
                )}

            </ul>
        </div>
    )
}