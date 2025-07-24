import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
	const [profilePic, setProfilePic] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [adminInviteToken, setAdminInviteToken] = useState("");
	const [error, setError] = useState(null);

	const { updateUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();

		let profileImageUrl = "";

		if (!fullName) {
			setError("Please enter Full name");
			return;
		}

		if (!validateEmail(email)) {
			setError("Please enter a valid email address");
			return;
		}

		if (!password) {
			setError("Please enter the password");
			return;
		}

		setError("");

		try {
			if (profilePic) {
				const imgUploadRes = await uploadImage(profilePic);
				profileImageUrl = imgUploadRes.imageUrl || "";
			}

			const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
				name: fullName,
				email,
				password,
				profileImageUrl,
				adminInviteToken,
			});

			const { token, role } = response.data;

			if (token) {
				localStorage.setItem("token", token);
				updateUser(response.data);

				if (role === "admin") {
					navigate("/admin/dashboard");
				} else {
					navigate("/user/dashboard");
				}
			}
		} catch (error) {
			console.error("Signup error:", error);
			setError(
				error.response?.data?.message || "Something went wrong. Please try again."
			);
		}
	};

	return (
		<AuthLayout>
			<div className="min-h-screen flex items-center justify-center bg-[#282828] px-4">
				<div className="w-full max-w-2xl bg-[#3c3836] p-10 rounded-xl shadow-lg space-y-6">
					<div className="text-center">
						<h3 className="text-3xl font-bold text-[#ebdbb2]">Create an account</h3>
						<p className="text-[#a89984] mt-1">Join us and get started!</p>
					</div>

					<form onSubmit={handleSignUp} className="space-y-6">
						<div className="flex justify-center">
							<ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
						</div>

						<Input
							value={fullName}
							onChange={({ target }) => setFullName(target.value)}
							label="Full Name"
							placeholder="Enter Full Name"
							type="text"
						/>

						<Input
							value={email}
							onChange={({ target }) => setEmail(target.value)}
							label="Email Address"
							placeholder="test@gmail.com"
							type="text"
						/>

						<Input
							value={password}
							onChange={({ target }) => setPassword(target.value)}
							label="Password"
							placeholder="Min 8 characters"
							type="password"
						/>

						<Input
							value={adminInviteToken}
							onChange={({ target }) => setAdminInviteToken(target.value)}
							label="Admin Invite Token"
							placeholder="admintoken"
							type="text"
						/>

						{error && (
							<p className="text-[#fb4934] text-sm text-center">{error}</p>
						)}

						<button
							type="submit"
							className="w-full py-3 px-4 bg-[#83a598] hover:bg-[#689d6a] text-[#282828] font-semibold rounded-md transition"
						>
							Sign Up
						</button>

						<p className="text-center text-sm text-[#a89984]">
							Already a user?{" "}
							<Link to="/login" className="text-[#fabd2f] hover:underline">
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};

export default SignUp;
