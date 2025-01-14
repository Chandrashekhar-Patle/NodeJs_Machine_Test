import React, { useState, useEffect } from 'react';
import { getPaginatedProducts, deleteProduct } from '../../Services/ProductServices';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProducts(page + 1, pageSize);
  }, [page, pageSize]);

  const fetchProducts = async (page, pageSize) => {
    const data = await getPaginatedProducts(page, pageSize);
    setProducts(data.products);
    setTotalCount(data.totalCount);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts(page + 1, pageSize);
  };

  
  return (
    <div className='absolute top-24 left-60 w-9/12'>
    <h2 className='text-4xl font-bold'>Product List</h2>
    <table className='border-collapse border-2 border-black w-full px-4 py-2'>
      <thead>
        <tr className='bg-gray-200'>
          <th className='border border-black px-2 py-1'>Category ID</th>
          <th className='border border-black px-2 py-1'>Category Name</th>
          <th className='border border-black px-2 py-1'>Product ID</th>
          <th className='border border-black px-2 py-1'>Product Name</th>
          <th className='border border-black px-2 py-1'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {console.log("prodct list ", products)}
        {products.map((product) => (
          <tr key={product.productId} className='hover:bg-gray-100'>
            <td className='border border-black px-2 py-1'>{product.categoryId}</td>
            <td className='border border-black px-2 py-1'>{product.categoryName}</td>
            <td className='border border-black px-2 py-1'>{product.productId}</td>
            <td className='border border-black px-2 py-1'>{product.productName}</td>
            <td className='border border-black px-2 py-1'>
              <button
                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700'
                onClick={() => handleDelete(product.productId)}
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

export default ProductList;
