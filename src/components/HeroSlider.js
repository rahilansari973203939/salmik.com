'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        type: 'video',
        video: '/images/Video-01.mp4',
        poster: '/images/makaron/banner.jpeg',
        productId: 1,
        buttonText: 'Shop Brushes',
        title: 'Paddle Brush Essentials',
        subtitle: 'Smooth strokes, salon finish.',
    },
    {
        id: 2,
        type: 'image',
        image: '/images/curly/curlyyyyy.jpeg',
        productId: 4,
        buttonText: 'Explore Round Brushes',
        title: 'Round Brush Volume',
        subtitle: 'Lift and bounce for every blowout.',
    },
    {
        id: 3,
        type: 'image',
        image: '/images/makaron/makaronnnn.jpeg',
        productId: 2,
        buttonText: 'Shop Detangling Brush',
        title: 'Detangling Brush',
        subtitle: 'Gentle detangling for all hair types.',
    },
    {
        id: 4,
        type: 'image',
        image: '/images/curly/curlyy.jpeg',
        productId: 5,
        buttonText: 'Shop Combs',
        title: 'Premium Combs',
        subtitle: 'Style your hair with precision.',
    },
    {
        id: 5,
        type: 'image',
        image: '/images/makaron/makaronnnnnn.jpeg',
        productId: 3,
        buttonText: 'Shop More Brushes',
        title: 'Professional Brushes',
        subtitle: 'Salon-quality brushes for home use.',
    },
    {
        id: 6,
        type: 'image',
        image: '/images/rice/images-1.jpeg',
        productId: 7,
        buttonText: 'Shop Rice',
        title: 'Premium Basmati Rice',
        subtitle: 'Aromatic grains for royal meals.',
    },
    {
        id: 7,
        type: 'image',
        image: '/images/rice/images-2.jpeg',
        productId: 12,
        buttonText: 'View Rice Collection',
        title: 'Jasmine Rice Pantry',
        subtitle: 'Soft, fragrant, everyday comfort.',
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    // Handle slide change when video ends
    const handleVideoEnded = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Toggle mute/unmute
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Auto-advance for image slides
    useEffect(() => {
        const currentSlideData = slides[currentSlide];
        if (currentSlideData.type !== 'video') {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [currentSlide]);

    return (
        <div className="relative h-screen w-full">
            <div className="relative h-full w-full overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="relative h-full w-full">
                            {slide.type === 'video' ? (
                                <div className="relative h-full w-full bg-slate-900">
                                    <video
                                        ref={videoRef}
                                        className="h-full w-full object-contain pointer-events-none"
                                        src={slide.video}
                                        poster={slide.poster}
                                        autoPlay
                                        muted={isMuted}
                                        playsInline
                                        preload="metadata"
                                        onEnded={handleVideoEnded}
                                    />
                                    {/* Custom Mute/Unmute Button */}
                                    <button
                                        onClick={toggleMute}
                                        className="absolute bottom-20 right-6 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium transition z-10"
                                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                                    >
                                        {isMuted ? '🔇 Unmute' : '🔊 Mute'}
                                    </button>
                                </div>
                            ) : (
                                <div className="h-full w-full pointer-events-none bg-white">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                            <div className="absolute inset-0 flex items-end md:items-center">
                                <div className="max-w-4xl px-6 sm:px-10 lg:px-16 pb-16 md:pb-0">
                                    <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                                        BrushRiceMart
                                    </p>
                                    <h2 className="mt-4 text-3xl sm:text-5xl font-display font-semibold text-white">
                                        {slide.title}
                                    </h2>
                                    <p className="mt-3 text-base sm:text-lg text-white/80">
                                        {slide.subtitle}
                                    </p>
                                    <Link
                                        href={`/product/${slide.productId}`}
                                        className="mt-6 inline-flex items-center rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-white transition"
                                        aria-label={`Go to ${slide.title}`}
                                    >
                                        {slide.buttonText || 'Shop Now'} →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
