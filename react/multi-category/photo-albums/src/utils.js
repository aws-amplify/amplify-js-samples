/** Objects sort functions by using specific key field.
 *  @param key: the key to sort
 *  @param order: Sort order can be either 'asc' and 'desc'. The default value is 'asc', which sort objects in ascending order. Value 'desc' will sort in desending order.
 */ 
export default function makeComparator(key, order = 'asc') {
    return (a, b) => {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0; 
  
      const aVal = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const bVal = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (aVal > bVal) comparison = 1;
      if (aVal < bVal) comparison = -1;
  
      return order === 'desc' ? (comparison * -1) : comparison
    };
  }