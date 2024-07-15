import React, { useState, useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const JsonViewerFull = ({
  oas = "",
  main = false,
  updateField = () => {},
  editable = true,
  height = 270,
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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Editor
        defaultLanguage="json"
        defaultValue={oas}
        options={{
          cursorStyle: "line",
          formatOnPaste: true,
          formatOnType: true,
          fontSize: 14,
          wordWrap: "on",
          readOnly: !editable,
        }}
        onMount={(editor, monaco) => {
          setEditor(editor); // Storing the editor instance
          monaco.editor.defineTheme("custom-dark", {
            base: "vs-dark", // can also be vs-dark, vs-light, hc-black
            inherit: true, // can also be false to completely replace the base
            rules: [], // custom rules
            colors: {
              "editor.background": main ? "#333333" : "#333333", // your desired background color
              // you can add other color overrides here if needed
            },
          });

          // Set the custom theme you have just defined
          monaco.editor.setTheme("custom-dark");
          setTimeout(function () {
            editor.getAction("editor.action.formatDocument").run();
          }, 300);
        }}
      />
    </div>
  );
};

export default JsonViewerFull;
