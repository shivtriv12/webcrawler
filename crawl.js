import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}
function getURLsFromHTML(htmlBody,baseURL){
    const allurls=[];
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document;
    const anchorElements = document.querySelectorAll('a');
    for(let i = 0;i<anchorElements.length;i++){
        if(anchorElements[i].hasAttribute('href')){
            let href = anchorElements[i].getAttribute('href');
            try {
                // convert any relative URLs to absolute URLs
                href = new URL(href, baseURL).href
                allurls.push(href)
              } catch(err) {
                console.log(`${err.message}: ${href}`)
            }
        }
    }
    return allurls;
}

async function crawlPage(url){
    try{
        const response = await fetch(url);
        if (response.status >= 400) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.error(`Invalid content-type! Expected text/html but received ${contentType}`);
            return;
        }
        const data = await response.text();
        console.log('HTML fetched successfully:\n', data);
    }
    catch{
        console.error('Error fetching data:', error);
    }
}
export {getURLsFromHTML,normalizeURL,crawlPage};