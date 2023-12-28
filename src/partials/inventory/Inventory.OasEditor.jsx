import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import Editor, { useMonaco, loader } from "@monaco-editor/react";

const OasEditor = forwardRef(({ oas, setOas, setIsError, darker = false }, ref) => {
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
                const hasErrors = markers.some(marker => marker.severity === monaco.MarkerSeverity.Error);
                setIsError(hasErrors);
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

    useImperativeHandle(ref, () => ({
        settingState,
    }));


    const settingState = () => {
        try {
            setOas(JSON.parse(state))
        } catch (e) {
            console.error(e)
        }
    };
    const handleEditorChange = (value, event) => {
        // settingState("codeText", value);
        // value = value.replace(/\n/g, '')
        setState(value);

    };


    return (
        <div style={{ width: "100%" }}>
            {/* {state} */}
            <Editor
                height="70vh"
                defaultLanguage="json"
                defaultValue={state}
                onChange={handleEditorChange}
                options={{
                    cursorStyle: "line",
                    formatOnPaste: true,
                    formatOnType: true,
                    wordWrap: true
                    // autoIndent: "full"
                }}
                onMount={(editor, monaco) => {
                    setEditor(editor); // Storing the editor instance
                    monaco.editor.defineTheme('custom-dark', {
                        base: 'vs-dark', // can also be vs-dark, vs-light, hc-black
                        inherit: true,   // can also be false to completely replace the base
                        rules: [],       // custom rules
                        colors: {
                            'editor.background': darker ? "#191A21" : '#23232E', // your desired background color
                            // you can add other color overrides here if needed
                        },
                    });

                    // Set the custom theme you have just defined
                    monaco.editor.setTheme('custom-dark');
                    setTimeout(function () {
                        editor.getAction("editor.action.formatDocument").run();
                    }, 300);
                }}
            />
        </div>
    );
})

export default OasEditor;
