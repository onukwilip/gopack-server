import { getInstallationAccessToken, getInstallationClient } from "./auth";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export const getRemoteReadmeFile = async (owner: string, repo: string) => {
  const installationAccessToken = await getInstallationAccessToken(owner, repo);
  const installationClient = getInstallationClient(installationAccessToken);
  const response = await installationClient.repos.getContents({
    owner,
    repo,
    path: "README.md",
  });
  const responseObject = Buffer.from(
    response?.data?.content,
    "base64"
  )?.toString();

  return responseObject;
};

export const writeToReadme = async (readmeContent: string) => {
  await writeFile("./src/static/Readme.md", readmeContent).catch((e) =>
    console.log("Error updating the readme file", e)
  );
};

export const readReadmeFile = async () => {
  const readmeFile = await readFile(path.resolve("src/static/Readme.md")).catch(
    (e) => console.log("Error reading the readme file", e)
  );
  return readmeFile?.toString();
};

export const writeRemoteReadmeToLocalReadme = async () => {
  const remoteReadmeContents = await getRemoteReadmeFile("onukwilip", "gopack");
  if (typeof remoteReadmeContents === "string")
    await writeToReadme(remoteReadmeContents);
};
