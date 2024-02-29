import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { Link, useLocation } from "react-router-dom";

import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import {
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  tablePlugin,
  linkDialogPlugin,
  linkPlugin,
  imagePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  directivesPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  AdmonitionDirectiveDescriptor,
  listsPlugin,
  quotePlugin,
  headingsSystem,
  headingsPlugin,
  toolbarPlugin,
  KitchenSinkToolbar,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live",
      sandpackTemplate: "react",
      sandpackTheme: "dark",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

const Editor = forwardRef(
  (
    { edit = true, initialMarkdown = "", saveMarkdown = null, mini = false },
    ref
  ) => {
    const mdxEditorRef = useRef(); // Create a ref object

    const [markdown, setMarkdown] = useState(initialMarkdown);

    // Use useEffect to update markdown whenever oas changes
    useEffect(() => {
      // If MDXEditor provides an imperative method for setting markdown, use it
      if (mdxEditorRef.current && mdxEditorRef.current.setMarkdown) {
        mdxEditorRef.current.setMarkdown(initialMarkdown);
      } else {
        // If not, we fall back to the standard way of setting markdown
        setMarkdown(initialMarkdown);
      }
    }, [initialMarkdown]); // Only re-run the effect if oas changes

    return (
      <div
        className="mdxeditor"
        style={{
          minHeight: mini ? undefined : "50vh",
          minWidth: "100%",
          maxHeight: mini ? undefined : "70vh",
        }}
      >
        <MDXEditor
          markdown={markdown}
          className="dark-theme dark-editor w-full h-full"
          readOnly={!edit}
          isToolsShown={false}
          onChange={(md) => {
            saveMarkdown(md);
          }}
          ref={mdxEditorRef}
          plugins={[
            headingsPlugin(),
            toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
            tablePlugin(),
            listsPlugin(),
            linkPlugin(),
            quotePlugin(),
            linkDialogPlugin(),
            imagePlugin({
              imageUploadHandler: async () => "/sample-image.png",
            }),
            thematicBreakPlugin(),
            frontmatterPlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
            sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                css: "CSS",
                txt: "text",
                tsx: "TypeScript",
              },
            }),
            directivesPlugin({
              directiveDescriptors: [AdmonitionDirectiveDescriptor],
            }),
            diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: `` }),
          ]}
        />
      </div>
    );
  }
);

export default Editor;
