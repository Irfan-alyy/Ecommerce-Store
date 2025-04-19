import { useState, useEffect } from "react";
import Product from "../../components/category/Products";
import { TfiLayoutGrid3Alt, TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaList } from "react-icons/fa";

const Category = () => {
  const [products, setProducts] = useState([]);
  
  const pageSize = 12; // products per page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = Array.from({ length: 30 }, (_, i) => ({ id: i + 1 }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / pageSize);
  const currentProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const startProductNumber = products.length > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endProductNumber = Math.min(currentPage * pageSize, products.length);
  const smoothScrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      smoothScrollToTop();
    }
  };
  const [gridView, setGridView] = useState(3); 
  const [listView, setListView] = useState(false); // Not used

  return (
    <>
      <div className="w-full px-5 sm:px-15 md:px-30 lg:px-40  grid gap-5 py-10 md:py-20 grid-cols-1 lg:grid-cols-12">
        <aside className="col-span-12 lg:col-span-3 gap-5">
          <div className="mb-8">
            <h1 className="text-xl font-bold mb-4">Categories</h1>
            <ul>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="all" name="all" />
                <label htmlFor="all" className="mr-2">All</label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="electronics" name="category" value="electronics" />
                <label htmlFor="electronics" className="mr-2">Electronics</label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="fashion" name="category" value="fashion" />
                <label htmlFor="fashion" className="mr-2">Fashion</label>
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Price</h2>
            <ul>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="price1" name="price" value="0-50" />
                <label htmlFor="price1" className="mr-2">$0 - $50</label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="price2" name="price" value="50-100" />
                <label htmlFor="price2" className="mr-2">$50 - $100</label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="price3" name="price" value="100-200" />
                <label htmlFor="price3" className="mr-2">$100 - $200</label>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Brands</h2>
            <ul>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="nike" name="brand" value="nike" />
                <label htmlFor="nike" className="mr-2">Nike</label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="adidas" name="brand" value="adidas" />
                <label htmlFor="adidas" className="mr-2">Adidas</label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="puma" name="brand" value="puma" />
                <label htmlFor="puma" className="mr-2">Puma</label>
              </li>
            </ul>
          </div>
        </aside>

      
        <div className="w-full items-center col-span-12 md:col-span-9 justify-center gap-5">

          <div className="flex items-center justify-between mb-10 px-5">
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2">Sort by:</label>
              <select id="sort" className="py-1 px-2 border border-gray-400 rounded">
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <span className="ml-4 text-sm text-gray-600">
                Showing {startProductNumber} - {endProductNumber} of {products.length} products
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className="cursor-pointer px-2 py-1 border-gray-400 rounded"
                onClick={() => setGridView(3)}
              >
                <TfiLayoutGrid3Alt className="text-xl" />
              </span>
              <span
                className="cursor-pointer px-2 py-1 border-gray-400 rounded"
                onClick={() => setGridView(2)}
              >
                <TfiLayoutGrid2Alt className="text-xl" />
              </span>
            </div>
          </div>
          {/* Products Grid */}
          <section className={`w-full px-5 grid grid-cols-2 md:grid-cols-${gridView} gap-5`}>
            {currentProducts.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </section>
          <div className="mt-5 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-[rgb(167,73,255)] text-[rgb(119,55,178)] rounded-full disabled:opacity-50 hover:bg-[rgb(167,73,255)] hover:text-white transition duration-300"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-full text-[rgb(167,73,255)] ${currentPage === i + 1 ? "bg-[rgb(167,73,255)] text-white" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-[rgb(167,73,255)] text-[rgb(120,51,184)] rounded-full disabled:opacity-50 hover:bg-[rgb(167,73,255)] hover:text-white transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
