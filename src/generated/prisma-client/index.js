"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "UserPhoto",
    embedded: false
  },
  {
    name: "Photo",
    embedded: false
  },
  {
    name: "Status",
    embedded: false
  },
  {
    name: "UserStatus",
    embedded: false
  },
  {
    name: "Follower",
    embedded: false
  },
  {
    name: "UserFollowers",
    embedded: false
  },
  {
    name: "Influencer",
    embedded: false
  },
  {
    name: "UserInfluencers",
    embedded: false
  },
  {
    name: "UserRole",
    embedded: false
  },
  {
    name: "UserAssignedRole",
    embedded: false
  },
  {
    name: "ActiveSubscriptions",
    embedded: false
  },
  {
    name: "FandemSubscription",
    embedded: false
  },
  {
    name: "Country",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "Season",
    embedded: false
  },
  {
    name: "Gameweek",
    embedded: false
  },
  {
    name: "HomeTeamFixture",
    embedded: false
  },
  {
    name: "AwayTeamFixture",
    embedded: false
  },
  {
    name: "Fixture",
    embedded: false
  },
  {
    name: "ContestType",
    embedded: false
  },
  {
    name: "ContestCreator",
    embedded: false
  },
  {
    name: "ContestOwner",
    embedded: false
  },
  {
    name: "Contest",
    embedded: false
  },
  {
    name: "ContestUserType",
    embedded: false
  },
  {
    name: "ContestInviter",
    embedded: false
  },
  {
    name: "ContestUser",
    embedded: false
  },
  {
    name: "ContestSlate",
    embedded: false
  },
  {
    name: "ContestSlateEntry",
    embedded: false
  },
  {
    name: "ContestPrediction",
    embedded: false
  },
  {
    name: "ScoringType",
    embedded: false
  },
  {
    name: "DefaultScoringSystemHeader",
    embedded: false
  },
  {
    name: "DefaultScoringSystemDetail",
    embedded: false
  },
  {
    name: "ScoringSystemHeader",
    embedded: false
  },
  {
    name: "ScoringSystemDetail",
    embedded: false
  },
  {
    name: "ContestPredictionScore",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["MY_SECRET"]}`
});
exports.prisma = new exports.Prisma();
