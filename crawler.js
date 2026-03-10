import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

const BASE = "https://www.ritualfoundation.org";

const pages = [
  "/docs/overview/what-is-ritual"
];

async function crawl() {

  let content = "";

  for (const page of pages) {

    const url = BASE + page;

    try {

      console.log("Downloading:", url);

      const res = await axios.get(url);

      const $ = cheerio.load(res.data);

      const text = $("body").text();

      content += text + "\n\n";

    } catch (err) {

      console.log("Error:", err.message);
    }
  }

  fs.writeFileSync("ritual_docs_full.txt", content);

  console.log("Docs saved.");
}

crawl();