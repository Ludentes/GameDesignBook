import { fromVault } from 'fumadocs-obsidian';

await fromVault({
  dir: '../games-with-llms',
  out: {
    contentDir: './temp/docs2',
    // you can specify the locations of `/public` & `/content/docs` folder
  },
});