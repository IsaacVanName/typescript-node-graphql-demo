import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

// Import all of the schemas as a combined schema, which is admittedly an optional step for demo purposes only.
import { typeDefs } from './graphql/graphql.schema.js';

// Bring in the resolvers! Feels like there's a better way to do this.
import { resolvers as resolversAlbum } from './graphql/schema/resolvers/album.js';
import { resolvers as resolversArtist } from './graphql/schema/resolvers/artist.js';
import { resolvers as resolversSong } from './graphql/schema/resolvers/song.js';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        // possibly a bit redundant, but also made me laugh a bit :P
        Query: {
            ...resolversAlbum.Query, 
            ...resolversArtist.Query,
            ...resolversSong.Query
        },
    
        Mutation: {
            ...resolversAlbum.Mutation, 
            ...resolversArtist.Mutation,
            ...resolversSong.Mutation
        }
    }
});

await server.start();
server.applyMiddleware({ app });

app.get('/', (req, res) => {
    res.send('Welcome to the demo API!');
});

// Listen on port 80, which is handled from a different outside port by Docker's replica scaling
app.listen({ port: 80 }, () => {
    console.log('Server is running on port 80.');
});