import React from 'react'

export default function ToggleButton({ onLabel, offLabel, isRenewable, setIsRenewable }) {
    console.log(isRenewable);
    return (
        <>
            <label for="toggle" className="toggle-label mr-3">
                { offLabel }
            </label>
            <label className="switch mx-1">
                <input
                type="checkbox"
                defaultChecked={isRenewable ? true : false}
                onChange={(e) => {
                    setIsRenewable(e.target.checked);
                }}
                />
                <span className="slider round"></span>
            </label>
            <label for="toggle" className="toggle-label ml-3">
                { onLabel }
            </label>
        </>
    )
}
