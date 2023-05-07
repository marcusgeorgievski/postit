"use client";

import { signIn } from "next-auth/react";

import React from "react";

export default function Login() {
	return (
		<button
			className="flex px-2 py-1 text-sm font-bold border rounded bg-slate-200 border-slate-900 hover:bg-slate-300"
			onClick={() => signIn()}
		>
			Sign In
		</button>
	);
}
