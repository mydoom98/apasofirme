
'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { formatPrice } from '@/lib/utils';
import { useAuth } from '@/features/auth/store/auth.store';
import { useOrder } from '../hooks/use-order';
import { AlertCircle } from 'lucide-react';

interface PurchaseModalProps {
    isOpen: boolean;
    product: Product;
    onClose: () => void;
}

export function PurchaseModal({ isOpen, product, onClose }: PurchaseModalProps) {
    const { createOrder, isLoading } = useOrder();
    const [isPurchased, setIsPurchased] = useState(false);
    const { user } = useAuth();

    // Si no está autenticado, mostrar mensaje
    if (!user) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="fixed bottom-0 sm:bottom-auto sm:top-1/2 left-0 sm:left-1/2 !translate-x-0 sm:!-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md bg-black sm:bg-black/90 border-t sm:border border-blue-500/20 rounded-t-3xl sm:rounded-2xl backdrop-blur-xl p-6 sm:p-6 shadow-2xl translate-y-0 translate-x-0">
                    <DialogHeader>
                        <DialogTitle className="text-xl flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            Inicia Sesión Requerido
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-gray-300">
                            Para realizar compras, debes tener una cuenta activa. Esto nos permite:
                        </p>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>✓ Guardar tu información de compra</li>
                            <li>✓ Ofrecerte descuentos especiales</li>
                            <li>✓ Mantenerte actualizado con tus pedidos</li>
                        </ul>
                        <Button
                            onClick={onClose}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12"
                        >
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    const handleConfirmPurchase = async () => {
        try {
            // Crear la orden
            const orderData = {
                userEmail: user?.email || 'guest@example.com',
                items: [{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    imageUrl: product.imageUrl,
                    category: product.category
                }],
                total: product.price,
                status: 'pending',
                createdAt: new Date(),
            };

            await createOrder(orderData);
            setIsPurchased(true);

            // Esperar 2 segundos y redirigir a WhatsApp
            setTimeout(() => {
                const message = `Hola, me interesa comprar: ${product.name} por ${formatPrice(product.price)}`;
                const phoneNumber = product.whatsappNumber || '5493758434182'; // Fallback por seguridad
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                onClose();
                setIsPurchased(false);
            }, 2000);
        } catch (error) {
            console.error('Error al procesar compra:', error);
            alert('Error al procesar la compra');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="fixed bottom-0 sm:bottom-auto sm:top-1/2 left-0 sm:left-1/2 !translate-x-0 sm:!-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md border-t sm:border border-blue-500/20 bg-black backdrop-blur-xl rounded-t-3xl sm:rounded-2xl p-6 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto translate-y-0 translate-x-0">
                {!isPurchased ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-xl text-white font-bold">Confirmar Compra</DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Revisa los detalles antes de confirmar
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-900/10">
                                <h3 className="font-bold text-white text-base sm:text-lg leading-tight">{product.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-400 mt-1">{product.description}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-1 sm:mb-2">
                                    <span className="text-xs sm:text-gray-400">Precio:</span>
                                    <span className="font-extrabold text-blue-400 text-lg sm:text-xl">{formatPrice(product.price)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-gray-400">Stock disponible:</span>
                                    <span className="font-bold text-green-400 text-xs sm:text-base">{product.stock}</span>
                                </div>
                            </div>
                            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex gap-2">
                                <span className="text-amber-400">ℹ️</span>
                                <p className="text-xs text-amber-200/80 leading-relaxed">
                                    Se creará una solicitud y serás redirigido a WhatsApp para completar el pedido.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white h-10 sm:h-11 text-xs sm:text-sm"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleConfirmPurchase}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] border border-blue-400/30 h-10 sm:h-11 text-xs sm:text-sm"
                                >
                                    {isLoading ? 'Procesando...' : 'Confirmar'}
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-xl text-green-400 font-bold text-center">¡Solicitud Recibida!</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-8">
                            <div className="text-center">
                                <div className="inline-block bg-green-500/10 p-6 rounded-full mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                    <svg className="w-10 h-10 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Solicitud Enviada</h3>
                                <p className="text-gray-400 text-sm max-w-[250px] mx-auto">Tu pedido está listo. Redirigiendo a WhatsApp para finalizar la compra...</p>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
