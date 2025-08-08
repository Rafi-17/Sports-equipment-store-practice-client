import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import EquipmentCard from './EquipmentCard';

const MyEquipment = () => {
    const loadedEquipments = useLoaderData();
    const [equipments,setEquipments] = useState(loadedEquipments)
    console.log(equipments);
    return (
        <div>
            <h2 className='text-center font-bold text-4xl my-8'>My Equipments</h2>
            <div className='grid grid-cols-3 gap-6 mx-4'>
                {
                    equipments.map(equipment=><EquipmentCard key={equipment._id} equipments={equipments} setEquipments={setEquipments} equipment={equipment}></EquipmentCard>)
                }
            </div>
        </div>
    );
};

export default MyEquipment;