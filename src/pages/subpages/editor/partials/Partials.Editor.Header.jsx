import React, { useState, useMemo, useCallback } from 'react';
import { TextInput } from '../../../../components/standard/Standard.TextInput';
import { StandardButton } from '../../../../components/standard/Standard.Buttons';

const EditorHeader = ({ oas, setOas }) => {

    const fields = {
        "info": {
            "description": "longString",
            "version": "shortString",
            "title": "shortString",
            "termsOfService": "shortString",
            "contact": {
                "email": "shortString"
            },
            "license": {
                "name": "shortString",
                "url": "shortString"
            }
        },
        "externalDocs": {
            "description": "longString",
            "url": "shortString"
        }
    }

    const renderFields = (currentFields, currentPath = []) => {
        return Object.keys(currentFields).map(field => {
            const newPath = [...currentPath, field];

            if (typeof currentFields[field] === 'object' && !Array.isArray(currentFields[field])) {
                // Recursively render nested fields
                return renderFields(currentFields[field], newPath);
            } else {
                // Render TextInput for a non-object field
                const [value, setValue] = useState(newPath.reduce((acc, cur) => acc?.[cur], oas) ?? "");
                const handleChange = (e) => {
                    const updatedValue = e.target.value;
                    setValue(updatedValue);

                    setOas(prevOas => {
                        // Create a deep copy of the previous state
                        const newOas = JSON.parse(JSON.stringify(prevOas));

                        // Check if the first key exists, if not create an empty object
                        if (!newOas[newPath[0]]) {
                            newOas[newPath[0]] = {};
                        }

                        // Update the value
                        newOas[newPath[0]][newPath[1]] = updatedValue;

                        return newOas;
                    });
                };
                return (
                    <TextInput
                        label={field}
                        handleChange={handleChange}
                        value={value}
                        long={currentFields[field] == "longString"}
                    />
                );
            }
        });
    };

    const getFields = useMemo(() => {
        return renderFields(fields);
    }, [fields, oas, setOas]);

    return (
        <div className='w-full mainDark p-6 pt-8'>
            <div className='flex flex-col pb-20'>
                <div className='flex-grow text-sm space-y-6'>
                    {getFields}
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

export default EditorHeader;


