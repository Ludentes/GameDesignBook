import { fromVault } from 'fumadocs-obsidian';

await fromVault({
  dir: '../games-with-llms',
  out: {
    contentDir: './content/docs',
    // you can specify the locations of `/public` & `/content/docs` folder
  },
});