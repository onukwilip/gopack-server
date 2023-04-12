import { App } from "@octokit/app";
import Octokit from "@octokit/rest";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = new App({
  id: +(process.env.GITHUB_APP_ID || ""),
  privateKey: process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, "\n") as string,
});

/**
 * This method will generate an installationAccessToken which we will further pass to create
 * installation level client for GitHub API.
 *
 * @param {string} owner A name of github account, repository with installation
 * belongs to. E.g. 'knidarkness'
 * @param {string} repo A name of a repository with GitHub App installed. E.g. 'github-app-nodejs'
 */
export const getInstallationAccessToken = async (
  owner: string,
  repo: string
) => {
  const jwt: any = app.getSignedJsonWebToken();

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/installation`,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
        accept: "application/vnd.github.machine-man-preview+json",
      },
    }
  );
  const installationId = response?.data?.id;
  const installationAccessToken = await app?.getInstallationAccessToken({
    installationId,
  });

  return installationAccessToken;
};
export const getInstallationClient = (installationAccessToken: string) =>
  new Octokit({
    auth: () => `token ${installationAccessToken}`,
  });
