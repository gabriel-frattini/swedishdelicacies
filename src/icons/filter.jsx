import * as React from "react"

function FilterIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.596 12.116l1-.046-.016-.336-.216-.259-.768.64zM4.392 5.87l-.768.64.768-.64zm15.216 0l.768.64-.768-.64zm-5.204 6.245l-.768-.64-.216.259-.015.336.999.045zm-.36 7.93l.998.046-.999-.046zm-4.087 0l-1 .046 1-.046zm.407-8.57L5.16 5.23 3.624 6.51l5.204 6.246 1.536-1.28zM5.16 5.23A.75.75 0 015.736 4V2C3.405 2 2.131 4.72 3.624 6.51L5.16 5.23zM5.736 4h12.528V2H5.736v2zm12.528 0a.75.75 0 01.576 1.23l1.536 1.28C21.87 4.72 20.596 2 18.264 2v2zm.576 1.23l-5.204 6.245 1.536 1.28 5.204-6.244-1.536-1.28zm-5.435 6.84l-.36 7.93 1.997.09.36-7.93-1.997-.09zm-.36 7.93v2a2 2 0 001.997-1.91L13.044 20zm0 0h-2.09v2h2.09v-2zm-2.09 0l-1.997.09A2 2 0 0010.956 22v-2zm0 0l-.36-7.93-1.998.09.36 7.93 1.998-.09z"
        fill="currentColor"
      />
    </svg>
  )
}

export default FilterIcon
