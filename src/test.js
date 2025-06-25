import { suggest, getSuggestions } from "../src/index.js"

console.log(suggest("javsacript", ["javascript", "java", "typescript"]));
// => "javascript"

console.log(getSuggestions("gril", ["girl", "grill", "grillz"]));
// => [ 'girl', 'grill', 'grillz' ]
