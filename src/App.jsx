import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'lucide-react';

// Custom Hooks
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { useForm } from './hooks/useForm';
import { useCrud } from './hooks/useCrud';

// Redux Actions
import { setProducts, addProduct, updateProduct, deleteProduct } from './features/productsSlice';
import { setCategories, addCategory, updateCategory, deleteCategory } from './features/categoriesSlice';
import { setReviews, addReview, updateReview, deleteReview } from './features/reviewsSlice';

// Componentes Reutilizables
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import ModalCrud from './components/ModalCrud';

// Vistas / Secciones
import LandingView from './views/LandingView';
import CatalogView from './views/CatalogView';
import CartView from './views/CartView';
import AdminView from './views/AdminView';
import BackendView from './views/BackendView';

const API_URL = 'http://localhost:5000/api';

export default function App() {
  const dispatch = useDispatch();
  
  // Estado local para navegación sin React Router
  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Custom Hook: Carrito
  const { cartItems, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleClearCart, totalItems, subtotal, tax, total } = useCart();

  // Redux States
  const products = useSelector(state => state.products.items);
  const categories = useSelector(state => state.categories.items);
  const reviews = useSelector(state => state.reviews.items);

  // Custom Hook: Productos (Filtros y Búsqueda)
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy, filteredProducts } = useProducts(products);

  // Custom Hook: CRUD
  const crud = useCrud('Entidad');

  // Estado Modal CRUD
  const [crudModal, setCrudModal] = useState({ isOpen: false, entity: 'products', mode: 'create', data: null });

  // Form Custom Hook para Entidades
  const { form, handleInputChange, resetForm, setFormValues } = useForm({
    title: '', price: '', platform: '', category_id: '1', image: '', stock: '10',
    name: '', slug: '', description: '',
    customer_name: '', product_id: '1', rating: '5', comment: '', status: 'Publicado'
  });

  // CARGA INICIAL DESDE MYSQL (BACKEND)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [resProd, resCat, resRev] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/reviews`)
        ]);

        if (resProd.ok) {
          const dataProd = await resProd.json();
          dispatch(setProducts(dataProd));
        }
        if (resCat.ok) {
          const dataCat = await resCat.json();
          dispatch(setCategories(dataCat));
        }
        if (resRev.ok) {
          const dataRev = await resRev.json();
          dispatch(setReviews(dataRev));
        }
      } catch (error) {
        console.log('Servidor backend offline o cargando datos locales.');
      }
    };

    fetchInitialData();
  }, [dispatch]);

  const openModal = (entity, mode = 'create', item = null) => {
    setCrudModal({ isOpen: true, entity, mode, data: item });
    if (mode === 'edit' && item) {
      setFormValues(item);
    } else {
      resetForm();
    }
  };

  const closeModal = () => {
    setCrudModal({ isOpen: false, entity: 'products', mode: 'create', data: null });
    resetForm();
  };

  // PERSISTENCIA EN MYSQL (CREAR Y EDITAR)
  const handleSubmitCrud = async (e) => {
    e.preventDefault();
    const { entity, mode, data } = crudModal;

    try {
      let payload = { ...form };

      if (entity === 'products') {
        payload = { 
          ...form, 
          category_id: parseInt(form.category_id) || 1,
          price: parseFloat(form.price), 
          stock: parseInt(form.stock) 
        };
      } else if (entity === 'reviews') {
        payload = { ...form, rating: parseInt(form.rating) };
      }

      if (mode === 'create') {
        const res = await fetch(`${API_URL}/${entity}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        const newRecord = res.ok ? await res.json() : { ...payload, id: Date.now() };

        if (entity === 'products') dispatch(addProduct(newRecord));
        if (entity === 'categories') dispatch(addCategory(newRecord));
        if (entity === 'reviews') dispatch(addReview(newRecord));

      } else if (mode === 'edit') {
        await fetch(`${API_URL}/${entity}/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (entity === 'products') dispatch(updateProduct({ ...payload, id: data.id }));
        if (entity === 'categories') dispatch(updateCategory({ ...payload, id: data.id }));
        if (entity === 'reviews') dispatch(updateReview({ ...payload, id: data.id }));
      }

      crud.showNotification(`${entity.toUpperCase()} ${mode === 'create' ? 'guardado' : 'actualizado'} con éxito`);
      closeModal();
    } catch (err) {
      console.error(err);
      crud.showNotification('Error al conectar con la Base de Datos');
    }
  };

  // PERSISTENCIA EN MYSQL (ELIMINAR)
  const handleDelete = async (entity, id) => {
    if (confirm(`¿Estás seguro de eliminar este registro de MySQL?`)) {
      try {
        await fetch(`${API_URL}/${entity}/${id}`, { method: 'DELETE' });

        if (entity === 'products') dispatch(deleteProduct(id));
        if (entity === 'categories') dispatch(deleteCategory(id));
        if (entity === 'reviews') dispatch(deleteReview(id));

        crud.showNotification('Registro eliminado exitosamente');
      } catch (err) {
        console.error(err);
        crud.showNotification('Error al eliminar en la Base de Datos');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Toast Notification */}
      <Toast message={crud.notification} />

      {/* Navbar Responsive */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} totalItems={totalItems} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'inicio' && (
          <LandingView
            categories={categories}
            setActiveTab={setActiveTab}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'tienda' && (
          <CatalogView
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredProducts={filteredProducts}
            handleAddToCart={handleAddToCart}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'carrito' && (
          <CartView
            cartItems={cartItems}
            handleClearCart={handleClearCart}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            subtotal={subtotal}
            tax={tax}
            total={total}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView
            products={products}
            categories={categories}
            reviews={reviews}
            openModal={openModal}
            handleDelete={handleDelete}
          />
        )}

        {activeTab === 'backend' && <BackendView />}
      </main>

      {/* Modal CRUD */}
      <ModalCrud
        crudModal={crudModal}
        closeModal={closeModal}
        handleSubmitCrud={handleSubmitCrud}
        form={form}
        handleInputChange={handleInputChange}
        categories={categories}
      />

      {/* Detalle de Producto Modal */}
      {selectedProduct && (
       <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img 
                src={selectedProduct.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'} 
                alt={selectedProduct.title || 'Producto'} 
                className="w-full h-64 object-cover rounded-2xl bg-slate-950" 
              />
              <div className="space-y-4">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full">
                  {selectedProduct.platform || 'Gaming'}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedProduct.title || 'Sin Título'}</h3>
                <p className="text-3xl font-black text-cyan-400">
                  ${!isNaN(Number(selectedProduct.price)) ? Number(selectedProduct.price).toFixed(2) : '0.00'}
                </p>
                <p className="text-sm text-slate-400">Unidades en inventario: {selectedProduct.stock ?? 0}</p>
                <button
                  onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}