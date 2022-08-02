import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-toastify';

const Home = () => {
    const [date, setDate] = useState(new Date())
    const todoDate = format(date, 'PP');

    const handleSubmit = e => {
        e.preventDefault();
        const date = e.target.date.value;
        const heading = e.target.heading.value;
        const description = e.target.description.value;
        const todo = {
            date,
            heading,
            description,
            isCompleted: false
        }
        console.log(todo);
        fetch('http://localhost:5000/todo', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Todo added successfully!')
                    e.target.reset();
                }
                else {
                    toast.error('Failed to add the Todo!')
                }
            })
    }

    return (
        <section className='lg:px-20'>
            <div className={`hero lg:min-h-screen`}>
                <div className="hero-content flex-col lg:flex-row gap-10 py-5">
                    <div className='flex-1 flex justify-center'>
                        <DayPicker
                            className='rounded-lg shadow-lg p-2'
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    </div>
                    <div className='flex-1 card shadow-lg'>
                        <div className='card-body'>
                            <h1 className='text-xl font-semibold text-primary'>Add to My Todos</h1>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name='date' value={todoDate} className="input input-bordered w-full mb-3" disabled />
                                <input type="text" name='heading' placeholder="Todo Heading" className="input input-bordered w-full mb-3" required />
                                <textarea name='description' placeholder="Description" className="input input-bordered w-full mb-3" required />
                                <input type="submit" value="Add Todo" className="btn btn-primary w-full mb-3" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;