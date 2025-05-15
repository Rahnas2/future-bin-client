import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
    image: string | null | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    mobile: string | undefined,
    isEdit: boolean,
    selectedImage: File | null,
    setSelectedImage: (file: File ) => void 
    imgValError: string | undefined | null
}

const ProfileCard = (props: Props) => {

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            props.setSelectedImage(e.target.files[0])
        }
    }

    console.log('validation erro', props.imgValError)
    return (
        <div className="flex gap-4 md:gap-8 items-center mb-10">
            <div className="inline">
                {props.selectedImage ? <img className="w-22 h-22 md:w-42 md:h-42 rounded-full" src={URL.createObjectURL(props.selectedImage)} />: props.image ? <img className="w-42 h-42 rounded-full" src={props.image} alt="" /> :
                    <FaUserCircle className='inline m-0 w-32 h-32 md:h-42 md:w-42' />
                }
                <div className='flex justify-center mt-2 md:mt-4 '><label htmlFor='image' hidden={!props.isEdit} className='border px-4  rounded-lg opacity-50 text-sm cursor-pointer'>Edit</label></div>
                <input onChange={handleImageChange} type="file" id='image' hidden />
                {props.imgValError && <div className='text-red-700'>{props.imgValError}</div>} 
            </div>
            <div className='flex flex-col justify-center'>
                <div className="font-semibold md:font-bold text-xl md:text-2xl mt-8 mb-2">{props.firstName + '    ' + props.lastName}</div>
                <div className="mb-1 opacity-50">{props.email}</div>
                <div className="opacity-50">{props.mobile}</div>
            </div>
        </div>
        
    )
}

export default ProfileCard