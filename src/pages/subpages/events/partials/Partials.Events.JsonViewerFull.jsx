import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const JsonViewerFull = ({
  oas,
  lines = [1],
  main = false,
  updateField = () => {},
}) => {
  const monaco = useMonaco();
  const [editor, setEditor] = useState(null);
  const [readOnlyLines, setReadOnlyLines] = useState(lines);
  const externalDataRef = React.useRef(oas);

  useEffect(() => {
    externalDataRef.current = oas; // Update the ref to the new external data
    if (editor) {
      // Check if the current editor content is different from the new external data to avoid unnecessary updates
      const currentContent = editor.getValue();
      if (currentContent !== oas) {
        const position = editor.getPosition(); // Save the current cursor position
        editor.setValue(oas); // Update the editor's content
        editor.setPosition(position); // Restore the cursor position
      }
    }
  }, [oas, editor]);

  useEffect(() => {
    if (monaco && editor) {
      const handleModelContentChange = (event) => {
        // Since we're directly manipulating the editor instance, we rely on its internal state and events
        const newValue = editor.getValue();
        if (newValue !== externalDataRef.current) {
          updateField(newValue); // Call updateField only if the change is user-initiated
        }
      };

      editor.onDidChangeModelContent(handleModelContentChange);

      return () => {
        editor.onDidChangeModelContent(() => {});
      };
    }
  }, [monaco, editor, updateField]);


  return (
    <div className={"w-full max-w-full overflow-hidden"} >
      <Editor
        defaultLanguage="javascript"
        defaultValue={oas}
        options={{
          cursorStyle: "line",
          formatOnPaste: false,
          formatOnType: false,
          fontSize: 10,
          wordWrap: "on", // Ensure this is set to "on" instead of true,
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
