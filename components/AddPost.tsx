"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AddPost() {
	const [title, setTitle] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);

	// Create post
	const { mutate } = useMutation(
		async (title: string) =>
			await axios.post("/api/posts/addPost", { title }),
		{
			onError: (error) => console.log(error),
			onSuccess: (data) => {
				console.log(data);
				setTitle("");
				setIsDisabled(false);
			},
		}
	);

	async function submitPost(e: React.FormEvent) {
		e.preventDefault();
		setIsDisabled(true);
		mutate(title);
	}

	return (
		<form onSubmit={submitPost} className="p-6 my-8 bg-white rounded">
			{/* Textarea */}
			<div className="flex flex-col my-4">
				<textarea
					onChange={(e) => setTitle(e.target.value)}
					name="title"
					value={title}
					placeholder="What's on your mind?"
					className="p-3 bg-gray-200 rounded text-ls"
				></textarea>
			</div>

			{/* Post length + Submit */}
			<div className={`flex items-center text-xs justify-between`}>
				<p
					className={`${
						title.length > 100 ? "text-red-700" : "text-slate-700"
					}`}
				>
					{title.length} / 100
				</p>
				<button
					disabled={isDisabled}
					className="p-1 text-sm text-white bg-teal-600 border rounded border-slate-700 disabled:opacity-25"
				>
					Create post
				</button>
			</div>
		</form>
	);
}
