import { IRootState } from '@/redux/slices'
import { fetchWasteTypes } from '@/redux/slices/wasteTypesSlice'
import { AppDispatch } from '@/redux/store'
import { wasteType } from '@/types/wasteTyp'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const useFetchWasteTypes = () => {
    const { wasteTypes, initialized } = useSelector((state: IRootState) => state.wasteTypes)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!initialized) {
            const findWasteTypes = async () => {
                try {
                    const response = await dispatch(fetchWasteTypes({ page: 1, limit: 20, search: '' })).unwrap()
                    console.log('response here man', response);
                    return response; 
                } catch (error) {
                    console.log('error fetching waste types..', error);
                    throw error;
                }
            };
            findWasteTypes();
        }
    }, [dispatch, initialized])

    return wasteTypes;
}

export default useFetchWasteTypes