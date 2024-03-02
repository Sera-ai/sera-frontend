import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Editor, { useMonaco, loader } from "@monaco-editor/react";

const JsonViewerFull = ({
  oas,
  lines = [1],
  main = false,
  updateField = () => {},
}) => {
  const monaco = useMonaco();

  const [state, setState] = React.useState(oas);
  const [editor, setEditor] = useState(null);
  const [readOnlyLines, setReadOnlyLines] = useState(lines); // Example: Make line 1 read-only. Adjust this as needed.

  useEffect(() => {
    if (monaco && editor) {
      const model = editor.getModel();
      const checkErrors = () => {
        // Get all the markers (errors, warnings, etc.) for the current model
        const markers = monaco.editor.getModelMarkers({ resource: model.uri });
        // Check if there's any marker with severity of Error
      };

      const js = oas; // Format the JSON string with indentation
      editor.setValue(js);

      // Check for errors initially
      checkErrors();

      // Listen for marker changes
      monaco.editor.onDidChangeMarkers((uris) => {
        if (uris.some((uri) => uri.toString() === model.uri.toString())) {
          checkErrors();
        }
      });


      const handleModelContentChange = (event) => {
        let shouldUpdateField = true;
        event.changes.forEach((change) => {
          const { range } = change;
          readOnlyLines.forEach((line) => {
            if (range.startLineNumber <= line && range.endLineNumber >= line) {
              editor.getModel().undo();
              shouldUpdateField = false; // Do not update field if change is reverted
            }
          });
        });

        // Call updateField with the new value if changes are not reverted
        if (shouldUpdateField) {
          const newValue = editor.getValue();
          updateField(newValue);
        }
      };

      editor.onDidChangeModelContent(handleModelContentChange);


      return () => {
        // Dispose listener when the component unmounts or when the editor/model changes
        monaco.editor.onDidChangeMarkers(() => {});

      };
    }
  }, [monaco, editor, oas]);

  return (
    <div className={"w-full max-w-full overflow-hidden"}>
      {/* {state} */}
      <Editor
        defaultLanguage="javascript"
        defaultValue={state}
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
