import React from 'react';

const FilterList = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          type="button"
          onClick={() => onItemSelect(item)}
          className={`list-group-item list-group-item-action font-weight-bold ${
            item === selectedItem && 'active'
          }`}
          key={item[valueProperty]}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

FilterList.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default FilterList;
