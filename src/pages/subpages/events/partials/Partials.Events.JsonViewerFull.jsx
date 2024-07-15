import React, { useState, useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const JsonViewerFull = ({
  oas = "",
  main = false,
  updateField = () => {},
  editable = true,
  height = 270,
  type= "javascript"
}) => {
  const monaco = useMonaco();
  const [editor, setEditor] = useState(null);

  const isProgrammaticChangeRef = useRef(false);

  useEffect(() => {
    isProgrammaticChangeRef.current = true; // Mark the upcoming change as programmatic
    if (editor) {
      const currentContent = editor.getValue();
      if (currentContent !== oas) {
        const position = editor.getPosition();
        editor.setValue(oas);
        editor.setPosition(position);
      }
    }
    isProgrammaticChangeRef.current = false; // Reset after the change is done
  }, [oas, editor]);

  useEffect(() => {
    if (monaco && editor) {
      const handleModelContentChange = (event) => {
        if (isProgrammaticChangeRef.current) {
          // Ignore programmatic changes
          return;
        }
        const newValue = editor.getValue();
        updateField(newValue); // This is called only for user-initiated changes
      };

      // Add the event listener and receive the disposable object
      const disposable = editor.onDidChangeModelContent(handleModelContentChange);

      // Return a cleanup function that disposes of the event listener
      return () => disposable.dispose();
    }
  }, [monaco, editor, updateField]);

  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "lua" });

      monaco.languages.setMonarchTokensProvider("lua", {
        tokenizer: {
          root: [
            [/\b(?:local|function|end|if|then|else|elseif|for|while|do|return|break|in|repeat|until|not|and|or)\b/, "keyword"],
            [/\b\d+\.?\d*\b/, "number"],
            [/"([^"\\]|\\.)*$/, "string.invalid"],  // non-terminated string
            [/"([^"\\]|\\.)*"/, "string"],
            [/'([^'\\]|\\.)*$/, "string.invalid"],  // non-terminated string
            [/'([^'\\]|\\.)*'/, "string"],
            [/[a-zA-Z_]\w*/, "identifier"],
            [/[{}()\[\]]/, "@brackets"],
            [/[@:]/, "delimiter"],
            [/\./, "delimiter"],
            [/--\[([=]*)\[/, "comment", "@comment.$1"],
            [/--.*$/, "comment"],
            [/\/\*/, "comment", "@comment"],
          ],
          comment: [
            [/[^\/*]+/, "comment"],
            [/\/\*/, "comment", "@push"],    // nested comment
            ["\\*/", "comment", "@pop"],
            [/[\/*]/, "comment"]
          ],
        }
      });

      monaco.languages.setLanguageConfiguration("lua", {
        comments: {
          lineComment: "--",
          blockComment: ["--[[", "]]"]
        },
        brackets: [
          ["{", "}"],
          ["[", "]"],
          ["(", ")"]
        ],
        autoClosingPairs: [
          { open: "{", close: "}" },
          { open: "[", close: "]" },
          { open: "(", close: ")" },
          { open: "\"", close: "\"" },
          { open: "'", close: "'" }
        ]
      });

      monaco.languages.registerCompletionItemProvider("lua", {
        provideCompletionItems: () => {
          const suggestions = [
            {
              label: "print",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "print()",
              documentation: "Prints a message to the console."
            },
            {
              label: "function",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "function ${1:name}(${2:params})\n\t$0\nend",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Defines a function."
            },
            {
              label: "local function",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "local function ${1:name}(${2:params})\n\t$0\nend",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Defines a local function."
            }
          ];
          return { suggestions };
        }
      });

      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark", // can also be vs-dark, vs-light, hc-black
        inherit: true, // can also be false to completely replace the base
        rules: [], // custom rules
        colors: {
          "editor.background": main ? "#17181d" : "#17181d", // your desired background color
          // you can add other color overrides here if needed
        },
      });

      monaco.editor.setTheme("custom-dark");
    }
  }, [monaco]);

  return (
    <div style={{ height, maxHeight: 500 }}>
      <Editor
        defaultLanguage={type}
        defaultValue={oas}
        options={{
          cursorStyle: "line",
          formatOnPaste: false,
          formatOnType: false,
          fontSize: 10,
          wordWrap: "on", // Ensure this is set to "on" instead of true
        }}
        onMount={(editor, monaco) => {
          setEditor(editor); // Storing the editor instance
          setTimeout(function () {
            editor.getAction("editor.action.formatDocument").run();
            if (!editable) {
              setTimeout(function () {
                editor.updateOptions({ readOnly: true });
              }, 300);
            }
          }, 300);
        }}
      />
    </div>
  );
};

export default JsonViewerFull;
