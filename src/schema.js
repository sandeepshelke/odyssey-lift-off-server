const { gql } = require("apollo-server");

const typeDefs = gql`
type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!
    "Get a specific track for given non null id"
    track(id: ID!): Track
    "Fetch a specific module, provided a module's ID"
    module(id: ID!): Module!
}

type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
}

type IncrementTrackViewsResponse {
    "Similar to http status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
}

"A track is a group of Modules that teaches about a specific topic"
type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main author"
    author: Author!
    "The track's main illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The track's full duration, in seconds"
    durationInSeconds: Int
    "The number of modules this track contains"
    modulesCount: Int
    "The track's complete description, can be in markdown"
    description: String
    "The number of times the track has been viewed"
    numberOfViews: Int
    "The track's complete array of modules"
    modules: [Module!]!
}

"A module is a single unit of teaching. Multiple modules compose a track"
type Module {
    id: ID!
    "The module's title"
    title: String!
    "The module's length in minutes"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The module's video duration, in seconds"
    durationInSeconds: Int
    "The module's text-based description, can be in markdown format. In case of a video, it will be the enriched transcript"
    content: String
    "The module's video url, for video-based modules"
    videoUrl: String
}

"Author of a complete Track or a Module"
type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture url"
    photo: String
}
`;

module.exports = typeDefs;
