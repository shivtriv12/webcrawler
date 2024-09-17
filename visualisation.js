import graphviz from 'graphviz';

/**
 * Function to generate a graph visualization from crawled pages.
 * @param {Object} pages - Crawled pages containing internal, external, and invalid links.
 * @param {string} outputPath - File path to save the graph visualization.
 */

function generateGraph(pages, outputPath) {
  const g = graphviz.digraph('G');

  Object.keys(pages.internal).forEach((url) => {
    g.addNode(url, { color: 'blue' });
  });

  Object.keys(pages.external).forEach((url) => {
    g.addNode(url, { color: 'green' });
  });

  Object.keys(pages.invalid).forEach((url) => {
    g.addNode(url, { color: 'red' });
  });

  Object.entries(pages.internal).forEach(([url]) => {
    const nextURLs = pages.nextLinks[url];
    if (nextURLs) {
      nextURLs.forEach((nextURL) => {
        g.addEdge(url, nextURL);
      });
    }
  });

  g.output('png', outputPath, (err, stdout, stderr) => {
    if (err) {
      console.error('Error generating graph:', err);
    } else {
      console.log(`Graph saved as ${outputPath}`);
    }
  });
}

export { generateGraph };