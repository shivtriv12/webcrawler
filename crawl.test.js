import { normalizeURL,getURLsFromHTML } from './crawl.js'
import { test, expect } from '@jest/globals'

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})
const htmlContent = `
<!DOCTYPE html>
<html>
  <head><title>Test Page</title></head>
  <body>
    <a href="https://example.com">Absolute URL</a>
    <a href="/relative-path">Relative URL</a>
    <a href="/another-relative-path">Another Relative URL</a>
  </body>
</html>
`;
const baseURL = 'https://mywebsite.com';
test('Convert relative URLs to absolute URLs', () => {
    let anchorElements = getURLsFromHTML(htmlContent,baseURL);
    
    expect(anchorElements.length).toBe(3);
    expect(anchorElements[0]).toBe('https://example.com/');
    expect(anchorElements[1]).toBe('https://mywebsite.com/relative-path');
    expect(anchorElements[2]).toBe('https://mywebsite.com/another-relative-path');
});