"use client";

import React, { useState, useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/utils"; // Assuming you have a logout utility function
import useFetch from "@/hooks/use-fetch";
import { getUser } from "@/actions/user-actions";
import { toast } from "@/hooks/use-toast";

const UserDropdown = () => {
	const router = useRouter();
	const pathname = usePathname();

	// Track if the user is authenticated
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const {
		data: userFetchedData,
		error: userFetchError,
		fn: fetchUserFn,
	} = useFetch(getUser);

	useEffect(() => {
		fetchUserFn();
	}, [pathname]);

	useEffect(() => {
		if (userFetchError) {
			toast({
				title: "Error",
				description: "Failed to fetch user data or Token Expired",
				variant: "destructive",
			});
			router.push("/"); // Redirect after logout or token expiry
		}
	}, [userFetchError]);

	useEffect(() => {
		setIsAuthenticated(!!userFetchedData);
	}, [userFetchedData]);

	// Handle logout
	const handleLogout = () => {
		logout(); // Execute your logout functionality here
		setIsAuthenticated(false);
		router.push("/");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="h-10 w-36 flex items-center justify-center rounded-full px-6 font-semibold
  text-white shadow-xl border border-white/20
  bg-gradient-to-b from-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.05)]
  backdrop-blur-md hover:brightness-110 transition">

					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="h-6 pr-2"
					>
						<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
					</svg>
					<p className="bg-clip-text text-transparent bg-gradient-to-b from-[#FFCD7C] to-[#D4881C]">
						{isAuthenticated
							? userFetchedData?.isAdmin
								? "Admin"
								: "Dashboard"
							: "Login"}
					</p>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				{isAuthenticated ? (
					<>
						<DropdownMenuItem
							onClick={() => {
								if (userFetchedData?.isAdmin) {
									router.push("/admin/dashboard");
								} else {
									router.push("/dashboard");
								}
							}}
						>
							{userFetchedData?.isAdmin ? "Admin dashboard" : "Dashboard"}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleLogout}>
							Logout
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem
							onClick={() => {
								router.push("/auth/signup");
							}}
						>
							SignUp
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => {
								router.push("/auth/login");
							}}
						>
							Login
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
