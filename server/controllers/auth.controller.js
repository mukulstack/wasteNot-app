import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function signup(req, res, next) {
    try {
        const { email, password } = req.body;

        // 1. Check if required fields are present
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // 2. Check if user already exists
        const userExists = await User.exists({ email });
        if (userExists) {
            return res.status(409).json({ error: "User already exists" });
        }

        // 3. Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // 4. Save new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: "New user created" });
    } catch (err) {
        console.error("Signup error:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // 1. check the fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // 2. Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // 3. Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // 4. Generate JWT token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d" 
		});

		// 5. Respond with token (you can also set it as a cookie)
		res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error("Login error:", err.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

async function logout(req, res, next) {
    res.send("logout controller + router");
}

export { signup, login, logout };
