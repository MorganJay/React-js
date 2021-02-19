import React from 'react';

const FilterList = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          type="button"
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem
              ? 'list-group-item list-group-item-action active font-weight-bold'
              : 'list-group-item list-group-item-action font-weight-bold'
          }
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
  valueProperty: '_id',
};

export default FilterList;
