import fs from 'fs';
import path from 'path';

interface Meta {
  title?: string;
  pages?: string[];
  root?: boolean;
}

async function generateTableOfContents(
  contentDir: string = './content/docs',
  outputFile: string = 'table_of_contents.txt'
): Promise<void> {
  let output = '';

  async function processFolder(folderPath: string, depth: number = 0): Promise<void> {
    const indent = '  '.repeat(depth);
    const metaPath = path.join(folderPath, 'meta.json');

    if (!fs.existsSync(metaPath)) {
      return;
    }

    let meta: Meta = {};
    try {
      const metaContent = fs.readFileSync(metaPath, 'utf-8');
      meta = JSON.parse(metaContent);
    } catch (err) {
      console.error(`Error parsing ${metaPath}:`, err);
      return;
    }

    // Add folder title if available
    if (meta.title && depth > 0) {
      output += `\n${indent}${meta.title}\n`;
    }

    // Process pages in exact order from meta.json
    if (meta.pages && Array.isArray(meta.pages)) {
      for (const page of meta.pages) {
        if (page.startsWith('---') && page.endsWith('---')) {
          // Section separator
          const section = page.replace(/---/g, '').trim();
          if (section) {
            output += `${indent}  ${section}\n`;
          }
        } else if (page === '...' || page === 'z...a') {
          // Rest operators - include remaining files/folders
          const entries = fs.readdirSync(folderPath, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.name === 'meta.json' || entry.name.startsWith('.')) continue;
            
            if (entry.isDirectory()) {
              output += `${indent}  ${entry.name}/\n`;
              const subFolderPath = path.join(folderPath, entry.name);
              await processFolder(subFolderPath, depth + 1);
            } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
              const pageName = entry.name.replace(/\.(mdx?|md)$/, '');
              output += `${indent}  ${pageName}\n`;
            }
          }
        } else if (page.startsWith('...')) {
          // Folder extraction - process subfolder inline
          const folderName = page.substring(3);
          const subFolderPath = path.join(folderPath, folderName);
          if (fs.existsSync(subFolderPath)) {
            output += `${indent}  ${folderName}/\n`;
            await processFolder(subFolderPath, depth + 1);
          }
        } else if (page.startsWith('!')) {
          // Exclude item - skip
          continue;
        } else if (page.startsWith('[') && page.includes('](')) {
          // External link
          output += `${indent}  ${page}\n`;
        } else {
          // Check if it's a folder
          const possibleFolder = path.join(folderPath, page);
          if (fs.existsSync(possibleFolder) && fs.statSync(possibleFolder).isDirectory()) {
            output += `${indent}  ${page}/\n`;
            await processFolder(possibleFolder, depth + 1);
          } else {
            // Regular page file
            output += `${indent}  ${page}\n`;
          }
        }
      }
    }
  }

  output += 'Documentation Contents\n';
  output += '=====================\n\n';

  if (fs.existsSync(contentDir)) {
    await processFolder(contentDir);
  } else {
    console.error(`Content directory not found: ${contentDir}`);
    return;
  }

  fs.writeFileSync(outputFile, output, 'utf-8');
  console.log(`✅ Generated: ${outputFile}`);
}

// Run
generateTableOfContents().catch(console.error);
