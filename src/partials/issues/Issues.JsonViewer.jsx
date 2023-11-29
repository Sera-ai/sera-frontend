import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import Editor, { useMonaco, loader } from "@monaco-editor/react";

const JsonViewer = ({ oas }) => {
    const monaco = useMonaco();

    const [state, setState] = React.useState(JSON.stringify(oas));
    const [editor, setEditor] = useState(null);



    useEffect(() => {
        if (monaco && editor) {
            const model = editor.getModel();
            const checkErrors = () => {
                // Get all the markers (errors, warnings, etc.) for the current model
                const markers = monaco.editor.getModelMarkers({ resource: model.uri });
                // Check if there's any marker with severity of Error
            };

            // Check for errors initially
            checkErrors();

            // Listen for marker changes
            monaco.editor.onDidChangeMarkers(uris => {
                if (uris.some(uri => uri.toString() === model.uri.toString())) {
                    checkErrors();
                }
            });

            return () => {
                // Dispose listener when the component unmounts or when the editor/model changes
                monaco.editor.onDidChangeMarkers(() => { });
            };
        }
    }, [monaco, editor]);




    return (
        <div className={"w-full max-w-full overflow-hidden"}>
            {/* {state} */}
            <Editor
                height="15vh"
                width="100%"
                defaultLanguage="json"
                defaultValue={state}
                options={{
                    cursorStyle: "line",
                    formatOnPaste: false,
                    formatOnType: false,
                    wordWrap: "on" // Ensure this is set to "on" instead of true
                }}
                onMount={(editor, monaco) => {
                    setEditor(editor); // Storing the editor instance
                    monaco.editor.defineTheme('custom-dark', {
                        base: 'vs-dark', // can also be vs-dark, vs-light, hc-black
                        inherit: true,   // can also be false to completely replace the base
                        rules: [],       // custom rules
                        colors: {
                            'editor.background': '#1e222b', // your desired background color
                            // you can add other color overrides here if needed
                        },
                    });

                    // Set the custom theme you have just defined
                    monaco.editor.setTheme('custom-dark');
                    setTimeout(function () {
                        editor.getAction("editor.action.formatDocument").run();
                        setTimeout(function () {
                            editor.updateOptions({ readOnly: true });
                        }, 300);
                    }, 300);
                }}
            />
        </div>
    );
}

export default JsonViewer;
