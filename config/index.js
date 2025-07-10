console.log("🟢 Config index.js loading...");

import { Images } from "./images";
import { Colors } from "./theme";
import { auth } from "./firebase";

console.log("🟢 Config modules loaded:");
console.log("🟢 Images:", Images);
console.log("🟢 Colors:", Colors);
console.log("🟢 Auth:", auth);

export { Images, Colors, auth };
