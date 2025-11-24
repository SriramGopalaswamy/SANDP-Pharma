
import React, { useState } from 'react';
import { Search, ShoppingCart, Tag, Plus, Minus, ArrowLeft, MapPin, Truck, Warehouse, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { CartItem, UserRole } from '../types';

interface ProductCatalogProps {
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  userRole?: UserRole;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ cart, onAddToCart, userRole }) => {
  const isDistributor = userRole === 'distributor';
  const isCustomer = userRole === 'customer';
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Base Products Data
  const baseProducts = [
    { id: 1, name: 'Paracetamol 500mg', brand: 'Panadol', type: 'Brand', basePrice: 450, stock: 'High', generic: 'Acetaminophen', image: 'https://placehold.co/200?text=Panadol' },
    { id: 2, name: 'Amoxicillin 250mg', brand: 'Amoxil', type: 'Brand', basePrice: 1440, stock: 'Low', generic: 'Amoxicillin Gen', image: 'https://placehold.co/200?text=Amoxil' },
    { id: 3, name: 'Ibuprofen 400mg', brand: 'Advil', type: 'Brand', basePrice: 1260, stock: 'High', generic: 'Ibuprofen Gen', image: 'https://placehold.co/200?text=Advil' },
    { id: 4, name: 'Cetirizine 10mg', brand: 'Zyrtec', type: 'Brand', basePrice: 1760, stock: 'High', generic: 'Aller-Relief', image: 'https://placehold.co/200?text=Zyrtec' },
    { id: 5, name: 'Metformin 500mg', brand: 'Glucophage', type: 'Brand', basePrice: 680, stock: 'Medium', generic: 'Metformin HCL', image: 'https://placehold.co/200?text=Gluco' },
  ];

  // Logic for price and MOQ based on role
  const products = baseProducts.map(p => {
    let price = p.basePrice;
    let unitLabel = 'Pack';
    let moq = 1;

    if (isDistributor) {
      price = Math.round(p.basePrice * 0.85); // 15% cheaper for bulk
      unitLabel = 'Carton (50 Packs)';
      moq = 50;
    } else if (isCustomer) {
      price = Math.round(p.basePrice * 1.2); // MRP (20% higher)
      unitLabel = 'Strip';
      moq = 1;
    }

    return { ...p, price, unitLabel, moq };
  });

  // State to track quantity per product
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});

  const getQuantity = (id: number, moq: number) => quantities[id] || moq;

  const handleQuantityChange = (id: number, delta: number, moq: number) => {
    setQuantities(prev => {
      const current = prev[id] || moq;
      const step = isDistributor ? moq : 1; // Distributor increases by MOQ steps
      const next = current + (delta * step);
      return { ...prev, [id]: Math.max(moq, next) };
    });
  };

  const handleAddClick = (product: any) => {
    const qty = getQuantity(product.id, product.moq);
    onAddToCart({
      id: product.id,
      name: `${product.name} (${product.unitLabel})`,
      price: product.price,
      quantity: qty
    });
    // Reset
    setQuantities(prev => ({ ...prev, [product.id]: product.moq }));
  };

  // --- PRODUCT DETAIL PAGE RENDERER ---
  if (selectedProduct) {
    const currentQty = getQuantity(selectedProduct.id, selectedProduct.moq);
    
    return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-2 text-gray-600 hover:text-pharma-900 font-medium transition-colors">
                <ArrowLeft size={20} /> Back to Catalog
            </button>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Product Detail Header */}
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 bg-gray-50 rounded-xl flex items-center justify-center p-8 border border-gray-100">
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-64 object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded">{selectedProduct.type}</span>
                                {isDistributor && <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded">Bulk Item</span>}
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900">{selectedProduct.name}</h1>
                            <p className="text-lg text-gray-500 font-medium">{selectedProduct.brand}</p>
                            {!isDistributor && !isCustomer && (
                                <p className="text-sm text-amber-600 font-medium mt-1">Generic Equivalent: {selectedProduct.generic}</p>
                            )}
                        </div>
                        
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-pharma-900">₹{selectedProduct.price}</span>
                            <span className="text-base text-gray-400 mb-2 font-medium">per {selectedProduct.unitLabel}</span>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg w-fit">
                             <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                <button 
                                  onClick={() => handleQuantityChange(selectedProduct.id, -1, selectedProduct.moq)}
                                  className="p-3 hover:bg-gray-100 text-gray-600 transition-colors"
                                >
                                  <Minus size={18} />
                                </button>
                                <span className="w-16 text-center font-bold text-lg">{currentQty}</span>
                                <button 
                                  onClick={() => handleQuantityChange(selectedProduct.id, 1, selectedProduct.moq)}
                                  className="p-3 hover:bg-gray-100 text-gray-600 transition-colors"
                                >
                                  <Plus size={18} />
                                </button>
                             </div>
                             <button 
                                onClick={() => handleAddClick(selectedProduct)}
                                className="bg-pharma-900 text-white px-8 py-3 rounded-lg hover:bg-pharma-800 transition-all font-bold shadow-md active:scale-95 flex items-center gap-2"
                             >
                                <ShoppingCart size={20} /> Add to Cart
                             </button>
                        </div>
                    </div>
                </div>

                {/* Real-Time Stock & Logistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                     
                     {/* Warehouse Stock */}
                     <div className="p-8 space-y-6">
                         <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                             <Warehouse className="text-pharma-600" /> Real-Time Stock Availability
                         </h3>
                         <div className="space-y-4">
                             {[
                                 { name: 'Central Warehouse (Mumbai)', stock: 'High', count: 1250, status: 'Available' },
                                 { name: 'Regional DC (Bangalore)', stock: 'Low', count: 42, status: 'Selling Fast' },
                                 { name: 'Local Hub (Indiranagar)', stock: 'Out', count: 0, status: 'Out of Stock' },
                             ].map((wh, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                     <div>
                                         <p className="font-bold text-gray-800 text-sm">{wh.name}</p>
                                         <p className={`text-xs font-medium mt-1 ${wh.count > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                             {wh.count > 0 ? `${wh.count} Units Available` : 'Restocking in 2 days'}
                                         </p>
                                     </div>
                                     <div className="text-right">
                                         {wh.count > 0 ? (
                                             <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-bold">
                                                 <CheckCircle size={14} /> In Stock
                                             </div>
                                         ) : (
                                             <div className="flex items-center gap-1 text-red-500 bg-red-100 px-2 py-1 rounded text-xs font-bold">
                                                 <XCircle size={14} /> OOS
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Delivery Estimate */}
                     <div className="p-8 space-y-6">
                         <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                             <Truck className="text-pharma-600" /> Estimated Delivery
                         </h3>
                         
                         <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
                             <div className="flex items-start gap-3">
                                 <MapPin className="text-blue-600 shrink-0 mt-1" size={24} />
                                 <div>
                                     <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Delivering to</p>
                                     <p className="font-bold text-gray-900 text-base">City Pharma, Indiranagar, Bangalore</p>
                                     <p className="text-sm text-gray-500">Karnataka - 560038</p>
                                 </div>
                                 <button className="text-xs text-blue-600 font-bold underline ml-auto hover:text-blue-800">Change</button>
                             </div>
                         </div>

                         <div className="space-y-3">
                             <div className="flex items-center gap-4 p-4 border border-green-200 bg-green-50/50 rounded-xl">
                                 <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                     <Truck size={20} />
                                 </div>
                                 <div className="flex-1">
                                     <p className="text-xs text-green-700 font-bold uppercase tracking-wide">Fastest Delivery</p>
                                     <p className="font-bold text-gray-900">Tomorrow, by 2:00 PM</p>
                                     <p className="text-xs text-gray-500">Fulfilled via Regional DC (Bangalore)</p>
                                 </div>
                             </div>
                             
                             <div className="flex items-center gap-4 p-4 border border-gray-200 bg-white rounded-xl opacity-75">
                                 <div className="h-10 w-10 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center shrink-0">
                                     <Warehouse size={20} />
                                 </div>
                                 <div className="flex-1">
                                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Standard Shipping</p>
                                     <p className="font-bold text-gray-900">3 - 4 Days</p>
                                     <p className="text-xs text-gray-500">Fulfilled via Central Warehouse</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isCustomer ? 'Medicines' : 'Product Catalog'}
          </h2>
          <p className="text-gray-500">
            {isDistributor ? 'Bulk ordering with MOQ applied.' : isCustomer ? 'Order genuine medicines with 24h delivery.' : 'Browse medicines for your pharmacy.'}
          </p>
        </div>
        <div className="relative min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search medicines..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pharma-500"
          />
        </div>
      </div>

      {/* Grid: Different Layout for Customer (B2C) vs B2B */}
      <div className={`grid gap-6 ${isCustomer ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
        {products.map((product) => {
          const currentQty = getQuantity(product.id, product.moq);
          
          // B2C Card Design
          if (isCustomer) {
            return (
                <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
                        <img src={product.image} alt={product.name} className="object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                        <h3 className="font-bold text-gray-800 text-sm leading-tight h-10 overflow-hidden">{product.name}</h3>
                        <div className="mt-3 flex items-end justify-between">
                            <div>
                                <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.1)}</span>
                                <div className="font-bold text-lg text-gray-900">₹{product.price}</div>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleAddClick(product); }}
                                className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 shadow-sm"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )
          }

          // B2B (Retailer & Distributor) Card Design
          return (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow relative">
              {isDistributor && (
                  <div className="absolute top-0 right-0 bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-bl">
                      MOQ: {product.moq}
                  </div>
              )}
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-4 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded mb-2">{product.type}</span>
                    <h3 className="text-lg font-bold text-gray-900 hover:text-pharma-700 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <p className="text-xs text-gray-400 mt-1">{product.unitLabel}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-pharma-700">₹{product.price}</span>
                    <div className="text-xs text-gray-400">per {isDistributor ? 'carton' : 'pack'}</div>
                  </div>
                </div>
                
                {/* Substitution Logic Visual (Retailer Only usually) */}
                {!isDistributor && (
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                        <Tag size={16} className="text-amber-600 mt-0.5" />
                        <div>
                        <p className="text-xs text-amber-800 font-medium">Generic: {product.generic}</p>
                        <button className="text-xs text-pharma-600 font-bold hover:underline mt-1">Switch & Save</button>
                        </div>
                    </div>
                    </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                   <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => handleQuantityChange(product.id, -1, product.moq)}
                        className="p-2 hover:bg-gray-100 text-gray-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium text-sm">{currentQty}</span>
                      <button 
                        onClick={() => handleQuantityChange(product.id, 1, product.moq)}
                        className="p-2 hover:bg-gray-100 text-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                   </div>

                   <button 
                    onClick={() => handleAddClick(product)}
                    className="flex items-center gap-2 bg-pharma-600 text-white px-4 py-2 rounded-lg hover:bg-pharma-700 transition-colors text-sm font-medium shadow-sm active:scale-95 transform transition-transform"
                   >
                      <ShoppingCart size={16} /> Add
                   </button>
                </div>
                
                <div className="mt-3 flex justify-between items-center text-xs">
                    {isDistributor && (
                        <span className="text-purple-600 font-medium flex items-center gap-1">
                            <AlertTriangle size={12} /> Bulk Pricing Applied
                        </span>
                    )}
                   <span className={`font-medium ml-auto ${
                      product.stock === 'High' ? 'text-green-600' : 
                      product.stock === 'Medium' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {product.stock} Stock
                    </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCatalog;
