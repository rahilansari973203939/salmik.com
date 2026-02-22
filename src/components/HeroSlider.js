'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        type: 'video',
        video: '/images/Video-01.mp4',
        poster: '/images/makaron/banner.jpeg',
        link: '/products?category=paddle-brush',
        buttonText: 'Shop Brushes',
        title: 'Paddle Brush Essentials',
        subtitle: 'Smooth strokes, salon finish.',
    },
    {
        id: 2,
        type: 'image',
        image: '/images/curly/curlyyyyy.jpeg',
        link: '/products?category=round-brush',
        buttonText: 'Explore Round Brushes',
        title: 'Round Brush Volume',
        subtitle: 'Lift and bounce for every blowout.',
    },
    {
        id: 3,
        type: 'image',
        image: '/images/rice-images/images-1.jpeg',
        link: '/products?category=rice',
        buttonText: 'Shop Rice',
        title: 'Premium Basmati Rice',
        subtitle: 'Aromatic grains for royal meals.',
    },
    {
        id: 4,
        type: 'image',
        image: '/images/rice-images/images-2.jpeg',
        link: '/products?category=rice',
        buttonText: 'View Rice Collection',
        title: 'Jasmine Rice Pantry',
        subtitle: 'Soft, fragrant, everyday comfort.',
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRef = useRef(null);

    // Handle slide change when video ends
    const handleVideoEnded = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
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
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="relative h-full w-full">
                            {slide.type === 'video' ? (
                                <video
                                    ref={videoRef}
                                    className="h-full w-full object-cover pointer-events-none"
                                    src={slide.video}
                                    poster={slide.poster}
                                    autoPlay
                                    muted
                                    playsInline
                                    preload="metadata"
                                    onEnded={handleVideoEnded}
                                    onPause={() => {
                                        if (videoRef.current && videoRef.current.ended) {
                                            handleVideoEnded();
                                        }
                                    }}
                                />
                            ) : (
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="h-full w-full object-cover pointer-events-none"
                                />
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
                                        href={slide.link}
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
                        className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
