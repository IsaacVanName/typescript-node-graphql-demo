import { TypeSource } from '@graphql-tools/utils';
import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';
import { GraphQLFile } from './graphqlfile';

// It's likely not necessary to combine the GraphQL type definitions, but wanted to demonstrate a bit of TypeScript.
export class Combiner {
    tables: string[] = [];
    inputs: string[] = [];
    queries: string[] = [];
    mutations: string[] = [];
    subscriptions: string[] = [];

    public combineAll(...args: GraphQLFile[]): Combiner {
        args.forEach((table) => {
            let contents: string = table.toString();
            let tableName: string = this._getTableNameFromFilename(table.filename);

            this.tables.push(this._getTypeTextFromContents(tableName, contents, true));
            this.inputs.push(this._getInputTextFromContents(tableName, contents, true));
            this.queries.push(this._getTypeTextFromContents('Query', contents));
            this.mutations.push(this._getTypeTextFromContents('Mutation', contents));
            this.subscriptions.push(this._getTypeTextFromContents('Subscription', contents));
        });

        return this;
    }

    public toGQL(): TypeSource {
        return gql`
            ${this.tables.join("\n\n")}
            
            ${this.inputs.join("\n\n")}

            type Query {
                ${this.queries.join("\n")}
            }

            type Mutation {
                ${this.mutations.join("\n")}
            }

            type Subscription {
                ${this.subscriptions.join("\n")}
            }
        `;
    }

    private _getTypeTextFromContents(typeName: string, contents: string, includeTag: boolean = false): string {
        const re: RegExp = new RegExp(`type ${typeName} {([^]*?)}`, 'm');
        const match: RegExpMatchArray = contents.match(re);

        if (includeTag) {
            return match[0];
        }

        return match[1];
    }

    // Would not normally duplicate this logic, but wanted to get the demo up for viewing. 
    // Realistically, these two methods should be part of a separate parsing class of some sort, and possibly the method below as well.
    private _getInputTextFromContents(typeName: string, contents: string, includeTag: boolean = false): string {
        const re: RegExp = new RegExp(`input ${typeName}Input {([^]*?)}`, 'm');
        const match: RegExpMatchArray = contents.match(re);

        if (includeTag) {
            return match[0];
        }

        return match[1];
    }

    private _getTableNameFromFilename(filename: string) {
        const re = new RegExp(/([^]*)\.graphql$/);
        const match = filename.match(re);
        
        if (match == null || match.length == 0) {
            return '';
        }

        // uppercase the first letter to match the type definition
        return match[1].substring(0, 1).toUpperCase() + match[1].substring(1);
    }
}