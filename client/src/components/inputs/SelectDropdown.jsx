import React, { useState } from 'react';
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (option) => {
		onChange(option);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block w-full">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-full px-4 py-2 text-sm text-[#ebdbb2] bg-[#3c3836] border border-[#665c54] rounded-md shadow-sm hover:bg-[#504945] focus:outline-none"
			>
				<span>
					{value
						? options.find((opt) => opt.value === value)?.label
						: placeholder || 'Select'}
				</span>
				<LuChevronDown
					className={`ml-2 text-[#ebdbb2] transform transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-1 w-full bg-[#282828] border border-[#665c54] rounded-md shadow-lg max-h-60 overflow-auto">
					{options.map((option) => (
						<div
							key={option.value}
							onClick={() => handleSelect(option.value)}
							className={`px-4 py-2 text-sm cursor-pointer text-[#ebdbb2] hover:bg-[#504945] ${
								value === option.value ? 'bg-[#3c3836] font-medium' : ''
							}`}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SelectDropdown;
