import type { NextApiRequest, NextApiResponse } from "next";
import { Dirent, opendirSync } from "fs";
import { PATH } from "src/constants";

export type Data = {
  path: string;
  files: Dirent[];
};

type APIError = {
  error: string;
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data | APIError>
) {
  try {
    const files = [];
    const dir = opendirSync(PATH);
    for await (const entry of dir) {
      if (entry.isFile()) files.push(entry);
    }
    res.status(200).json({ path: PATH, files });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
}
