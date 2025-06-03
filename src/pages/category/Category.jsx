import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { TfiLayoutGrid3Alt, TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaSearch } from "react-icons/fa";
import useAllProducts from "../../customHooks/useFetchAllProducts";
import { useLocation } from "react-router";
import Products from "../../components/Category/Products";
import scrollToTop from "../../Feature/scrollToTop";

const Category = () => {
  const useQuery=new URLSearchParams(useLocation().search);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all"); // Future use if needed
  const [selectedSort, setSelectedSort] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gridView, setGridView] = useState(3);
  // listView state is available for future extension if needed
  const [listView, setListView] = useState(false);  
  const {products, categories, loading, error} =  useAllProducts()

  useEffect(()=>{
    categories.unshift(

    {category_name: 'All', description: 'All Categories'})

  },[categories])

  // Debounce search query to avoid excessive re-renders
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);



  
   
  let productsCopy = [...products]
  const query=useQuery.get("search")
 
    if(query && productsCopy.length>0){
      const lowerCaseQuery=query.toLowerCase();
      const result=products.filter(product=>product.product_name.toLowerCase().includes(lowerCaseQuery))
      productsCopy=result
    }
 


  const pageSize = 12;
  const inputRef = useRef(null);



  // Memoized filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let result = productsCopy.filter((product) =>{
      if(selectedCategory==="All") return true
      const category= categories.find(cat=>cat.category_name===selectedCategory)
      if(!category) return false

      return product.category_id===category.id
    }
    );

    if (debouncedSearchQuery.trim() !== "") {
      result = result.filter((product) =>
        product.product_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Sorting logic
    result.sort((a, b) => {
      // if (selectedSort === "popularity") return b.rating.rate - a.rating.rate;
      if (selectedSort === "price-asc") return a.variants[0]?.price - b.variants[0]?.price;
      if (selectedSort === "price-desc") return b.variants[0]?.price - a.variants[0]?.price;
      return 0;
    });

    // Price filtering
    result = result.filter((product) => {
      if (selectedPrice === "all") return true;
      if (selectedPrice === "0-50") return product?.variants[0].price <= 50;
      if (selectedPrice === "50-100")
        return product.variants[0].price > 50 && product?.variants[0].price <= 100;
      if (selectedPrice === "100-200")
        return product.variants[0].price > 100 && product?.variants[0].price <= 200;
      if (selectedPrice === "200+") return product?.variants[0].price > 200;
      return false;
    });
    return result;
  }, [productsCopy, selectedCategory, searchQuery, selectedSort, selectedPrice]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / pageSize),
    [filteredProducts, pageSize]
  );
  const currentProducts = useMemo(
    () =>
      filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      ),
    [filteredProducts, currentPage, pageSize]
  );

  const startProductNumber =
    filteredProducts.length > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endProductNumber = Math.min(
    currentPage * pageSize,
    filteredProducts.length
  );

  let isScrolling=useRef(false)
  const scrollTop=()=>{
    if(isScrolling.current) return
    isScrolling.current=true;
  const smoothScrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 40) {
      window.scrollTo(0, c - c / 5);
      window.requestAnimationFrame(smoothScrollToTop);
    }else{
      isScrolling.current=false
    }
  };
  smoothScrollToTop()
  }
  
  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        scrollTop();
      }
    },
    [totalPages]
  );
  
 
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    scrollTop();
  }, []);

  if(productsCopy.length===0 && loading){
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
  if(error){
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold">{error}</h1>   
      </div>
    );
  }
  // if(!loading && productsCopy.length===0){
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <h1 className="text-2xl font-bold">No products found</h1>
  //     </div>
  //   );
  // }


  return (
    <>
  
      <div className="w-full px-5 sm:px-15 md:px-30 lg:px-40 grid  gap-5 py-10 md:py-20 grid-cols-1 lg:grid-cols-12">
        <aside className="col-span-12 lg:col-span-3 gap-5">
            <div className="w-full">
                <label htmlFor="search">Search</label>
              <div className="border max-w-100 border-gray-400 rounded relative flex items-center justify-between mb-4">
                <input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  className="w-10/12 px-4 py-2 border-gray-400 rounded outline-0"
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <span
                  className=" border-l-gray-400 px-3 py-3 text-gray-500"
                  onClick={() => setCurrentPage(1)}
                >
                  <FaSearch className="text-xl  font-extralight" />
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-between mb-4">
          <div className=" mb-8 md:px-5">
            <h1 className="text-xl font-bold mb-4">Categories</h1>
            <ul>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <li key={index} className="mb-2 flex items-center gap-4">
                    <input
                      type="radio"
                      id={category.category_name}
                      name="category"
                      value={category.category_name}
                      checked={selectedCategory === category.category_name}
                      onChange={() => handleCategoryChange(category.category_name)}
                    />
                    <label htmlFor={category.category_name} className="mr-2">
                      {category.category_name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
          <div className="mb-8 md:px-5">
            <h2 className="text-lg font-semibold mb-4">Price</h2>
            <ul>
              <li className="mb-2 flex items-center gap-4">
                <input
                  type="radio"
                  id="price-all"
                  name="price"
                  value="all"
                  checked={selectedPrice === "all"}
                  onChange={() => setSelectedPrice("all")}
                />
                <label htmlFor="price-all" className="mr-2">
                  all
                </label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input
                  type="radio"
                  id="price-0-50"
                  name="price"
                  value="0-50"
                  checked={selectedPrice === "0-50"}
                  onChange={() => setSelectedPrice("0-50")}
                />
                <label htmlFor="price-0-50" className="mr-2">
                  $0 - $50
                </label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input
                  type="radio"
                  id="price-50-100"
                  name="price"
                  value="50-100"
                  checked={selectedPrice === "50-100"}
                  onChange={() => setSelectedPrice("50-100")}
                />
                <label htmlFor="price-50-100" className="mr-2">
                  $50 - $100
                </label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input
                  type="radio"
                  id="price-100-200"
                  name="price"
                  value="100-200"
                  checked={selectedPrice === "100-200"}
                  onChange={() => setSelectedPrice("100-200")}
                />
                <label htmlFor="price-100-200" className="mr-2">
                  $100 - $200
                </label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input
                  type="radio"
                  id="price-200-plus"
                  name="price"
                  value="200+"
                  checked={selectedPrice === "200+"}
                  onChange={() => setSelectedPrice("200+")}
                />
                <label htmlFor="price-200-plus" className="mr-2">
                  $200+
                </label>
              </li>
            </ul>
          </div>
          {/* Brands section (if needed in future) */}
          {/* <div className="mb-8 px-5">
            <h2 className="text-lg font-semibold mb-4">Brands</h2>
            <ul>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="nike" name="brand" value="nike" />
                <label htmlFor="nike" className="mr-2">
                  Nike
                </label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input
                  type="checkbox"
                  id="adidas"
                  name="brand"
                  value="adidas"
                />
                <label htmlFor="adidas" className="mr-2">
                  Adidas
                </label>
              </li>
              <li className="mb-2 flex items-center gap-4">
                <input type="checkbox" id="puma" name="brand" value="puma" />
                <label htmlFor="puma" className="mr-2">
                  Puma
                </label>
              </li>
            </ul>
          </div> */}
          </div>
        </aside>

        <div className="w-full mr-auto items-center col-span-12 md:col-span-9 justify-center gap-5">
          <div className="flex items-center justify-between mb-10 px-5">
            <div className="flex flex-wrap gap-3 items-center">
              <fieldset>
              <label htmlFor="sort" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                className="py-1 px-2 border border-gray-400 rounded"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="popularity">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              </fieldset>
              <span className=" text-sm text-gray-600">
                Showing {startProductNumber} - {endProductNumber} of{" "}
                {filteredProducts.length} products
              </span>
            <div className=" items-center gap-2 hidden lg:flex">
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
          </div>
          <section
            className={`w-full px-5 grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-${gridView} gap-5`}
          >
            {currentProducts.map((product, index) => (
              <Products key={index} product={product} />
            ))}
           
          </section>
          {
             !loading && !error && (productsCopy.length===0 || currentProducts.length===0) && <p className="text-center">No products found</p>
            }
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
                className={`px-3 py-1 rounded-full text-[rgb(167,73,255)] ${
                  currentPage === i + 1 ? "bg-[rgb(167,73,255)] text-white" : ""
                }`}
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
