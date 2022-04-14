//express route /v1/charger/:id

import express from "express";
import fetch from "node-fetch";
const app = express();

const PORT = 3000;

const getChargerPlugInfo = async () => {
  const response = await fetch(
    "https://ldl.viewer.cit-fusion.com/getObject_detail.php",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Referer:
          "https://ldl.viewer.cit-fusion.com/?lat=51.163361&lng=10.447683&zoom=6",
      },
      body: "post=eyJkaWZmX3RpbWVfem9uZSI6LTIsIm9iamVjdElEIjoiMzM3MjcwMzg2IiwicG9pcG9zaXRpb24iOiI1MC4xNDExOTcgOC4xNTY1NTYiLCJzdGF0ZUFsbCI6IjEwMDAwMCIsImNhdGVnb3J5IjoxLCJsYW5ndWFnZSI6ImRlIiwicHJvZ25vc2lzX29mZnNldCI6LTEsIndpbmRvd1NpemUiOjMwNX0=",
      method: "POST",
    }
  );

  const responseText = await response.text();

  const regex = /(?<=Anschlüsse.).{3}/g;

  const rawPlugs = regex.exec(responseText)[0].split("/");

  return {
    freePlugs: parseInt(rawPlugs[0]),
    overallPlugs: parseInt(rawPlugs[1]),
  };
};

app.get("/", async (req, res) => {
  const plugInfo = await getChargerPlugInfo();
  res.json(plugInfo);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}...`));
