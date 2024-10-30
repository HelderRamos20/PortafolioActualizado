import { defineConfig } from 'vite';
import * as glob from "glob";
import path, { resolve } from "node:path";
import purgecss from 'vite-plugin-purgecss';

const getHtmlEntries = ()=>{
    return Object.fromEntries(
        [
            ...glob.sync('./**/*.html', { ignore:['./dist/**','./node_modules/**']}).map(file=>[
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ])
        ]
    )
}

export default defineConfig(
    {
    appType: 'mpa',
    base: "/miportafolio/",
    build: {
    rollupOptions: {
      input: {
        input: getHtmlEntries()
        /*main: './index.html',
        about: './pages/about.html',
        projects: './pages/projects.html',
        contact: './pages/contact.html',*/
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    purgecss({
      content: [
        './pages/about.html/contact.html/proyects.html',
        './src/main.js/',     
      ],
    }),
  ],
});
