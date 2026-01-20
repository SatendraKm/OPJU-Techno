"use server";
import mongoose from "mongoose";
const NEXT_PUBLIC_MONGODB_URI: string =
	process.env.NEXT_PUBLIC_MONGODB_URI || "";
const NEXT_PUBLIC_MONGODB_DBNAME: string =
	process.env.NEXT_PUBLIC_MONGODB_DBNAME || "";
if (!NEXT_PUBLIC_MONGODB_URI) {
	throw new Error(
		"Please define the NEXT_PUBLIC_MONGODB_URI environment variable"
	);
}
if (!NEXT_PUBLIC_MONGODB_DBNAME) {
	throw new Error(
		"Please define the NEXT_PUBLIC_MONGODB_DBNAME environment variable"
	);
}

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	// eslint-disable-next-line no-var
	var mongoose: MongooseCache;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
	global.mongoose = cached;
}

export async function connectToDatabase() {
	if (cached.conn) {
		return;
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(NEXT_PUBLIC_MONGODB_URI, {
				dbName: NEXT_PUBLIC_MONGODB_DBNAME,
				bufferCommands: false,
			})
			.then((mongoose) => mongoose);
	}

	cached.conn = await cached.promise;
	// return cached.conn;
}
