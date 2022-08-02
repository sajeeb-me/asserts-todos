import React from 'react';
import { toast } from 'react-toastify';

const UpdateTodoModal = ({ updatingTodo, setUpdatingTodo }) => {

    const handleSubmit = (e) => {
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
        fetch(`https://tranquil-thicket-99142.herokuapp.com/todo/update/${updatingTodo._id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ todo })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Todo is updated successfully!")
                }
            })
        setUpdatingTodo(null)
    }

    return (
        <section>
            <input type="checkbox" id="update-todo-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">You are updating {updatingTodo.heading}!</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='date' defaultValue={updatingTodo.date} className="input input-bordered w-full mb-3" required />
                        <input type="text" name='heading' defaultValue={updatingTodo.heading} placeholder="Todo Heading" className="input input-bordered w-full mb-3" required />
                        <textarea name='description' defaultValue={updatingTodo.description} placeholder="Description" className="input input-bordered w-full mb-3" required />
                        <input type="submit" value="Add Todo" className="btn btn-primary w-full mb-3" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateTodoModal;