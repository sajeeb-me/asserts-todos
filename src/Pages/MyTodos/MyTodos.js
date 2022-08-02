import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UpdateTodoModal from './UpdateTodoModal';

const MyTodos = () => {
    const [todos, setTodos] = useState([]);
    const [updatingTodo, setUpdatingTodo] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/todo')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setTodos(data);
            })
    }, [todos])

    const handleDelete = id => {
        fetch(`http://localhost:5000/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                toast.info('Deleted todo!')
                console.log(data);
            })
    }

    const handleComplete = id => {
        const time = new Date();
        console.log(time);
        fetch(`http://localhost:5000/todo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ time })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success("YAY! You've completed your todo successfully!")
                }
            })
    }

    return (
        <section className='bg-slate-100 p-4 lg:p-8 h-screen'>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Todo</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map((todo, index) => <tr key={todo._id} className='hover'>
                                    <th className={todo.isCompleted ? 'line-through opacity-60' : ''}>{index + 1}</th>
                                    <td className={todo.isCompleted ? 'line-through opacity-60' : ''}>{todo.heading}</td>
                                    <td className={todo.isCompleted ? 'line-through opacity-60' : ''}>{todo.date}</td>
                                    <td className={todo.isCompleted ? 'line-through opacity-60' : ''} title={todo.description}>{todo.description.slice(0, 30)}</td>
                                    <td className='flex justify-center gap-4'>
                                        {
                                            todo.isCompleted ?
                                                <button className='text-base font-semibold'>
                                                    Completed on
                                                    <br />
                                                    {todo.completedTime}
                                                </button>
                                                :
                                                <button onClick={() => handleComplete(todo._id)} className='btn btn-primary btn-outline'>Complete</button>
                                        }
                                        {
                                            todo.isCompleted ||
                                            <label
                                                htmlFor="update-todo-modal"
                                                onClick={() => setUpdatingTodo(todo)}
                                                className="btn btn-accent btn-outline"
                                            >
                                                Update
                                            </label>
                                        }

                                        <button onClick={() => handleDelete(todo._id)} className='btn btn-error btn-outline'>Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {
                    updatingTodo && <UpdateTodoModal
                        updatingTodo={updatingTodo}
                        setUpdatingTodo={setUpdatingTodo}
                    />
                }
            </div>
        </section >
    );
};

export default MyTodos;