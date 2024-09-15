import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateCSVFromPages(pages) {
    const header = 'URL,Count';
    const rows = Object.entries(pages).map(([url, count]) => `${url},${count}`);
    const csvContent = [header, ...rows].join('\n');
    const outputPath = path.join(__dirname, 'output.csv');
    try {
        await fs.writeFile(outputPath, csvContent);
    } catch (err) {
        console.error('Error writing CSV file:', err);
    }
}
export { generateCSVFromPages};