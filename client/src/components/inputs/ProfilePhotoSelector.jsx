import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

function ProfilePhotoSelector({ image, setImage }) {
	const inputRef = useRef(null);
	const [previewUrl, setPreviewUrl] = useState(null);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImage(file);
			const preview = URL.createObjectURL(file);
			setPreviewUrl(preview);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setPreviewUrl(null);
		if (inputRef.current) inputRef.current.value = null;
	};

	const onChooseFile = () => {
		inputRef.current?.click();
	};

	return (
		<div className="flex flex-col items-center space-y-3">
			<input
				type="file"
				accept="image/*"
				ref={inputRef}
				onChange={handleImageChange}
				className="hidden"
			/>

			{!image ? (
				<div className="flex flex-col items-center space-y-2">
					<LuUser className="text-6xl text-[#a89984]" />
					<button
						type="button"
						onClick={onChooseFile}
						className="flex items-center gap-2 text-[#83a598] hover:underline text-sm"
					>
						<LuUpload />
						<span>Upload Photo</span>
					</button>
				</div>
			) : (
				<div className="flex flex-col items-center space-y-2">
					<img
						src={previewUrl}
						alt="profile"
						className="w-28 h-28 rounded-full object-cover border border-[#665c54] shadow-md"
					/>
					<button
						type="button"
						onClick={handleRemoveImage}
						className="flex items-center gap-1 text-[#fb4934] hover:underline text-sm"
					>
						<LuTrash />
						<span>Remove</span>
					</button>
				</div>
			)}
		</div>
	);
}

export default ProfilePhotoSelector;
