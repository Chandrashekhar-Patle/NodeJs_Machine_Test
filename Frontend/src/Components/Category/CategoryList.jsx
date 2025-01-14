import React, { useState, useEffect } from 'react';
import { getCategories, deleteCategory } from '../../Services/CategoryServices';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className='absolute top-24 left-60 w-9/12'>
      <h2 className='text-4xl font-bold my-4'>Category List</h2>
      <table className='border-2 border-black w-6/12 px-4 py-2'>
        <thead>
          <tr className='flex justify-around align-center relative'>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryId}>
              <td>{category.categoryId}</td>
              <td>{category.categoryName}</td>
              <td>
                <button
                  color="secondary"
                  onClick={() => handleDelete(category.categoryId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
