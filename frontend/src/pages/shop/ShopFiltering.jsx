
import PropTypes from 'prop-types';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
      <h4>Filters</h4>

      <div className="flex flex-col space-y-2">
        <h4 className='font-medium text-lg'>Categories</h4>
        <hr />

        {
          filters.categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                id={category} 
                value={category}
                checked={filtersState.category === category}
                onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
              />
              <span className='ml-1'>{category}</span>
            </label>
          ))
        }
      </div>

      <div className="flex flex-col space-y-2">
        <h4 className='font-medium text-lg'>Colors</h4>
        <hr />

        {
          filters.colors.map((color) => (
            <label key={color} className="flex items-center">
              <input
                type="radio"
                name="color"
                id={color} 
                value={color}
                checked={filtersState.color === color}
                onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
              />
              <span className='ml-1'>{color}</span>
            </label>
          ))
        }
      </div>

      <div className="flex flex-col space-y-2">
        <h4 className='font-medium text-lg'>Price Range</h4>
        <hr />

        {
          filters.priceRanges.map((range) => (
            <label key={range.label} className="flex items-center capitalize cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                id={`priceRange-${range.label}`} 
                value={`${range.min}-${range.max}`}
                checked={filtersState.priceRange === `${range.min}-${range.max}`}
                onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
              />
              <span className='ml-1'>{range.label}</span> 
            </label>
          ))
        }
      </div>

      {/* Clear filters */}
      <button onClick={clearFilters} className="bg-primary py-1 px-4 text-white rounded">Clear All Filters</button>
    </div>
  );
};

ShopFiltering.propTypes = {
  filters: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    priceRanges: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  filtersState: PropTypes.shape({
    category: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
  }).isRequired,
  setFiltersState: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default ShopFiltering;
