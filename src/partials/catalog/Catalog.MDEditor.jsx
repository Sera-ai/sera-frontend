import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import {
  codeBlockPlugin, codeMirrorPlugin, sandpackPlugin, tablePlugin, linkDialogPlugin, linkPlugin, imagePlugin, thematicBreakPlugin, frontmatterPlugin,
  directivesPlugin, diffSourcePlugin, markdownShortcutPlugin, AdmonitionDirectiveDescriptor,
  listsPlugin,
  quotePlugin,
  headingsSystem,
  headingsPlugin,
  toolbarPlugin,
  KitchenSinkToolbar
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live',
      sandpackTemplate: 'react',
      sandpackTheme: 'dark',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
}

const Editor = forwardRef(({ edit = true, oas = {}, setOas }, ref) => {
  const location = useLocation();
  const mdxEditorRef = useRef();  // Create a ref object

  const [markdown, setMarkdown] = useState(markDownBuilder({ oas, location }));
  const [oasitem, setOasItem] = useState(markDownBuilder({ oas, location }));


  // Use useEffect to update markdown whenever oas changes
  useEffect(() => {
    const newMarkdown = markDownBuilder({ oas, location });
    // If MDXEditor provides an imperative method for setting markdown, use it
    if (mdxEditorRef.current && mdxEditorRef.current.setMarkdown) {
      mdxEditorRef.current.setMarkdown(newMarkdown);
    } else {
      // If not, we fall back to the standard way of setting markdown
      setMarkdown(newMarkdown);
    }
  }, [location]); // Only re-run the effect if oas changes


  useImperativeHandle(ref, () => ({
    saveOasItem,
  }));

  const saveOasItem = () => {
    updateOas(oasitem, location, oas, setOas)
  }


  return (
    <div className="mdxeditor" style={{ minHeight: '50vh', minWidth: "100%", maxHeight: "70vh" }}>
      <MDXEditor
        markdown={markdown}
        className="dark-theme dark-editor w-full h-full"
        readOnly={!edit}
        onChange={(md) => { setOasItem(md) }}
        ref={mdxEditorRef}
        plugins={[
          headingsPlugin(),
          toolbarPlugin({ toolbarContents: () => (<KitchenSinkToolbar />) }),
          tablePlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          linkDialogPlugin(),
          imagePlugin({ imageUploadHandler: async () => '/sample-image.png' }),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
          directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
          diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: `` }),
        ]
        }
      />
    </div>

  )
})

export default Editor

function markDownBuilder({ oas, location }) {
  const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"]

  const { pathname } = location;
  const paths = pathname.split("/")
  paths.shift() //remove blank
  paths.shift() //remove catalog
  paths.shift() //remove host
  let method = null

  if (matchMethod.includes(paths[paths.length - 1])) {
    method = (paths.pop()).replace("__", "").toUpperCase()
  }
  const path = `/${paths.join("/")}`
  const res = getDescriptionByPathAndMethod(oas, path, method)
  return res
}



function getDescriptionByPathAndMethod(oas, rawpath, method) {
  const path = decodeURIComponent(rawpath)
  // Check if the path is just the host
  if (path === '/' || !method) {
    return oas.info && oas.info.description ? oas.info.description : false;
  }

  // Normalize method to lowercase to match the keys in OAS structure
  method = method.toLowerCase();


  // Check if the path exists in the OAS 'paths' object
  if (oas.paths && oas.paths[path] && oas.paths[path][method]) {
    return oas.paths[path][method].description || false;
  }

  // If the path-method combination is not found, return false
  return false || '';
}

function updateOas(md, location, oas, setOas) {
  const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"]

  const { pathname } = location;
  const paths = pathname.split("/")
  paths.shift() //remove blank
  paths.shift() //remove catalog
  paths.shift() //remove host
  let method = null

  if (matchMethod.includes(paths[paths.length - 1])) {
    method = (paths.pop()).replace("__", "").toLowerCase()
  }
  const path = `/${paths.join("/")}`
  if (oas.paths?.[path]?.[method]) {
    // If the path and method exist, update the OAS object

    // You should make a deep copy to avoid mutation issues with nested objects.
    const newOas = JSON.parse(JSON.stringify(oas));

    // Update the description or any other properties you need to.
    newOas.paths[path][method].description = md;

    // Update the state with the new OAS object.
    setOas(newOas);
  } else {
    const newOas = JSON.parse(JSON.stringify(oas));

    // Update the description or any other properties you need to.
    newOas.info.description = md;

    // Update the state with the new OAS object.
    setOas(newOas);
    // Handle the case where the path or method does not exist
  }
}