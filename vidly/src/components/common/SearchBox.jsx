import React from 'react'

const SearchBox = ({ value, onChange }) => {
    return (
      <Input
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
}

export default SearchBox
