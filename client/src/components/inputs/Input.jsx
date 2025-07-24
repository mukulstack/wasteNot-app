import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

function Input({ value, onChange, label, placeholder, type }) {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="w-full">
			<label className="block text-sm font-medium text-[#ebdbb2] mb-1">
				{label}
			</label>

			<div className="relative">
				<input
					type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className="w-full px-4 py-2 bg-[#282828] text-[#ebdbb2] border border-[#665c54] rounded-md shadow-sm placeholder-[#a89984] focus:outline-none focus:ring-2 focus:ring-[#83a598]"
				/>

				{type === 'password' && (
					<span
						className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#a89984] cursor-pointer"
						onClick={toggleShowPassword}
					>
						{showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
					</span>
				)}
			</div>
		</div>
	);
}

export default Input;
