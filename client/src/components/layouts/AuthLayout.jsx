import React from 'react'
// add image later

const AuthLayout = ({ children }) => {
  return (
    <div>
        <div>
            
            {children}
        </div>

        <div>
            {/* add image later*/}
            {/* <img></img> */}
        </div>
    </div>
  )
}

export default AuthLayout


// import React from 'react';

// const AuthLayout = ({ children }) => {
// 	return (
// 		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#282828] text-[#ebdbb2]">
// 			{/* Left: Auth Form Section */}
// 			<div className="flex flex-col justify-center items-center p-8">
// 				<h2 className="text-3xl font-bold text-[#fabd2f] mb-6">Task Manager</h2>
// 				<div className="w-full max-w-md">
// 					{children}
// 				</div>
// 			</div>

// 			{/* Right: Image or Graphic Section */}
// 			<div className="hidden lg:flex items-center justify-center bg-[#3c3836]">
// 				{/* Placeholder for image - replace src later */}
// 				<img
// 					src="/placeholder-auth.png"
// 					alt="Task Illustration"
// 					className="w-3/4 h-auto object-contain"
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default AuthLayout;
