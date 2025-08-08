import React from 'react';
import { useLoaderData } from 'react-router-dom';

const EquipmentDetails = () => {
    const equipment = useLoaderData();
    console.log(equipment);
    const { photo, item, category, description, price, rating, customization, processingTime, stockStatus } = equipment;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Section */}
                    <div className="relative overflow-hidden rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <img
                            src={photo}
                            alt={item}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                            {item}
                        </h1>

                        <div className="flex items-center mb-6">

    {/* RATING SECTION STARTS HERE................. */}

    <div className="flex items-center space-x-1 text-yellow-400">
        {/*
        This loop now handles full, partial, and empty stars.
        The key is to render a partial star with a dynamic width
        using an overflow-hidden container.
        */}
        {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;
            const fullStars = Math.floor(rating);
            const partialStarFill = rating - fullStars;

            if (starValue <= fullStars) {
                // Render a full star
                return (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                    </svg>
                );
            } else if (starValue === fullStars + 1 && partialStarFill > 0) {
                // Render the partial star
                return (
                    <div key={i} className="relative w-5 h-5">
                        {/* Empty star background */}
                        <svg className="absolute top-0 left-0 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                        </svg>
                        {/* Filled star foreground with dynamic width */}
                        <div
                            className="absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${partialStarFill * 100}%` }}
                        >
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                            </svg>
                        </div>
                    </div>
                    );
                } else {
                    // Render an empty star
                    return (
                        <svg key={i} className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                        </svg>
                    );
                }
            })}
        </div>
        <span className="ml-2 text-gray-400">({rating} / 5)</span>
    </div>
                        
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl lg:text-5xl font-bold text-teal-400">
                                ${price}
                            </span>
                            <span className="ml-2 text-xl text-gray-400">USD</span>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {description}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                            <div>
                                <p className="font-semibold text-gray-200">Customization:</p>
                                <p>{customization}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-200">Processing Time:</p>
                                <p>{processingTime}</p>
                            </div>
                        </div>

                        {/* Fixed Alignment */}
                        <div className="mt-8 flex items-end gap-4">
                            <div className="w-1/2 space-y-2">
                                <p className="font-semibold text-gray-200">Stock Status:</p>
                                <div className={` py-2 text-center rounded-full font-bold uppercase text-gray-900 ${stockStatus>0 ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {stockStatus}
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors duration-300 transform hover:-translate-y-1">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetails;