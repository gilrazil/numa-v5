console.log("🟢 Providers index.js loading...");

import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider
} from './AuthenticatedUserProvider';

console.log("🟢 Providers loaded successfully");
console.log("🟢 AuthenticatedUserContext:", AuthenticatedUserContext);
console.log("🟢 AuthenticatedUserProvider:", AuthenticatedUserProvider);

export { AuthenticatedUserContext, AuthenticatedUserProvider };
