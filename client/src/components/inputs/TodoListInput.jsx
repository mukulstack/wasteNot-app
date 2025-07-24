import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';

const TodoListInput = ({ todoList, setTodoList }) => {
	const [option, setOption] = useState('');

	// Add task to list
	const handleAddOption = () => {
		if (option.trim()) {
			setTodoList([...todoList, option.trim()]);
			setOption('');
		}
	};

	// Delete task from list
	const handleDeleteOption = (index) => {
		const updatedArr = todoList.filter((_, idx) => idx !== index);
		setTodoList(updatedArr);
	};

	return (
		<div className="space-y-4">
			{/* Task List */}
			{todoList.map((item, index) => (
				<div
					key={`${item}-${index}`}
					className="flex justify-between items-center bg-[#3c3836] border border-[#504945] rounded-md px-4 py-2"
				>
					<p className="text-[#ebdbb2] text-sm flex items-center gap-2">
						<span className="text-[#83a598] font-mono w-6">
							{index < 9 ? `0${index + 1}` : index + 1}.
						</span>
						{item}
					</p>

					<button
						onClick={() => handleDeleteOption(index)}
						className="text-[#fb4934] hover:text-[#fe8019] transition"
						title="Delete"
					>
						<HiOutlineTrash />
					</button>
				</div>
			))}

			{/* Input + Add Button */}
			<div className="flex items-center gap-2">
				<input
					type="text"
					placeholder="Enter Task"
					value={option}
					onChange={({ target }) => setOption(target.value)}
					className="flex-1 px-3 py-2 border border-[#665c54] rounded-md bg-[#282828] text-[#ebdbb2] placeholder-[#a89984] focus:outline-none focus:ring-2 focus:ring-[#b8bb26] text-sm"
				/>

				<button
					onClick={handleAddOption}
					className="flex items-center gap-1 bg-[#689d6a] text-[#1d2021] px-4 py-2 rounded-md hover:bg-[#8ec07c] transition text-sm font-semibold"
				>
					<HiMiniPlus />
					Add
				</button>
			</div>
		</div>
	);
};

export default TodoListInput;
