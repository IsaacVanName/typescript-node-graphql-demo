import { db } from '../../../mysql/database.js';
import { initModels } from '../../../mysql/models/init-models.js';

const models = initModels(db);

export const resolvers = {
    Query: {
        songs: () => {
            return models.songs.findAll({
                include: [
                    {
                        model: models.artists,
                        as: 'artist'
                    },
                    {
                        model: models.albums,
                        as: 'album'
                    }
                ]
            });
        },
        song: (obj, args, context, info) => {
            return models.songs.findByPk(args.id, {
                include: [
                    {
                        model: models.artists,
                        as: 'artist'
                    },
                    {
                        model: models.albums,
                        as: 'album'
                    }
                ]
            });
        }
    },

    Mutation: {
        createSong: (root, args) => {
            return models.songs.create(args.input);
        },
        updateSong: (root, args) => {
            return models.songs.update(args.input, {
                where: { id: args.input.id }
            });
        },
        deleteSong: (root, args) => {
            return models.songs.destroy({
                where: { id: args.input.id }
            });
        }
    }
}
