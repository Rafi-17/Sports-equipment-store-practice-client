import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EquipmentCard = ({equipment,equipments,setEquipments}) => {

    const { _id, photo, item, category, description, price, rating, customization, processingTime, stockStatus } = equipment;

    const handleDelete=(id)=>{
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/equipments/${id}`,{
                    method:'DELETE'
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.deletedCount>0){
                        const remaining = equipments.filter(equipment=>equipment._id!=id);
                        setEquipments(remaining)
                        Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                        });
                    }
                })
            }
        });
    }


    // A helper function to render the fractional stars
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const partialStarFill = rating - fullStars;

        for (let i = 0; i < 5; i++) {
            const starValue = i + 1;
            if (starValue <= fullStars) {
                // Full star
                stars.push(
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                    </svg>
                );
            } else if (starValue === fullStars + 1 && partialStarFill > 0) {
                // Partial star
                stars.push(
                    <div key={i} className="relative w-5 h-5">
                        <svg className="absolute top-0 left-0 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                        </svg>
                        <div className="absolute top-0 left-0 overflow-hidden text-yellow-400" style={{ width: `${partialStarFill * 100}%` }}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                            </svg>
                        </div>
                    </div>
                );
            } else {
                // Empty star
                stars.push(
                    <svg key={i} className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.377-2.454a1 1 0 00-1.176 0l-3.377 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.094 9.387c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.96z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-200">
            {/* Equipment Image */}
            <div className="bg-white flex items-center justify-center h-48 w-full overflow-hidden">
  <img 
    src={photo} 
    alt={item} 
    className="object-contain h-full"
  />
</div>
            
            {/* Card Body */}
            <div className="p-4 flex flex-col h-full">
                {/* Item Name and Category */}
                <h3 className="text-xl font-bold text-gray-100">{item}</h3>
                <p className="text-sm text-gray-400 mb-2">{category}</p>

                {/* Price and Stock Status */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-teal-400">৳ {price}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase text-gray-900 ${stockStatus>0 ? 'bg-green-500' : 'bg-red-500'}`}>
                        {stockStatus}
                    </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                    <div className="flex items-center space-x-1 text-yellow-400">
                        {renderStars(rating)}
                    </div>
                    <span className="ml-2 text-gray-400 text-sm">({rating} / 5)</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t border-gray-700">
                    <Link
                        to={`/myEquipments/updateEquipment/${_id}`}
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Update
                    </Link>
                    <button
                        onClick={()=>handleDelete(_id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentCard;