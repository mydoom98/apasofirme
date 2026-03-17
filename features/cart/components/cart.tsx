
'use client';

import { useCart } from '../store/cart.store';
import { useAuth } from '@/features/auth/store/auth.store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
    const user = useAuth((state) => state.user);

    const handleCheckout = async () => {
        if (!user) {
            alert('Debes iniciar sesión para continuar');
            return;
        }

        const total = getTotal();

        try {
            // Guardar orden en Firestore
            await addDoc(collection(db, 'orders'), {
                userEmail: user.email,
                items: items,
                total: total,
                status: 'pending',
                createdAt: new Date(),
            });

            const message = `🛒 *Nuevo Pedido A PASO FIRME*\n\n` +
                `Cliente: ${user.email}\n` +
                `Items:\n${items.map(item => `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('\n')}\n\n` +
                `*Total: ${formatPrice(total)}*`;

            const whatsappUrl = `https://wa.me/5493758434182?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');

            clearCart();
            setIsOpen(false);
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Hubo un error al procesar el pedido. Por favor intenta nuevamente.');
        }
    };

    return (
        <>
            {/* Floating Cart Button — black */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-black hover:bg-gray-900 text-white p-4 rounded-full shadow-lg transition-all z-40 border-2 border-gray-700 relative"
            >
                <ShoppingCart className="w-6 h-6" />
                {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                        {items.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
                        <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden flex flex-col border border-gray-200 pointer-events-auto">
                            {/* Header */}
                            <div className="flex flex-row items-center justify-between p-5 md:p-6 bg-black border-b border-gray-200">
                                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                                    <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    Tu Carrito
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
                                {items.length === 0 ? (
                                    <div className="text-center py-20">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
                                            <ShoppingCart className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <p className="text-xl font-bold text-gray-500">Tu carrito está vacío</p>
                                        <Button
                                            variant="link"
                                            onClick={() => setIsOpen(false)}
                                            className="mt-4 text-black underline"
                                        >
                                            Ir a ver productos
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 border border-gray-200 p-4 rounded-xl bg-white hover:border-gray-400 transition-all">
                                                <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200 overflow-hidden">
                                                    {item.imageUrl ? (
                                                        <Image
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-3xl">👟</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="space-y-0.5">
                                                        <h4 className="font-bold text-black text-sm sm:text-lg leading-tight truncate">{item.name}</h4>
                                                        <p className="text-xs sm:text-sm text-gray-700 font-bold">{formatPrice(item.price)}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 p-0.5">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-black transition font-bold"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="font-bold text-black min-w-6 sm:min-w-8 text-center text-xs sm:text-base">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-black transition font-bold"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end justify-between py-1">
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full transition"
                                                    >
                                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                    <span className="font-black text-black text-sm sm:text-xl">{formatPrice(item.price * item.quantity)}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Total y Botones */}
                                        <div className="mt-4 sm:mt-6 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-3 sm:space-y-4">
                                            <div className="flex justify-between items-center text-lg sm:text-2xl">
                                                <span className="font-bold text-black">Total:</span>
                                                <span className="font-black text-black">{formatPrice(getTotal())}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2">
                                                <Button
                                                    onClick={() => setIsOpen(false)}
                                                    variant="outline"
                                                    className="border-gray-300 bg-white text-black font-bold hover:bg-gray-100 h-10 sm:h-12 text-xs sm:text-sm"
                                                >
                                                    Más Productos
                                                </Button>
                                                <Button
                                                    onClick={handleCheckout}
                                                    className="bg-black hover:bg-gray-900 text-white font-bold h-10 sm:h-12 text-xs sm:text-sm border border-gray-700"
                                                >
                                                    Confirmar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
