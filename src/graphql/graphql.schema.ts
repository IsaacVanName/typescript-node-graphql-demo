import { Combiner } from './schema/combiner.js';
import { GraphQLFile } from './schema/graphqlfile.js';

export const typeDefs = (new Combiner).combineAll(
    new GraphQLFile('tables/album'),
    new GraphQLFile('tables/artist'),
    new GraphQLFile('tables/song')
).toGQL();