import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.slice(-1) === '/') {
      fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
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

async function fetchHTML(url) {
  let res
  try {
    res = await fetch(url)
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`)
  }

  if (res.status > 399) {
    throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`)
  }

  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    throw new Error(`Got non-HTML response: ${contentType}`)
  }

  return res.text()
}  

async function crawlPage(baseURL, currentURL = baseURL, pages = {internal: {}, external: {}, invalid: {}}) {
    const currentURLObj = new URL(currentURL)
    const baseURLObj = new URL(baseURL)
    if (currentURLObj.hostname !== baseURLObj.hostname) {
      pages.external[normalizeURL(currentURL)] = (pages.external[normalizeURL(currentURL)] || 0) + 1;
      return pages;
    }
    const normalizedURL = normalizeURL(currentURL);
    if (pages.internal[normalizedURL]) {
      pages.internal[normalizedURL] = (pages.internal[normalizedURL] || 0) + 1;
      return pages;
    }
    pages.internal[normalizedURL] = 1;
    console.log(`crawling ${currentURL}`);
    let html = ''
    try {
      html = await fetchHTML(currentURL)
    } catch (err) {
      console.log(`${err.message}`)
      pages.invalid[normalizeURL(currentURL)] = (pages.invalid[normalizeURL(currentURL)] || 0) + 1;
      return pages;
    }
    const nextURLs = getURLsFromHTML(html, baseURL)
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
    return pages;
}

export {getURLsFromHTML,normalizeURL,crawlPage};