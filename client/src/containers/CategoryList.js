import React, { PropTypes } from 'react'

const CategoryList = ({ category }) => <h1>{category}</h1>

CategoryList.propTypes = {
  category: PropTypes.string.isRequired
}

export default CategoryList
