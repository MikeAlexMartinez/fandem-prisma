module.exports = [
  {
    email: "mike.alex.martinez+admin@gmail.com",
    name: "Michael Martinez",
    countryCode: "",
    phoneNumber: "",
    displayName: "hurriKANE",
    isPrivate: false,
    password: process.env.SUPER_USER_PWD,
    resetToken: null,
    resetTokenExpiry: null,
    favoriteTeam: "Spurs",
    country: "United Kingdom",
    userRoles: ["ADMIN"],
    subscriptions: ["TESTER"]
  },
  {
    email: "mike.alex.martinez+user@gmail.com",
    name: "Mike Marty",
    countryCode: "",
    phoneNumber: "",
    displayName: "A Sterling Performance",
    isPrivate: false,
    password: process.env.NORMAL_USER,
    resetToken: null,
    resetTokenExpiry: null,
    favoriteTeam: "Fulham",
    country: "United Kingdom",
    userRoles: ["USER"],
    subscriptions: ["TESTER"]
  }
];
