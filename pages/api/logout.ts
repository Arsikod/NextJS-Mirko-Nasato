import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import cookie from "cookie";

export default function handleLogoun(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        path: "/api",
        expires: new Date(0),
      })
    )
    .json({});
}
