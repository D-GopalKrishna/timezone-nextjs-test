import { bookstore } from "./bookstore";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { title, author } = req.body;
        const book = { title, author };
        // bookstore.push(book);
        res.status(201).json(book);
    } else {
        res.status(200).json(bookstore);
    }
}
