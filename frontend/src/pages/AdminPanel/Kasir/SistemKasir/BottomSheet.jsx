import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import RecommendationCard from './RecommendationCard';

const BottomSheet = ({ 
  isOpen, 
  onClose, 
  recommendations, 
  onAddToCart, 
  selectedProduct 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-50 transform transition-all duration-300 ease-out shadow-2xl ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } max-h-[45vh]`}>
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        <div className="px-4 sm:px-6 pb-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✨</span>
                <h2 className="text-lg sm:text-xl font-bold truncate">Rekomendasi untuk Anda</h2>
              </div>
              {selectedProduct && (
                <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                  Berdasarkan <span className="font-medium text-slate-700">{selectedProduct.name}</span> yang baru ditambahkan
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Products Grid */}
          <ScrollArea className="w-full pb-4">
            {recommendations.length === 0 ? ( 
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <ShoppingCart className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm">Tidak ada rekomendasi produk</p>
              </div>
            ) : (
              <div className="flex gap-3 whitespace-nowrap px-1">
                {recommendations.map((product) => (
                  <RecommendationCard 
                    key={product.produkId || product.id} 
                    product={product} 
                    onAddToCart={onAddToCart} 
                  />
                ))}
              </div>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Footer Actions */}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;