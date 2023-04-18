const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    login: "admin",
    password: "admin",
    projectKey: "React-SonarQube",
    options: {
      "sonar.sources": "./src",
      "sonar.projectKey": "React-SonarQube",
      "sonar.token": "sqp_7cc31628a85a7f20abd2837aeb945e40216651f2",
      "sonar.exclusions": "src/assets/**.*",
    },
  },
  () => process.exit()
);
