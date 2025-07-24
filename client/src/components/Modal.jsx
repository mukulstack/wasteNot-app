import React from 'react';
import { createPortal } from 'react-dom';
import { HiX } from 'react-icons/hi';

const Modal = ({ children, isOpen, onClose, title }) => {
	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
			<div className="bg-[#282828] w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative border border-[#504945]">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-[#ebdbb2] hover:text-[#fb4934] text-xl"
				>
					<HiX />
				</button>

				{/* Title */}
				{title && (
					<h2 className="text-lg font-semibold text-[#fabd2f] mb-4">
						{title}
					</h2>
				)}

				{/* Content */}
				<div className="space-y-4 text-[#ebdbb2]">{children}</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
