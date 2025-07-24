import React from 'react';

const DeleteAlert = ({ content, onDelete }) => {
	return (
		<div className="bg-[#1d2021] rounded-lg shadow-lg p-6 max-w-md mx-auto border border-[#cc241d]">
			<p className="text-[#ebdbb2] mb-4 text-sm sm:text-base">{content}</p>

			<div className="flex justify-end gap-3">
				<button
					type="button"
					className="px-4 py-2 bg-[#cc241d] text-[#fbf1c7] text-sm rounded-md hover:bg-[#fb4934] transition"
					onClick={onDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteAlert;
