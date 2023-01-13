const { Connection } = require("mongoose");
let mysql = require("mysql");
const config = require("../../config/dbconfig");
const router = require("express").Router();
const queries = require("../../config/sql");

router.get("/testmysql", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_Test()`;
  connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});

router.post("/v1/register", (req, res) => {
  const { fname, lname, email, password } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_RegisterUser(?,?,?,?)`;
  connection.query(
    sql,
    [fname, lname, email, password],
    (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      console.log(results[0]);
      connection.end();
      res.json(results[0]);
    }
  );
});

router.post("/v1/login", (req, res) => {
  const { email, pwd } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_LoginUser(?,?)`;
  connection.query(sql, [email, pwd], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});
// get liked songs list
router.get("/v1/liked-songs", (req, res) => {
  const userId = 3; // this need to be changed with each user
  let connection = mysql.createConnection(config);
  let sql = queries.getLiked;
  connection.query(sql, [userId], (error, results, fields) => {
    if (error) {
      return console.error(error);
    }
    console.log(results);
    res.json(results);
    connection.end();
  });
});
// like song
router.post("/v1/like-song", (req, res) => {
  const { song_id } = req.body;
  //   const song_id = "5RrOyaV2xOAnf62uWj24dB";

  const isoDate = new Date();
  const mySQLDateString = isoDate.toJSON().slice(0, 19).replace("T", " ");
  const userId = 3; // this need to be changed with each user
  let connection = mysql.createConnection(config);
  let sql = queries.like;
  connection.query(
    sql,
    [song_id, userId, mySQLDateString],
    (error, results, fields) => {
      if (error) {
        return console.error(error);
      }
      console.log(results);
      res.json({ status: "success" });
      connection.end();
    }
  );
});
router.delete("/v1/unlike", (req, res) => {
  const { song_id } = req.body;
  let connection = mysql.createConnection(config);
  const user_id = 3; //this need to change every time for different user
  let sql = queries.unlike;
  connection.query(sql, [song_id, user_id], (error, results, fields) => {
    if (error) {
      return console.log(error.message);
    }
    console.log(results);
    res.json({ status: "success" });
    connection.end();
  });
});

router.post("/v1/playlist/create", (req, res) => {
  const { userId, playlistName } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_CreateUserPlaylist(?,?)`;
  console.log("Playlist -" + playlistName + "is being created by user :" + userId);
  connection.query(sql, [userId, playlistName], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    connection.end();
    res.json(results);
  });
});

router.post("/v1/playlist/update", (req, res) => {
  const { userId, playlistId, playlistName, isActive } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_UpdatePlaylistDetails(?,?,?,?)`;
  console.log("playlistId -" + playlistId + "is being edited by user :" + userId);
  connection.query(sql, [userId, playlistId, playlistName, isActive], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    connection.end();
    res.json(results);
  });
});

// get user playlist
router.get("/v1/playlist/list", (req, res) => {
  const { userId } = req.query;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_GetUserPlaylists(?)`;
  console.log("getting playlists for user :", userId);
  connection.query(sql, [userId], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});


// get user playlist
router.post("/v1/playlist/song/add", (req, res) => {
  const { playlistId, songName, songUUID, href, previewURL, durationMS } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_AddSongToPlaylist(?,?,?,?,?,?)`;
  connection.query(sql, [playlistId, songName, songUUID, href, previewURL, durationMS], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});

router.post("/v1/playlist/song/artist/add", (req, res) => {
  const { songId, name, songhref, songuri } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_AddArtistInfoForPlaylistSong(?,?,?,?)`;
  connection.query(sql, [songId, name, songhref, songuri], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});

router.get("/v1/playlist/song/list", (req, res) => {
  const { playlistId } = req.query;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_GetPlaylistSongs(?)`;
  console.log("getting songs for playlist :", playlistId);
  connection.query(sql, [playlistId], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});


router.post("/v1/playlist/song/delete", (req, res) => {
  const { playlistId, songId } = req.body;
  let connection = mysql.createConnection(config);
  let sql = `CALL SP_RemoveSongFromPlaylist(?,?)`;
  connection.query(sql, [playlistId, songId], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();
    res.json(results[0]);
  });
});


// to add a song to the playlist
router.post("/v1/playlists/songs", (req, res) => {
  const { song_id, playlist_id } = req.body;
  console.log("i was called", playlist_id, song_id);
  let connection = mysql.createConnection(config);
  let user_id = 3;
  let sql = queries.addSongToPlaylist;
  connection.query(sql, [playlist_id, song_id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results[0]);
    res.json({ status: "success" });
    connection.end();
  });
});

// to get the list of songs
router.get("/v1/playlists/playlistId/songs", (req, res) => {
  const { playlist_id } = req.body;
  let connection = mysql.createConnection(config);
  let sql = queries.getPlaylistsSongList;
  connection.query(sql, [playlist_id], (error, results, fields) => {
    if (error) {
      return console.error(error);
    }
    console.log(results);
    res.json(results);
    connection.end();
  });
});
//GET PLAY LIST

module.exports = router;
