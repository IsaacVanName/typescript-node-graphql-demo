import { db } from '../../../mysql/database.js';
import { initModels } from '../../../mysql/models/init-models.js';

const models = initModels(db);

export const resolvers = {
    Query: {
        albums: () => {
            return models.albums.findAll({
                include: [
                    {
                        model: models.artists,
                        as: 'artist'
                    },
                    {
                        model: models.songs,
                        as: 'songs'
                    }
                ]
            });
        },
        album: (obj, args, context, info) => {
            return models.albums.findByPk(args.id, {
                include: [
                    {
                        model: models.artists,
                        as: 'artist'
                    },
                    {
                        model: models.songs,
                        as: 'songs'
                    }
                ]
            });
        },
    },

    Mutation: {
        createAlbum: (root, args) => {
            return models.albums.create(args.input);
        },
        updateAlbum: (root, args) => {
            return models.albums.update(args.input, {
                where: { id: args.input.id }
            });
        },
        deleteAlbum: (root, args) => {
            return models.albums.destroy({
                where: { id: args.input.id }
            });
        }
    }
}