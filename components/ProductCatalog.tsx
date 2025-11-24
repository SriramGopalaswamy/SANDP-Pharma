
import React from 'react';
import { Search, ShoppingCart, Tag } from 'lucide-react';

const ProductCatalog: React.FC = () => {
  const products = [
    { id: 1, name: 'Paracetamol 500mg', brand: 'Panadol', type: 'Brand', price: 12.50, stock: 'High', generic: 'Acetaminophen 500mg' },
    { id: 2, name: 'Amoxicillin 250mg', brand: 'Amoxil', type: 'Brand', price: 18.00, stock: 'Low', generic: 'Amoxicillin Generic' },
    { id: 3, name: 'Ibuprofen 400mg', brand: 'Advil', type: 'Brand', price: 15.75, stock: 'High', generic: 'Ibuprofen Generic' },
    { id: 4, name: 'Cetirizine 10mg', brand: 'Zyrtec', type: 'Brand', price: 22.00, stock: 'High', generic: 'Aller-Relief' },
    { id: 5, name: 'Metformin 500mg', brand: 'Glucophage', type: 'Brand', price: 8.50, stock: 'Medium', generic: 'Metformin HCL' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
          <p className="text-gray-500">Browse medicines and add to bulk order.</p>
        </div>
        <div className="relative min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by brand or generic name..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pharma-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded mb-2">{product.type}</span>
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
                <span className="text-xl font-bold text-pharma-700">${product.price.toFixed(2)}</span>
              </div>
              
              {/* Substitution Logic Visual */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Tag size={16} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-amber-800 font-medium">Generic available: {product.generic}</p>
                    <button className="text-xs text-pharma-600 font-bold hover:underline mt-1">Switch & Save 20%</button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                 <div className="text-sm">
                    <span className={`font-medium ${
                      product.stock === 'High' ? 'text-green-600' : 
                      product.stock === 'Medium' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {product.stock} Stock
                    </span>
                 </div>
                 <button className="flex items-center gap-2 bg-pharma-600 text-white px-4 py-2 rounded-lg hover:bg-pharma-700 transition-colors text-sm font-medium">
                    <ShoppingCart size={16} /> Add
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
