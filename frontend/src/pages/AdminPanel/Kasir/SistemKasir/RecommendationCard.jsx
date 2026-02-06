import React from 'react';
import { Badge } from '@/components/ui/badge';
import { API_URL } from "../../../../helpers/networt";

const RecommendationCard = ({ product, onAddToCart }) => {
  return (
    <div 
      onClick={() => onAddToCart(product)}
      className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-200 border border-slate-200/80 cursor-pointer w-[280px] sm:w-[320px] flex-shrink-0"
    >
      {/* Product Image */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 bg-slate-200 rounded-lg overflow-hidden">
        <img
          src={product.foto ? `${API_URL}/images/${product.foto}` : "https://github.com/shadcn.png"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 whitespace-normal">
            <h3 className="font-semibold text-sm line-clamp-2 mb-1.5">
              {product.name}
            </h3>
            <span className="font-bold text-sm text-primary">
              Rp {product.harga?.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
           <Badge variant="outline" className="text-xs bg-white border-slate-300 py-0">
             {product.kategori}
           </Badge>
           <span className="bg-slate-200/70 px-2 py-0.5 rounded-full">
             Stok {product.stok}
           </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;