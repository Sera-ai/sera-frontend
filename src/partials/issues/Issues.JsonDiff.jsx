import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import Editor, { useMonaco, loader, DiffEditor } from "@monaco-editor/react";

const JsonViewerFull = ({ originalJson, modifiedJson }) => {
    const monaco = useMonaco();
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        if (monaco) {
            // Define custom theme
            monaco.editor.defineTheme('custom-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#23232E',
                },
            });

            // Apply the custom theme
            monaco.editor.setTheme('custom-dark');
        }
    }, [monaco]);

    useEffect(() => {
        if (editor && monaco) {
            // Create models for original and modified JSON
            const originalModel = monaco.editor.createModel(JSON.stringify(originalJson, null, 2), 'json');
            const modifiedModel = monaco.editor.createModel(JSON.stringify(modifiedJson, null, 2), 'json');

            // Set models to the diff editor
            editor.setModel({
                original: originalModel,
                modified: modifiedModel,
            });

            // Set the editor to read-only after a short delay
            setTimeout(() => {
                editor.updateOptions({ readOnly: true });
            }, 300);
        }
    }, [editor, monaco, originalJson, modifiedJson]);



    return (
        <div className={"w-full max-w-full overflow-hidden"}>
            {/* {state} */}
            <DiffEditor
                height="200px"
                width="100%"
                defaultLanguage="json"
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
                            'editor.background': '#23232E', // your desired background color
                            // you can add other color overrides here if needed
                        },
                    });

                    // Set the custom theme you have just defined
                    monaco.editor.setTheme('custom-dark');
                    setTimeout(function () {
                        setTimeout(function () {
                            editor.updateOptions({ readOnly: true });
                        }, 300);
                    }, 300);
                }}
            />
        </div>
    );
}

export default JsonViewerFull;
