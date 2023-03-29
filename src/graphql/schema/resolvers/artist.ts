import { db } from '../../../mysql/database.js';
import { initModels } from '../../../mysql/models/init-models.js';

const models = initModels(db);

export const resolvers = {
    Query: {
        artists: () => {
            return models.artists.findAll({
                include: [ 
                    {
                        model: models.albums,
                        as: 'albums'
                    }, 
                    {
                        model: models.songs,
                        as: 'songs'
                    }
                ]
            });
        },
        artist: (obj, args, context, info) => {
            return models.artists.findByPk(args.id, {
                include: [ 
                    {
                        model: models.albums,
                        as: 'albums'
                    }, {
                        model: models.songs,
                        as: 'songs'
                    }
                ]
            });
        }
    },

    Mutation: {
        createArtist: (root, args) => {
            return models.artists.create(args.input);
        },
        updateArtist: (root, args) => {
            return models.artists.update(args.input, {
                where: { id: args.input.id }
            });
        },
        deleteArtist: (root, args) => {
            return models.artists.destroy({
                where: { id: args.input.id }
            });
        }
    }
}
