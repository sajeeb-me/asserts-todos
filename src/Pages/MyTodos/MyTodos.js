import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MyTodos = () => {
    const [todos, setTodos] = useState([]);

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
                                    <th>{index + 1}</th>
                                    <td>{todo.heading}</td>
                                    <td>{todo.date}</td>
                                    <td>{todo.description}</td>
                                    <td className='flex justify-center gap-4'>
                                        <button className='btn btn-primary btn-outline'>Complete</button>
                                        <button onClick={() => handleDelete(todo._id)} className='btn btn-error btn-outline'>Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    );
};

export default MyTodos;