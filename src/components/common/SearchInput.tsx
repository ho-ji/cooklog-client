'use client'

import useInput from '@/hooks/useInput'
import Image from 'next/image'

const SearchInput = () => {
  const searchInput = useInput()

  return (
    <div className="input overflow-hidden flex-1 max-w-80 flex-center">
      <Image
        src="/images/search.svg"
        alt="검색"
        width={20}
        height={20}
      />
      <label
        htmlFor="recipe-search"
        className="sr-only">
        레시피 검색
      </label>
      <input
        type="text"
        id="recipe-search"
        className="px-1 size-full focus:outline-none"
        placeholder="레시피 검색"
        maxLength={20}
        onChange={searchInput.handleChange}
      />
      {searchInput.value && (
        <button onClick={searchInput.reset}>
          <Image
            src="/images/delete.svg"
            alt="x"
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  )
}

export default SearchInput
