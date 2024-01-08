import React, { useState, useCallback } from 'react';

const FileDrop = ({ onFileSelect }) => {
    const [dragActive, setDragActive] = useState(false);

    // handle drag events
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    // triggers when file is dropped
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }, [onFileSelect]);

    // triggers when file is selected with click
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            className={`drop-container${dragActive ? ' active' : ''} flex flex-col border-dashed border-2 rounded-md p-4 mx-4 items-center justify-center min-h-[200px] cursor-pointer`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            {dragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="130" viewBox="0 0 196 246" fill="none">
                    <path d="M117.429 0.5C123.18 0.501405 128.749 2.52657 133.157 6.22075L134.75 7.6785L188.821 61.75C192.889 65.8173 195.395 71.1859 195.902 76.9155L196 79.0715V221C196.002 227.181 193.668 233.134 189.465 237.667C185.262 242.199 179.501 244.975 173.337 245.439L171.5 245.5H24.5C18.3189 245.502 12.3656 243.168 7.83329 238.965C3.30102 234.762 0.524832 229.001 0.0612526 222.838L1.22828e-06 221V25C-0.00195485 18.8189 2.33248 12.8656 6.53534 8.33329C10.7382 3.80102 16.4988 1.02483 22.6625 0.561251L24.5 0.5H117.429ZM98 25H24.5V221H171.5V98.5H116.375C111.502 98.5 106.828 96.5641 103.382 93.1181C99.9359 89.6721 98 84.9984 98 80.125V25ZM98 116.875C101.249 116.875 104.365 118.166 106.662 120.463C108.959 122.76 110.25 125.876 110.25 129.125V147.5H128.625C131.874 147.5 134.99 148.791 137.287 151.088C139.584 153.385 140.875 156.501 140.875 159.75C140.875 162.999 139.584 166.115 137.287 168.412C134.99 170.709 131.874 172 128.625 172H110.25V190.375C110.25 193.624 108.959 196.74 106.662 199.037C104.365 201.334 101.249 202.625 98 202.625C94.7511 202.625 91.6353 201.334 89.3379 199.037C87.0406 196.74 85.75 193.624 85.75 190.375V172H67.375C64.1261 172 61.0103 170.709 58.7129 168.412C56.4156 166.115 55.125 162.999 55.125 159.75C55.125 156.501 56.4156 153.385 58.7129 151.088C61.0103 148.791 64.1261 147.5 67.375 147.5H85.75V129.125C85.75 125.876 87.0406 122.76 89.3379 120.463C91.6353 118.166 94.7511 116.875 98 116.875ZM122.5 30.0715V74H166.429L122.5 30.0715Z" fill="white" />
                </svg>
            )}
            <input
                type="file"
                id="fileInput"
                accept=".json,.yaml,.yml"
                hidden
                onChange={handleChange}
            />
            <label htmlFor="fileInput">Drag and Drop file here or <span className={"underline cursor-pointer"}>Choose file</span></label>
        </div>
    );
};

