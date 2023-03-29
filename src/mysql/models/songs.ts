import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { albums, albumsId } from './albums.js';
import type { artists, artistsId } from './artists.js';

export interface songsAttributes {
  id: number;
  title: string;
  artist_id: number;
  album_id?: number;
}

export type songsPk = "id";
export type songsId = songs[songsPk];
export type songsOptionalAttributes = "id" | "album_id";
export type songsCreationAttributes = Optional<songsAttributes, songsOptionalAttributes>;

export class songs extends Model<songsAttributes, songsCreationAttributes> implements songsAttributes {
  id!: number;
  title!: string;
  artist_id!: number;
  album_id?: number;

  // songs belongsTo albums via album_id
  album!: albums;
  getAlbum!: Sequelize.BelongsToGetAssociationMixin<albums>;
  setAlbum!: Sequelize.BelongsToSetAssociationMixin<albums, albumsId>;
  createAlbum!: Sequelize.BelongsToCreateAssociationMixin<albums>;
  // songs belongsTo artists via artist_id
  artist!: artists;
  getArtist!: Sequelize.BelongsToGetAssociationMixin<artists>;
  setArtist!: Sequelize.BelongsToSetAssociationMixin<artists, artistsId>;
  createArtist!: Sequelize.BelongsToCreateAssociationMixin<artists>;

  static initModel(sequelize: Sequelize.Sequelize): typeof songs {
    return songs.init({
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        artist_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'artists',
                key: 'id'
            }
        },
        album_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            references: {
                model: 'albums',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'songs',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                { name: "id" },
                ]
            },
            {
                name: "artist_id",
                using: "BTREE",
                fields: [
                { name: "artist_id" },
                ]
            },
            {
                name: "album_id",
                using: "BTREE",
                fields: [
                { name: "album_id" },
                ]
            }
        ]
  });
  }
}
