import React, { useState, useMemo, useEffect } from 'react';
import { TextInput } from '../../../../components/standard/Standard.TextInput';
import { StandardButton } from '../../../../components/standard/Standard.Buttons';

const emutableTerms = [
    "url",
    "variables",
    "description",
    "default",
    "enum"
]

const newVar = {
    "description": "",
    "default": "",
    "enum": [
        "newValue"
    ]
};

const newServer = {
    "url": "",
    "description": "",
    "variables": {
        "newVar": {
            "description": "",
            "default": "",
            "enum": [
                ""
            ]
        }
    }
}


const EditorServer = ({ oas, setOas }) => {

    const fields = {
        "server": []
    }

    const updateServer = (index, updatedServer) => {
        setOas(prevOas => {
            let newServers = [...prevOas.servers];
            newServers[index] = updatedServer;
            return { ...prevOas, servers: newServers };
        });
    };

    const renderFields = () => {
        return oas?.servers?.map((server, index) => (
            <AdditiveContainer
                key={index}
                obj={server}
                updateServer={(updatedServer) => updateServer(index, updatedServer)}
            />
        ));
    };


    const addServer = () => {
        setOas(prevOas => {
            // Create a deep copy of the previous state
            const newOas = JSON.parse(JSON.stringify(prevOas));
            // Update the value
            if (Object.keys(newOas).includes("servers")) {
                newOas.servers.push(newServer)
            } else {
                newOas.servers = [newServer]
            }

            return newOas;
        });
    }

    const getFields = useMemo(() => {
        return renderFields(fields);
    }, [fields, oas, setOas]);

    return (
        <div className='w-full mainDark p-6 pt-8'>
            <div className='flex flex-col pb-20'>
                <div className='flex-grow text-sm space-y-6'>
                    {getFields}
                    <div onClick={() => addServer()} className='whitespace-nowrap flex topLink cursor-pointer'>+ Add new server</div>
                </div>
                <div className='flex space-x-3 w-full mt-6'>
                    <div className='flex-grow'></div>
                    <StandardButton text={'Cancel'} enabled={false} />
                    <StandardButton text={'Next'} enabled={true} />
                </div>
            </div>
        </div>
    );
};

export default EditorServer;


