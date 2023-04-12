import { readReadmeFile, writeRemoteReadmeToLocalReadme } from "../utils";
import client from "../mqtt-client";

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
    // GET THE README FILE
    const readme = await readReadmeFile().catch((e) =>
      console.log("Error reading readme file")
    );
    // IF README FILE IS SUCCESSFULLY READ
    if (readme) {
      // PUBLISH TO THE MQTT  CLIENT
      client.publish(
        process.env.MQTT_TOPIC as string,
        JSON.stringify({ readme: readme }),
        { qos: 1 }
      );
    }
  }

  next();
};
