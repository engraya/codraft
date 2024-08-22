import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className="loader">
      <Image 
        src="https://www.svgrepo.com/show/70469/loading.svg"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      Loading...
    </div>
  )
}

export default Loader