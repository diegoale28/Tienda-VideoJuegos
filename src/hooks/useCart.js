import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';

export function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));
  const handleUpdateQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }));
  const handleClearCart = () => dispatch(clearCart());

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return { cartItems, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleClearCart, totalItems, subtotal, tax, total };
}