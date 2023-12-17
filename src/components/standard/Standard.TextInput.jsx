export function TextInput({ type = 'text', label, value, long = false, handleChange, editable = false }) {
    return (
        <div className="input-container w-full">
            {!long
                ? <input className={`inputBox ${!editable ? "inputEnabled" : "inputDisabled"}`} id={label + "id"} type={type} value={value} onChange={handleChange} readOnly={editable} />
                : <textarea className={`inputBox ${!editable ? "inputEnabled" : "inputDisabled"}`} id={label + "id"} value={value} onChange={handleChange} cols="40" rows="10" readOnly={editable}></textarea>}
            {!editable && (<label className={value && 'filled'} htmlFor={label + "id"}>
                {label}
            </label>)}
        </div>
    );
}