var request = require("request");
const express = require("express");
const request = require("request");
const querystring = require("querystring");
const cors = require("cors");
const app = express();
app.get("/lyrics", (req, res) => {
  //musixmatch URL
  const musixMatchApiKey = `17dec0e1673916834f5044a23b8107d4`;
  const name = 'Kesariya (From "Brahmastra")';
  const artistName = "Pritam";
  const url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${name}&q_artist=${artistName}apikey=${musixMatchApiKey}&page_size=3&page=1&s_track_rating=desc`;
  request.get(url, (err, resp, body) => {
    if (resp.statusCode === 200) {
      res.send(body);
    }
  });
});
