'use client';


export function Cell({colIndex, rowIndex, value, handleInput, highLight}: {
    colIndex: number,
    rowIndex: number,
    value: number | null,
    handleInput: Function,
    highLight?: boolean | null
}) {

    return (
        <input
            className={`flex-1 rounded-lg ${value !== null ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-blue-200 active:bg-blue-300"} 
            border  ${highLight ? "border-yellow-300 " : "border-gray-300"} shadow-sm text-center text-lg font-bold text-gray-700 focus:outline-none 
            focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none`}
            style={{WebkitAppearance: 'none', margin: 0}}
            key={colIndex}
            type="number"
            disabled={value !== null}
            min={1}
            max={9}
            value={value || ''}
            onChange={(event) => handleInput(event, rowIndex, colIndex)}
        />
    )
}

