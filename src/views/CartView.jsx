import React from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';

export default function CartView({
  cartItems = [], handleClearCart, handleUpdateQuantity, handleRemoveFromCart,
  subtotal = 0, tax = 0, total = 0, setActiveTab
}) {
  // Asegurarnos de que los valores numéricos sean válidos
  const safeSubtotal = isNaN(Number(subtotal)) ? 0 : Number(subtotal);
  const safeTax = isNaN(Number(tax)) ? 0 : Number(tax);
  const safeTotal = isNaN(Number(total)) ? 0 : Number(total);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-cyan-400" /> Carrito de Compras
          </h2>
          {cartItems.length > 0 && (
            <button onClick={handleClearCart} className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Vaciar Carrito
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
            <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-lg">Tu carrito está totalmente vacío.</p>
            <button onClick={() => setActiveTab('tienda')} className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition">
              Ir a la Tienda
            </button>
          </div>
        ) : (
          cartItems.map((item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            const itemTotal = price * quantity;

            return (
              <div key={item.id || Math.random()} className="bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'} 
                    alt={item.title || 'Producto'} 
                    className="w-20 h-20 object-cover rounded-xl bg-slate-950" 
                  />
                  <div>
                    <h4 className="font-bold text-white text-lg">{item.title || 'Producto en carrito'}</h4>
                    <p className="text-cyan-400 font-semibold">${price.toFixed(2)} c/u</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-1">
                    <button onClick={() => handleUpdateQuantity(item.id, quantity - 1)} className="px-3 py-1 hover:bg-slate-800 text-slate-300 rounded font-bold">-</button>
                    <span className="px-3 font-bold text-cyan-400">{quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, quantity + 1)} className="px-3 py-1 hover:bg-slate-800 text-slate-300 rounded font-bold">+</button>
                  </div>
                  <span className="font-bold text-xl text-white">${itemTotal.toFixed(2)}</span>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-400 hover:text-red-300 p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Resumen Fijo a la Derecha */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Resumen de Compra</h3>
        <div className="space-y-3 text-sm text-slate-400">
          <div className="flex justify-between"><span>Subtotal:</span><span className="text-white font-semibold">${safeSubtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>IVA (16%):</span><span className="text-white font-semibold">${safeTax.toFixed(2)}</span></div>
          <div className="border-t border-slate-800 pt-3 flex justify-between text-lg font-bold text-white">
            <span>Total:</span><span className="text-cyan-400">${safeTotal.toFixed(2)}</span>
          </div>
        </div>
        <button
          disabled={cartItems.length === 0}
          onClick={() => { alert('¡Gracias por tu compra!'); handleClearCart(); }}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-slate-950 font-black rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition disabled:opacity-50"
        >
          Procesar Pago
        </button>
      </div>
    </div>
  );
}