const AdditiveContainer = ({ obj, updateServer }) => {
    const [data, setData] = useState(obj);

    const handleChangeKey = (oldPath, newKey) => {
        const keys = oldPath.split('.');
        const lastKey = keys.pop();
        const lastObj = keys.reduce((obj, key) => obj[key], data);

        if (newKey && newKey !== lastKey && !lastObj[newKey]) {
            lastObj[newKey] = lastObj[lastKey];
            delete lastObj[lastKey];
            setData({ ...data });
            updateServer({ ...data }); // Update parent state

        }
    };

    const handleChangeValue = (path, newValue, removeField = false) => {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const lastObj = keys.reduce((obj, key) => obj[key], data);

        lastObj[lastKey] = newValue;
        
        if(removeField) delete lastObj[lastKey]
        setData({ ...data });
        updateServer({ ...data }); // Update parent state

    };

    const addToArray = (arrayPath) => {
        const keys = arrayPath.split('.');
        const lastKey = keys.pop();
        const lastObj = keys.reduce((obj, key) => obj[key], data);

        if (Array.isArray(lastObj[lastKey])) {
            lastObj[lastKey].push(''); // Add a blank string to the array
            setData({ ...data }); // Update local state
            updateServer({ ...data }); // Update parent state
        }
    };

    const addToVariable = (objectPath) => {
        const keys = objectPath.split('.');
        const lastKey = keys.pop();
        const lastObj = keys.reduce((obj, key) => obj[key], data);

        if (typeof lastObj[lastKey] === 'object' && lastObj[lastKey] !== null && !Array.isArray(lastObj[lastKey])) {
            // Assuming you want to add a unique key for the new object
            let newKey = `test${Object.keys(lastObj[lastKey]).length + 1}`;
            lastObj[lastKey][newKey] = newVar // Add new object

            setData({ ...data }); // Update local state
            updateServer({ ...data }); // Update parent state
        }
    };


    const renderObject = (currentObj, path = '') => {
        return Object.entries(currentObj).map(([key, value], index) => {
            const currentPath = path ? `${path}.${key}` : key;

            if (Array.isArray(value)) {
                return (
                    <div className={`nestedContainer secondaryDark flex w-full p-2 space-y-2`} key={key}>
                        <div className='flex flex-row'>
                            <TextInput
                                key={currentPath}
                                handleChange={(e) => handleChangeKey(currentPath, e.target.value)}
                                value={key.toString()}
                                editable={emutableTerms.includes(key)}
                                long={false}
                            />
                            {key == "enum" && <h1 onClick={() => addToArray(currentPath)} className='whitespace-nowrap flex topLink cursor-pointer'>+ Add enum</h1>}
                        </div>

                        <div className='nestedContainer flex-row w-full p-2 space-y-2'>
                            {value.map((item, idx) => {
                                const itemPath = `${currentPath}.${idx}`;
                                return (
                                    <div className='flex flex-row'>
                                        <TextInput
                                            key={itemPath}
                                            label={key}
                                            handleChange={(e) => handleChangeValue(itemPath, e.target.value)}
                                            value={item.toString()}
                                            long={false}
                                        />
                                        <div onClick={() => handleChangeValue(itemPath, null, true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M2.66675 4.66667H13.3334M6.66675 7.33333V11.3333M9.33341 7.33333V11.3333M3.33341 4.66667L4.00008 12.6667C4.00008 13.0203 4.14056 13.3594 4.39061 13.6095C4.64065 13.8595 4.97979 14 5.33341 14H10.6667C11.0204 14 11.3595 13.8595 11.6096 13.6095C11.8596 13.3594 12.0001 13.0203 12.0001 12.6667L12.6667 4.66667M6.00008 4.66667V2.66667C6.00008 2.48986 6.07032 2.32029 6.19534 2.19526C6.32037 2.07024 6.48994 2 6.66675 2H9.33341C9.51023 2 9.6798 2.07024 9.80482 2.19526C9.92984 2.32029 10.0001 2.48986 10.0001 2.66667V4.66667" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                );
            } else if (typeof value === 'object' && value !== null) {
                return (
                    <div className={`nestedContainer mainDark p-2 space-y-2`} key={key}>
                        <div className='flex flex-row'>
                            <TextInput
                                key={currentPath}
                                handleChange={(e) => handleChangeKey(currentPath, e.target.value)}
                                value={key.toString()}
                                label={path.split(".")[path.split(".").length - 1] + " name"}
                                editable={emutableTerms.includes(key)}
                                long={false}
                            />
                            {key == "variables" && <h1 onClick={() => addToVariable(currentPath)} className='whitespace-nowrap flex items-end bottomLink cursor-pointer'>+ Add New Variable</h1>}

                        </div>
                        {renderObject(value, currentPath)}
                    </div>
                );
            } else {
                // Render non-editable text for other keys
                return (
                    <div className={`nestedContainer secondaryDark flex w-full p-2 space-y-2`} key={key}>
                        <TextInput
                            key={currentPath}
                            handleChange={(e) => handleChangeKey(currentPath, e.target.value)}
                            value={key.toString()}
                            editable={emutableTerms.includes(key)}
                            long={false}
                        />
                        <div className='flex flex-row'>
                            <TextInput
                                key={currentPath}
                                label={path.split(".")[path.split(".").length - 1] + " " + key}
                                handleChange={(e) => handleChangeValue(currentPath, e.target.value)}
                                value={value.toString()}
                                long={false}
                            />
                            <div onClick={() => handleChangeValue(currentPath, null, true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2.66675 4.66667H13.3334M6.66675 7.33333V11.3333M9.33341 7.33333V11.3333M3.33341 4.66667L4.00008 12.6667C4.00008 13.0203 4.14056 13.3594 4.39061 13.6095C4.64065 13.8595 4.97979 14 5.33341 14H10.6667C11.0204 14 11.3595 13.8595 11.6096 13.6095C11.8596 13.3594 12.0001 13.0203 12.0001 12.6667L12.6667 4.66667M6.00008 4.66667V2.66667C6.00008 2.48986 6.07032 2.32029 6.19534 2.19526C6.32037 2.07024 6.48994 2 6.66675 2H9.33341C9.51023 2 9.6798 2.07024 9.80482 2.19526C9.92984 2.32029 10.0001 2.48986 10.0001 2.66667V4.66667" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                );

            }
        });
    };

    return <div className='nestedContainer secondaryDark p-2 space-y-2'>{renderObject(data)}</div>;
};

