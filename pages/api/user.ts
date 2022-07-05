import { NextApiRequest, NextApiResponse } from "next";
import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

export default async function handleUser(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
  }

  try {
    const user = await fetchJson<{ username: string; id: number }>(
      `${CMS_URL}/users/me`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (error) {
    res.status(401).end();
  }
}
