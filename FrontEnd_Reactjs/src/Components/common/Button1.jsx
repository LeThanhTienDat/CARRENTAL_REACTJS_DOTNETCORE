import React, { Children } from 'react'

export default function Button1({children}) {
  return (
    <>
        <button className='bg-blue-400 text-[21px] px-3 py-1 rounded-md'>{children}</button>
    </>
  )
}
