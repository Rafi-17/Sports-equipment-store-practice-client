import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AllEquipment = () => {

    const equipments = useLoaderData();
    console.log(equipments);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        equipments.map((equipment,idx)=>(
                            <tr className='hover:bg-slate-600' key={equipment._id}>
                                <th>{idx+1}</th>
                                <td>{equipment.item}</td>
                                <td>{equipment.category}</td>
                                <td>{equipment.price}</td>
                                <td><Link to={`/equipments/${equipment._id}`} className='px-3 py-2 text-sm font-bold bg-lime-500 rounded-md'>Details</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEquipment;