# Web Crawler

A **web crawler** is an automated script or program that systematically browses the web, extracting and analyzing information from websites. Web crawlers are often used to index websites for search engines, gather data, and analyze relationships between different web pages.

## Features

- Crawls a website starting from a base URL.
- Identifies and extracts internal and external links.
- Generates a CSV report with link counts.
- Creates a graph visualization of the website's link structure.
- Sends the CSV and graph visualization via email.

## How to Clone and Set Up the Project

clone the repo:
```bash
https://github.com/shivtriv12/webcrawler.git
```
install dependencies:
```bash
npm install
```
environment variables setup(in .env file):
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-passkey
```
usage:
```bash
npm run start <url> <email>
```

.
├── crawl.js         # Crawls the website and extracts links.
├── sort.js          # Sorts the pages based on link counts.
├── csv.js           # Generates CSV from the crawled data.
├── email.js         # Sends the CSV and graph via email.
├── visualisation.js # Generates graph visualizations.
└── output.csv       # The generated CSV report (output after running).