/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { eventSubEventData } from "@/data/event-subeventData";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
// Task : use this function to create a middleware for protected routes.
export function isUserAuthenticated(): boolean {
	const token = Cookies.get("auth-token");
	if (!token) {
		return false;
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.NEXT_PUBLIC_JWT_SECRET || "your_jwt_secret"
		);
		return !!decoded;
	} catch (error) {
		if (error instanceof Error && error.name === "TokenExpiredError") {
			console.error("Token expired:", error);
		} else {
			console.error("Invalid token:", error);
		}
		return false;
	}
}

export function getAuthToken(): string | null {
	return Cookies.get("auth-token") || null;
}

// Should be done at client-side only : localStorage is for client-side storage || Now, we can use Cookies for this purpose.
export const logout = async (): Promise<void> => {
	Cookies.remove("auth-token");
};


export const getMergedEvents = (
	participatingTeamsData: any[],
	userEmail: string
  ) => {
  
	// 1. Filter only teams where current user is LEADER
	const leaderTeams = participatingTeamsData.filter(
	  (team: any) =>
		team.leader?.email?.toLowerCase().trim() ===
		userEmail?.toLowerCase().trim()
	);
  
	console.log("LEADER TEAMS:", leaderTeams);
  
	// 2. Merge teams by EVENT NAME (from DB directly)
	const mergedMap: any = {};
  
	leaderTeams.forEach((team) => {
	  const eventName = team.event.name; // direct DB value
  
	  if (!mergedMap[eventName]) {
		mergedMap[eventName] = {
		  teams: [],
		  individualSchema: true,
		};
	  }
  
	  mergedMap[eventName].teams.push(team);
  
	  // if any team has size > 1 => team schema
	  if (team.size !== 1) {
		mergedMap[eventName].individualSchema = false;
	  }
	});
  
	// 3. Convert object to array
	const mergedTeamsArray = Object.keys(mergedMap).map((key) => ({
	  eventName: key,
	  ...mergedMap[key],
	}));
  
	console.log("MERGED FINAL FIXED:", mergedTeamsArray);
  
	return mergedTeamsArray;
  };
  