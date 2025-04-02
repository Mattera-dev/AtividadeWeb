import express from "express";
import getConfig from "./src/config/env.js";

const app = express();

const config = getConfig();
