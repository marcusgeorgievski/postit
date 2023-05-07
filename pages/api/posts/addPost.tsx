import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

// import prisma from "@prisma/client"; // idk why this doesnt work
import prisma from "../../../prisma/client";

type Date = { name: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		// Check is user is logged in
		const session = await getServerSession(req, res, authOptions);
		if (!session)
			return res
				.status(401)
				.json({ message: "Please sign in to make a post" });

		const title: string = req.body.title;

		// Validate post
		if (title.length > 300)
			return res
				.status(403)
				.json({ message: "Please write a shorter post!" });
		if (!title.length)
			return res.status(403).json({ message: "Post cannot be empty!" });

		// Get user
		const prismaUser = await prisma.user.findUnique({
			where: { email: session.user?.email },
		});

		// Create post
		try {
			const result = await prisma.post.create({
				data: {
					title,
					userId: prismaUser.id,
				},
			});
			res.status(200).json(result);
		} catch (error) {
			res.status(403).json({
				message: "Error has appeared whilst making a post",
			});
		}
	}
}
