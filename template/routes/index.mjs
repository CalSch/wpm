import fs from "fs";
import ejs from "ejs";
//  GET /
export function route(pageData,req) {
    return ejs.render( fs.readFileSync('./pages/index.html.ejs').toString() , pageData );
}