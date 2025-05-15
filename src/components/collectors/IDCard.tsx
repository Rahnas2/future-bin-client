
type Props = {
    front: string | undefined,
    back: string | undefined
}

const IDCard = (props: Props) => {
    return (
        <div className='mt-8'>
            <div className='font-medium mb-4'>Your Id</div>
            <div className='flex w-fit flex-col md:flex-row justify-center items-center gap-8'>
                <div className='border border-dashed rounded-md p-2'><img className=' h-48 w-xs rounded-md' src={props.front} alt="" /></div>
                <div className='border border-dashed rounded-md p-2' ><img className=' h-48 w-xs rounded-md' src={props.back} alt="" /></div>
            </div>
        </div>
    )
}

export default IDCard