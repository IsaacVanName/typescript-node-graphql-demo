import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { albums, albumsId } from './albums.js';
import { songs, songsId } from './songs.js';

export interface artistsAttributes {
  id: number;
  name: string;
}

export type artistsPk = "id";
export type artistsId = artists[artistsPk];
export type artistsOptionalAttributes = "id";
export type artistsCreationAttributes = Optional<artistsAttributes, artistsOptionalAttributes>;

export class artists extends Model<artistsAttributes, artistsCreationAttributes> implements artistsAttributes {
  id!: number;
  name!: string;

  // artists hasMany albums via artist_id
  albums!: albums[];
  getAlbums!: Sequelize.HasManyGetAssociationsMixin<albums>;
  setAlbums!: Sequelize.HasManySetAssociationsMixin<albums, albumsId>;
  addAlbum!: Sequelize.HasManyAddAssociationMixin<albums, albumsId>;
  addAlbums!: Sequelize.HasManyAddAssociationsMixin<albums, albumsId>;
  createAlbum!: Sequelize.HasManyCreateAssociationMixin<albums>;
  removeAlbum!: Sequelize.HasManyRemoveAssociationMixin<albums, albumsId>;
  removeAlbums!: Sequelize.HasManyRemoveAssociationsMixin<albums, albumsId>;
  hasAlbum!: Sequelize.HasManyHasAssociationMixin<albums, albumsId>;
  hasAlbums!: Sequelize.HasManyHasAssociationsMixin<albums, albumsId>;
  countAlbums!: Sequelize.HasManyCountAssociationsMixin;
  // artists hasMany songs via artist_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof artists {
    return artists.init({
        id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
        },
        name: {
        type: DataTypes.TEXT,
        allowNull: false
        }
    }, {
        sequelize,
        tableName: 'artists',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                { name: "id" },
                ]
            }
        ]
    });
  }
}
