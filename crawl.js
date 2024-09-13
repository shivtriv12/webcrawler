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
export {getURLsFromHTML,normalizeURL};