import mutations from './mutation';
import queries from './queries';

const resolvers = {
    Mutation: mutations,
    Query: queries,
}

export default resolvers;