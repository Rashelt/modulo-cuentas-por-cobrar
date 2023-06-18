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
      "sonar.token": "sqp_6865aa336301e9eeaa1f3d220d4afb74c8f8e519",
      "sonar.exclusions": "src/assets/**.*, src/components/**.*, src/helpers/**.*",
    },
  },
  () => process.exit()
);
