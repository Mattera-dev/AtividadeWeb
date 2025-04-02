import yaml from "yaml";
import { readFileSync } from "fs";

const getConfig = () => {
  try {
    const config = yaml.parse(readFileSync("./env.yaml", "utf-8"));
    return config;
  } catch (error) {
    console.error(error);
  }
};

export default getConfig;
