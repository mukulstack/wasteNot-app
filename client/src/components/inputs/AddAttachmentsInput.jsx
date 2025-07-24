import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
	const [option, setOption] = useState('');

	const handleAddOption = () => {
		if (option.trim()) {
			setAttachments([...attachments, option.trim()]);
			setOption('');
		}
	};

	const handleDeleteOption = (index) => {
		const updatedArr = attachments.filter((_, idx) => idx !== index);
		setAttachments(updatedArr);
	};

	return (
		<div className="space-y-4">
			{/* Existing Attachments */}
			{attachments.map((item, index) => (
				<div
					key={`${item}-${index}`}
					className="flex items-center justify-between bg-[#3c3836] rounded-md px-4 py-2"
				>
					<div className="flex items-center gap-2">
						<LuPaperclip className="text-[#fabd2f]" />
						<p className="text-sm text-[#ebdbb2] break-all">{item}</p>
					</div>

					<button
						onClick={() => handleDeleteOption(index)}
						className="text-[#fb4934] hover:text-red-400 transition"
						title="Delete"
					>
						<HiOutlineTrash />
					</button>
				</div>
			))}

			{/* Input + Add Button */}
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-2 flex-1 px-3 py-2 border border-[#665c54] bg-[#282828] rounded-md">
					<LuPaperclip className="text-[#928374]" />
					<input
						type="text"
						placeholder="Add File Link"
						value={option}
						onChange={({ target }) => setOption(target.value)}
						className="w-full bg-transparent outline-none text-sm text-[#ebdbb2] placeholder-[#928374]"
					/>
				</div>

				<button
					onClick={handleAddOption}
					className="flex items-center gap-1 bg-[#458588] text-[#fbf1c7] px-4 py-2 rounded-md hover:bg-[#689d6a] transition text-sm"
				>
					<HiMiniPlus />
					Add
				</button>
			</div>
		</div>
	);
};

export default AddAttachmentsInput;
