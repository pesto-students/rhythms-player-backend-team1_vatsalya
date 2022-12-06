// defining variable
// const likesTableCreateQuery = create table rhythms_dev.tbl_likes
// (
//     song_id           varchar  not null,
//     user_id           int      not null comment 'this is the  foreign key',
//     created_timestamp datetime not null,
//     id                INT8 auto_increment,
//     constraint tbl_likes_pk
//         primary key (id),
//     constraint tbl_likes_tbl_user_master_user_id_fk
//         foreign key (user_id) references rhythms_dev.tbl_user_master (user_id)
// );
// create table rhythms_dev.tbl_likes
// (
//     song_id           varchar(100) not null,
//     user_id           int            not null comment 'this is the  foreign key',
//     created_timestamp datetime       not null,
//     id                INT8 auto_increment,
//     constraint tbl_likes_pk
//         primary key (id),
//     constraint tbl_likes_tbl_user_master_user_id_fk
//         foreign key (user_id) references rhythms_dev.tbl_user_master (user_id)
// );
// create table rhythms_dev.tbl_song_history
// (
//     song_id           varchar(100) not null,
//     user_id           int            not null ,
//     created_timestamp datetime       not null,
//     id                INT8 auto_increment,
//     constraint tbl_song_history_pk
//         primary key (id),
//     constraint tbl_song_history_tbl_user_master_user_id_fk
//         foreign key (user_id) references rhythms_dev.tbl_user_master (user_id)
// );
// create table rhythms_dev.tbl_playlist
// (
//     id                INT8 auto_increment,
//     name              varchar(500) not null,
//     user_id           int          not null,
//     created_timestamp int          null,
//     constraint tbl_playlist_pk
//         primary key (id),
//     constraint tbl_playlist_tbl_user_master_user_id_fk
//         foreign key (user_id) references rhythms_dev.tbl_user_master (user_id)
// );
// create table rhythms_dev.tbl_playlist_song
// (
//     playlist_id INT8          null,
//     song_id     varchar(100) null,
//      created_timestamp datetime       not null,
//     constraint tbl_playlist_song_tbl_playlist_id_fk
//         foreign key (playlist_id) references rhythms_dev.tbl_playlist (id)
// );
// likes tbl entry
const like = `insert into tbl_likes (song_id, user_id, created_timestamp)
values (?,?,?);`;
const getLiked = `SELECT song_id,
created_timestamp
FROM tbl_likes
WHERE user_id = ? ORDER BY created_timestamp DESC LIMIT 20`;

const isLiked = `SELECT EXISTS ( SELECT id
    FROM tbl_likes
    WHERE user_id = ?
      AND song_id = ? )`;

const unlike = `DELETE
FROM tbl_likes
WHERE song_id = ?
AND user_id = ?`;

// history

const createHistoryEntry = `insert into tbl_song_history (song_id, user_id, created_timestamp)
values (?,?,?);`;

const getHistory = `SELECT * FROM  tbl_song_history WHERE user_id = ? ORDER BY created_timestamp DESC LIMIT 30`;

// playlist queries
const getPlaylists = `SELECT name
from tbl_playlist
where user_id = ?
order by created_timestamp DESC`;

// create playlist
const createPlaylist = `insert into tbl_playlist (id, name, user_id, created_timestamp)
values (?,?,?,?);`;

// add song to playlist
const addSongToPlaylist = `insert into tbl_playlist_song (playlist_id, song_id)
values (?,?);`;

module.exports = {
  getLiked,
  isLiked,
  unlike,
  like,
  createHistoryEntry,
  getHistory,
  getPlaylists,
  createPlaylist,
  addSongToPlaylist,
};
