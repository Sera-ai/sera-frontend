export const StandardButton = ({ text, enabled = true }) => (
    <div className={`flex rounded-md p-2 cursor-pointer editor-button-${enabled ? "enabled" : "disabled"}`}>
        <span className="text-sm " style={{ color: "#fff" }}>{text}</span>
    </div>
)