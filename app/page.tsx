'use client';

import { useState } from 'react';
import { ProductCard } from '@/features/products/components/product-card';
import { Cart } from '@/features/cart/components/cart';
import { useProducts } from '@/features/products/hooks/use-products';
import { PromoBanner } from '@/components/ui/promo-banner';
import { Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const { products, loading } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeBrand, setActiveBrand] = useState('all');

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by category exactly matching the brand
        const matchesBrand = activeBrand === 'all' ||
            product.category.toLowerCase() === activeBrand.toLowerCase();

        return matchesSearch && matchesBrand;
    });

    return (
        <>



            <h2 className="titulo">ZAPATILLAS</h2>



            <div className="container-main">
                <div className="search-area">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar zapatilla..."
                    />
                </div>

                <div className="flex flex-row flex-wrap justify-center items-center gap-4 mt-6 mb-12">
                    <img
                        src="/img/nike.png"
                        className={`w-[90px] h-[90px] object-contain bg-white rounded-2xl p-2 cursor-pointer transition-transform duration-200 hover:scale-110 shadow-md ${activeBrand === 'nike' ? 'scale-110 ring-2 ring-black' : ''}`}
                        onClick={() => setActiveBrand(activeBrand === 'nike' ? 'all' : 'nike')}
                        alt="Nike"
                    />
                    <img
                        src="/img/vans.png"
                        className={`w-[90px] h-[90px] object-contain bg-white rounded-2xl p-2 cursor-pointer transition-transform duration-200 hover:scale-110 shadow-md ${activeBrand === 'vans' ? 'scale-110 ring-2 ring-black' : ''}`}
                        onClick={() => setActiveBrand(activeBrand === 'vans' ? 'all' : 'vans')}
                        alt="Vans"
                    />
                    <img
                        src="/img/adidas.png"
                        className={`w-[90px] h-[90px] object-contain bg-white rounded-2xl p-2 cursor-pointer transition-transform duration-200 hover:scale-110 shadow-md ${activeBrand === 'adidas' ? 'scale-110 ring-2 ring-black' : ''}`}
                        onClick={() => setActiveBrand(activeBrand === 'adidas' ? 'all' : 'adidas')}
                        alt="Adidas"
                    />
                    <img
                        src="/img/dc.png"
                        className={`w-[90px] h-[90px] object-contain bg-white rounded-2xl p-2 cursor-pointer transition-transform duration-200 hover:scale-110 shadow-md ${activeBrand === 'dc' ? 'scale-110 ring-2 ring-black' : ''}`}
                        onClick={() => setActiveBrand(activeBrand === 'dc' ? 'all' : 'dc')}
                        alt="DC"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="mt-4 text-text-muted">Cargando catálogo...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-text-muted text-lg">
                            {searchTerm ? 'No se encontraron productos con ese término' : 'No hay productos disponibles'}
                        </p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <PromoBanner />

            <footer className="landing-footer">
                <p>&copy; {new Date().getFullYear()} A PASO FIRME. Todos los derechos reservados.</p>
                <a
                    href="https://wa.me/51917024847?text=Hola,%20vi%20tu%20u%20web%20y%20me%20interesa%20crear%20mi%20página"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--secondary)', textDecoration: 'none', marginTop: '10px', display: 'inline-block' }}
                >
                    ¿Quieres que cree tu página? Click aquí
                </a>
            </footer>

            <a
                className="fixed bottom-[100px] right-6 bg-[#25D366] text-white text-[22px] w-14 h-14 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#20b858] transition-colors z-50 flex items-center justify-center"
                href="https://wa.me/5493758434182"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fa-brands fa-whatsapp text-[28px]"></i>
            </a>

            <Cart />
        </>
    );
}
