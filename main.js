import { crawlPage } from "./crawl.js";
async function main(){
    const args = process.argv.slice(2);
    if(args.length>1){
        console.log('Error');
        process.exit(1);
    }
    else if(args.length<1){
        console.log('Error');
        process.exit(1);
    }
    else{
        console.log('Crawler Started!!!');
        await crawlPage(args);
        process.exit(0);
    }
}
main();