
'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/store/cart.store';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { PurchaseModal } from '@/features/orders/components/purchase-modal';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const addItem = useCart((state) => state.addItem);

    const handleAddToCart = () => {
        if (product.stock > 0) {
            addItem(product);
        }
    };

    return (
        <>
            <div
                className="group relative transition-all duration-200 hover:scale-[1.03]"
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '15px',
                    textAlign: 'center',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    width: '100%',
                    maxWidth: '300px',
                    margin: '0 auto',
                    boxSizing: 'border-box',
                }}
            >
                {/* Category tag */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'black',
                    color: 'white',
                    padding: '5px 10px',
                    fontSize: '12px',
                    borderRadius: '5px',
                    zIndex: 1,
                }}>
                    {product.category}
                </div>

                {/* Out of stock overlay */}
                {product.stock === 0 && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.6)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                    }}>
                        <span style={{ background: 'red', color: 'white', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', fontSize: '18px', transform: 'rotate(-12deg)' }}>AGOTADO</span>
                    </div>
                )}

                {/* Image */}
                <div style={{ width: '100%', height: '230px', position: 'relative', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
                    {product.imageUrl ? (
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', fontSize: '60px' }}>👟</div>
                    )}
                </div>

                {/* Low stock badge */}
                {product.stock <= 5 && product.stock > 0 && (
                    <span style={{ fontSize: '12px', color: '#e65c00', fontWeight: 'bold' }}>¡Últimas {product.stock} unidades!</span>
                )}

                {/* Name & description */}
                <h3 style={{ margin: '4px 0', fontSize: '16px', fontWeight: 'bold', color: '#111' }}>{product.name}</h3>
                <p style={{ margin: '0', fontSize: '13px', color: '#555', minHeight: '36px' }}>{product.description}</p>

                {/* Price */}
                <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '6px 0', color: '#000' }}>{formatPrice(product.price)}</p>

                {/* Stock info */}
                <p style={{ fontSize: '13px', color: product.stock > 0 ? '#555' : '#c0392b', margin: 0 }}>
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
                </p>

                {/* Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                    <button
                        onClick={() => setIsPurchaseModalOpen(true)}
                        disabled={product.stock === 0}
                        style={{
                            background: 'black',
                            color: 'white',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                            opacity: product.stock === 0 ? 0.5 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            fontSize: '14px',
                        }}
                    >
                        <CheckCircle size={15} /> Comprar
                    </button>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        style={{
                            background: 'white',
                            color: 'black',
                            border: '2px solid #111',
                            padding: '10px',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                            opacity: product.stock === 0 ? 0.5 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            fontSize: '14px',
                        }}
                    >
                        <ShoppingCart size={15} /> Carrito
                    </button>
                </div>
            </div>

            <PurchaseModal
                isOpen={isPurchaseModalOpen}
                product={product}
                onClose={() => setIsPurchaseModalOpen(false)}
            />
        </>
    );
}
