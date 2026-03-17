
'use client';

import { cn } from '@/lib/utils';
import { Shield, Zap, Headphones, Award } from 'lucide-react';

interface PromoBannerProps {
    className?: string;
}

export function PromoBanner({ className }: PromoBannerProps) {
    const items = [
        { text: "100% SEGURO", icon: Shield },
        { text: "ENTREGA RÁPIDA", icon: Zap },
        { text: "SOPORTE 24/7", icon: Headphones },
        { text: "GARANTÍA TOTAL", icon: Award },
    ];

    const ContentBlock = () => (
        <div className="flex items-center gap-12 px-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="text-xl font-bold text-white uppercase tracking-wider whitespace-nowrap">
                                {item.text}
                            </span>
                            <item.icon className="w-5 h-5 text-white fill-cyan-400/20 shrink-0" />
                            <span className="text-gray-700 text-2xl font-black mx-8 select-none">•</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <div className={cn("relative w-full overflow-hidden bg-black py-4 border-y border-gray-800", className)}>
            <div className="flex w-fit animate-marquee">
                <ContentBlock />
                <ContentBlock />
            </div>
        </div>
    );
}
