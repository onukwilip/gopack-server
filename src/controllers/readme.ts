import { readReadmeFile, writeRemoteReadmeToLocalReadme } from "../utils";

export const getReadmeFile: (...handlers: any) => any = async (
  req,
  res,
  next,
  trial = 0
) => {
  if (trial >= 2)
    return res?.status(500)?.json({ message: "Error reading Readme file" });

  let readmeFile = await readReadmeFile().catch((e) =>
    console.log("Error reading readme file", e)
  );

  // IF ERROR READING README FILE
  if (!readmeFile) {
    // GET CONTENT FROM REMOTE REPOSITORY README FILE AND WRITE INTO LOCAL PROJECT README FILE
    await writeRemoteReadmeToLocalReadme().catch((e) =>
      console.log("There was an error writing to the readme file", e)
    );

    return getReadmeFile(req, res, next, trial + 1);
  }

  return res?.status(200)?.json(readmeFile);
};
