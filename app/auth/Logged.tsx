"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface user {
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
}

export default function Logged({ user }: { user: user }) {
	return (
		<div className="flex flex-col items-end p-1 border rounded border-slate-300">
			<Link href={"/dashboard"} className="flex items-center gap-2">
				<Image
					width={24}
					height={24}
					src={user.image}
					alt={""}
					className="rounded-full"
				/>
				<p className="text-sm">{user.name}</p>
			</Link>
			<button
				onClick={() => signOut()}
				className="text-xs text-slate-500"
			>
				Sign Out
			</button>
		</div>
	);
}
