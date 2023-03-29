import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { artists, artistsId } from './artists.js';
import { songs, songsId } from './songs.js';

export interface albumsAttributes {
  id: number;
  title: string;
  artist_id: number;
}

export type albumsPk = "id";
export type albumsId = albums[albumsPk];
export type albumsOptionalAttributes = "id";
export type albumsCreationAttributes = Optional<albumsAttributes, albumsOptionalAttributes>;

export class albums extends Model<albumsAttributes, albumsCreationAttributes> implements albumsAttributes {
  id!: number;
  title!: string;
  artist_id!: number;

  // albums hasMany songs via album_id
  songs!: songs[];
  getSongs!: Sequelize.HasManyGetAssociationsMixin<songs>;
  setSongs!: Sequelize.HasManySetAssociationsMixin<songs, songsId>;
  addSong!: Sequelize.HasManyAddAssociationMixin<songs, songsId>;
  addSongs!: Sequelize.HasManyAddAssociationsMixin<songs, songsId>;
  createSong!: Sequelize.HasManyCreateAssociationMixin<songs>;
  removeSong!: Sequelize.HasManyRemoveAssociationMixin<songs, songsId>;
  removeSongs!: Sequelize.HasManyRemoveAssociationsMixin<songs, songsId>;
  hasSong!: Sequelize.HasManyHasAssociationMixin<songs, songsId>;
  hasSongs!: Sequelize.HasManyHasAssociationsMixin<songs, songsId>;
  countSongs!: Sequelize.HasManyCountAssociationsMixin;
  // albums belongsTo artists via artist_id
  artist!: artists;
  getArtist!: Sequelize.BelongsToGetAssociationMixin<artists>;
  setArtist!: Sequelize.BelongsToSetAssociationMixin<artists, artistsId>;
  createArtist!: Sequelize.BelongsToCreateAssociationMixin<artists>;

  static initModel(sequelize: Sequelize.Sequelize): typeof albums {
    return albums.init({
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
        }
    }, {
        sequelize,
        tableName: 'albums',
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
            }
        ]
  });
  }
}
