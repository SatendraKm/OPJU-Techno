"use server";
import { connectToDatabase } from "@/lib/mongodb";
import { IUser, User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface UserData {
	email: string;
	password: string;
	fullName: string;
	branch?: string;
	enrollmentNumber?: string;
	mobileNumber: string;
	address?: string;
	isOutsider: boolean;
}

// ===================== SIGNUP =====================
export const userSignup = async (userData: UserData): Promise<IUser> => {
	await connectToDatabase();

	const {
		email,
		password,
		fullName,
		branch,
		enrollmentNumber,
		mobileNumber,
		address,
		isOutsider
	} = userData;

	const normalizedEmail = email.toLowerCase().trim();

	// Check if user already exists
	const existingUser = await User.findOne({ email: normalizedEmail });
	if (existingUser) {
		throw new Error("User already exists with this email");
	}

	const newUser = new User({
		email: normalizedEmail,
		password,
		fullName,
		branch,
		enrollmentNumber,
		mobileNumber,
		address,
		isOutsider
	});

	await newUser.save();

	return JSON.parse(JSON.stringify(newUser));
};

// ===================== LOGIN =====================
interface LoginData {
	email: string;
	password: string;
}

export const userLogin = async (
	loginData: LoginData
): Promise<{ user: IUser; token: string }> => {
	await connectToDatabase();

	const normalizedEmail = loginData.email.toLowerCase().trim();

	const existingUser = await User.findOne({ email: normalizedEmail });
	if (!existingUser) {
		throw new Error("User does not exist with this email");
	}

	if (existingUser.password !== loginData.password) {
		throw new Error("Invalid password");
	}

	const token = jwt.sign(
		{
			userId: existingUser._id,
			email: normalizedEmail,
		},
		process.env.NEXT_PUBLIC_JWT_SECRET || "your_jwt_secret",
		{ expiresIn: "1h" }
	);

	return JSON.parse(
		JSON.stringify({
			user: existingUser,
			token,
		})
	);
};

// ===================== RESET PASSWORD =====================
export const resetPassword = async (email: string, newPassword: string) => {
	try {
		await connectToDatabase();

		const normalizedEmail = email.toLowerCase().trim();

		const user = await User.findOne({ email: normalizedEmail });

		if (!user) {
			throw new Error("User not found");
		}

		user.password = newPassword;
		await user.save();

		return JSON.parse(JSON.stringify({ success: true }));
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to reset password: ${error.message}`);
		} else {
			throw new Error("Failed to reset password");
		}
	}
};

// ===================== GET USER FROM TOKEN =====================
export const getUserFromAuth = async (token: string): Promise<IUser | null> => {
	await connectToDatabase();

	if (!token) {
		throw new Error("No auth token provided");
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.NEXT_PUBLIC_JWT_SECRET || "your_jwt_secret"
		) as { userId: string; email: string };

		const user = await User.findOne({
			_id: decoded.userId,
			email: decoded.email.toLowerCase(),
		});

		if (!user) {
			throw new Error("User not found");
		}

		return JSON.parse(JSON.stringify(user));
	} catch (error) {
		console.error("Error verifying token or finding user:", error);
		throw new Error("Invalid or expired token");
	}
};

// ===================== GET CURRENT USER =====================
export async function getUser() {
	await connectToDatabase();

	const authToken = (await cookies()).get("auth-token")?.value;
	if (!authToken) return null;

	try {
		const decoded = jwt.verify(
			authToken,
			process.env.NEXT_PUBLIC_JWT_SECRET || "your_jwt_secret"
		) as { userId: string; email: string };

		const user = await User.findOne({
			_id: decoded.userId,
			email: decoded.email.toLowerCase(),
		});

		return JSON.parse(JSON.stringify(user));
	} catch (error) {
		console.error("Error verifying token or finding user:", error);
		return null;
	}
}

// ===================== GET USERS BY EMAILS =====================
export async function getUsersByEmails(
	emails: string[]
): Promise<(IUser & { createdAt: Date })[]> {
	try {
		await connectToDatabase();

		const normalizedEmails = emails.map((e) =>
			e.toLowerCase().trim()
		);

		const users = await User.find({
			email: { $in: normalizedEmails },
		}).lean();

		return JSON.parse(JSON.stringify(users));
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to fetch users: ${error.message}`);
		} else {
			throw new Error("Failed to fetch users");
		}
	}
}

// ===================== GET OUTSIDERS =====================
export async function getOutsiderUsers(): Promise<IUser[]> {
	await connectToDatabase();

	try {
		const outsiderUsers = await User.find({ isOutsider: true }).lean<IUser>();
		return JSON.parse(JSON.stringify(outsiderUsers));
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Failed to fetch outsider users: ${error.message}`);
		} else {
			throw new Error("Failed to fetch outsider users");
		}
	}
}
