import { writeRemoteReadmeToLocalReadme } from "../utils";

export const eventsController: (...handlers: any) => any = async (
  req,
  res,
  next
) => {
  const { body } = req;

  // IF EVENT HAPPENED ON THE `main` BRANCH
  if (body?.ref?.split("/")[2] === "main") {
    // UPDATE THE LOCAL README FILE
    await writeRemoteReadmeToLocalReadme().catch((e) =>
      console.log("There was an error writing to the readme file", e)
    );
  }

  next();
};