const EditorUpload = ({ setOas, dummyOas }) => {
    const [file, setFile] = useState(null);

    const handleFileSelect = useCallback((file) => {
        const fileType = file.type;
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                let parsedData;
                if (fileType === "application/json") {
                    parsedData = JSON.parse(e.target.result);
                } else if (fileType === "" && file.name.endsWith('.yaml')) { // MIME type for YAML not universally supported
                    parsedData = YAML.parse(e.target.result);
                } else {
                    throw new Error("File type not supported");
                }
                setFile(file)
                setOas(parsedData);
            } catch (error) {
                console.error("Error parsing file:", error);
            }
        };

        if (fileType === "application/json" || (fileType === "" && (file.name.endsWith('.yaml') || file.name.endsWith('.yml')))) {
            reader.readAsText(file);
        } else {
            console.error("Unsupported file type");
        }
    }, []);

    const reset = () => {
        setOas({})
        setFile(null)
    }

    return (
        <div className='w-full h-full mainDark pt-4'>
            {file ? (<div className='flex text-sm p-8 m-4 rounded-md' style={{ backgroundColor: "#ffffff10" }}>
                <div className='flex flex-col flex-grow'>
                    <span>File uploaded:</span>
                    <p>{file.name}</p>
                </div>
                <div className='flex pt-1 cursor-pointer' onClick={() => reset()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" fill="none">
                        <g clip-path="url(#clip0_1412_1815)">
                            <path d="M2.34392 13.6562C1.57984 12.9182 0.970378 12.0354 0.551106 11.0594C0.131834 10.0834 -0.0888561 9.03361 -0.0980866 7.97137C-0.107317 6.90914 0.0950964 5.8557 0.497344 4.87253C0.899591 3.88936 1.49362 2.99614 2.24476 2.245C2.9959 1.49386 3.88911 0.899835 4.87228 0.497588C5.85546 0.0953406 6.90889 -0.107073 7.97113 -0.0978425C9.03336 -0.0886119 10.0831 0.132078 11.0592 0.55135C12.0352 0.970622 12.9179 1.58008 13.6559 2.34416C15.1132 3.85298 15.9195 5.8738 15.9013 7.97137C15.8831 10.0689 15.0417 12.0754 13.5585 13.5587C12.0752 15.042 10.0687 15.8833 7.97113 15.9016C5.87355 15.9198 3.85273 15.1134 2.34392 13.6562ZM3.47192 12.5282C4.67282 13.7291 6.30159 14.4037 7.99992 14.4037C9.69825 14.4037 11.327 13.7291 12.5279 12.5282C13.7288 11.3273 14.4035 9.69849 14.4035 8.00016C14.4035 6.30183 13.7288 4.67306 12.5279 3.47216C11.327 2.27126 9.69825 1.5966 7.99992 1.5966C6.30159 1.5966 4.67282 2.27126 3.47192 3.47216C2.27102 4.67306 1.59636 6.30183 1.59636 8.00016C1.59636 9.69849 2.27102 11.3273 3.47192 12.5282ZM11.3919 5.73616L9.12792 8.00016L11.3919 10.2642L10.2639 11.3922L7.99992 9.12816L5.73592 11.3922L4.60792 10.2642L6.87192 8.00016L4.60792 5.73616L5.73592 4.60816L7.99992 6.87216L10.2639 4.60816L11.3919 5.73616Z" fill="#f43f5e" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1412_1815">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>) : <FileDrop onFileSelect={handleFileSelect} />}
            <div className='flex px-4 my-4'><span className='text-sm'>Supported Formats: JSON, YAML, YML</span></div>
            <div className='flex p-4 m-4 rounded-md secondaryDark justify-between items-center'>
                <div>
                    <span className='font-bold text-sm'>Petstore OAS Example</span>
                    <p className='text-sm'>View the petstore OAS 3.0.1 sample to view the unique fields OAS 3.0 adds</p>
                </div>
                <div className='h-full'>
                    <div onClick={() => setOas(dummyOas)} className='rounded-md p-2 cursor-pointer' style={{ backgroundColor: "#fff" }}>
                        <span className="text-sm" style={{ color: "#333" }}>Apply</span>
                    </div>
                </div>
            </div>
            <div className='flex p-4 mt-8'>
                <div className='flex-grow'>

                </div>
                <div className='flex space-x-3'>
                    <div className='rounded-md p-2 cursor-pointer' style={{ backgroundColor: "#f36a6a", minWidth: 80, textAlign: "center" }}>
                        <span className="text-sm" style={{ color: "#fff" }}>Cancel</span>
                    </div>
                    <div className={`rounded-md p-2 cursor-pointer editor-button-${file ? "enabled" : "disabled"}`}>
                        <span className="text-sm " style={{ color: "#fff" }}>Next</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorUpload;
