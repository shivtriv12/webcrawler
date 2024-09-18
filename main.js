import { crawlPage } from "./crawl.js";
import { sortPagesByCount } from "./sort.js";
import { generateCSVFromPages} from "./csv.js";
import { sendEmailWithAttachment } from "./email.js";
import { generateGraph } from "./visualisation.js";
import cron from 'node-cron';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main(){
    const args = process.argv.slice(2);
    if(args.length!==2){
        console.log('Error');
        process.exit(1);
    }
    const [url, email] = args;
    console.log('Crawler Started!!!');
    try{ 
        let pages = await crawlPage(url);
        const graphFilePath = path.join(__dirname, 'webgraph.png');
        generateGraph(pages, graphFilePath);
        pages = sortPagesByCount(pages);
        await generateCSVFromPages(pages);
        const csvFilePath = path.join(__dirname, 'output.csv');
        await sendEmailWithAttachment(email,csvFilePath,graphFilePath);
        process.exit(0);
    }catch(error){
        console.error('Error during crawling process:', error);
    }
}
main();
// cron.schedule('0 0 * * *', () => {
//     main();
// });