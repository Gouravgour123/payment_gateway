const fs = require("fs");
const path = require("path");

const loadRoutes = (app) => {
  // Path to the features directory
  const featuresPath = path.join(__dirname);
  // Read all feature directories
  fs.readdirSync(featuresPath).forEach((feature) => {
    const featurePath = path.join(featuresPath, feature);
    if (fs.statSync(featurePath).isDirectory()) {
      // Assuming version directories are present inside each feature
      fs.readdirSync(featurePath).forEach((version) => {
        const versionPath = path.join(featurePath, version);
        if (fs.statSync(versionPath).isDirectory()) {
          fs.readdirSync(versionPath).forEach((routeFile) => {
            const routePath = path.join(versionPath, routeFile);
            if (routePath.endsWith("Routes.js")) {
              const route = require(routePath);
              // Assuming the route files export an object with path and router
              if (route.path && route.router) {
                app.use(route.path, route.router);
              }
            }
          });
        }
      });
    }
  });
};

module.exports = { loadRoutes };
