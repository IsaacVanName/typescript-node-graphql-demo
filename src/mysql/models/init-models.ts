import type { Sequelize } from "sequelize";
import { albums as _albums } from "./albums.js";
import type { albumsAttributes, albumsCreationAttributes } from "./albums.js";
import { artists as _artists } from "./artists.js";
import type { artistsAttributes, artistsCreationAttributes } from "./artists.js";
import { songs as _songs } from "./songs.js";
import type { songsAttributes, songsCreationAttributes } from "./songs.js";

export {
  _albums as albums,
  _artists as artists,
  _songs as songs,
};

export type {
  albumsAttributes,
  albumsCreationAttributes,
  artistsAttributes,
  artistsCreationAttributes,
  songsAttributes,
  songsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const albums = _albums.initModel(sequelize);
  const artists = _artists.initModel(sequelize);
  const songs = _songs.initModel(sequelize);

  songs.belongsTo(albums, { as: "album", foreignKey: "album_id"});
  albums.hasMany(songs, { as: "songs", foreignKey: "album_id"});
  albums.belongsTo(artists, { as: "artist", foreignKey: "artist_id"});
  artists.hasMany(albums, { as: "albums", foreignKey: "artist_id"});
  songs.belongsTo(artists, { as: "artist", foreignKey: "artist_id"});
  artists.hasMany(songs, { as: "songs", foreignKey: "artist_id"});

  return {
    albums: albums,
    artists: artists,
    songs: songs,
  };
}
