import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateCSVFromPages(pages) {
    const header = 'Type,URL,Count';

    const internalRows = pages.internal.map(([url, count]) => `Internal Link,${url},${count}`);
    const externalRows = pages.external.map(([url, count]) => `External Link,${url},${count}`);
    const invalidRows = pages.invalid.map(([url, count]) => `Non HTML/TEXT Link,${url},${count}`);

    const csvContent = [header, ...internalRows, ...externalRows, ...invalidRows].join('\n');

    const outputPath = path.join(__dirname, 'output.csv');

    try {
        await fs.writeFile(outputPath, csvContent);
    } catch (err) {
        console.error('Error writing CSV file:', err);
    }
}
export { generateCSVFromPages };