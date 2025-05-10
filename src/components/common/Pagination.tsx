import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = (props: Props) => {

    const handlePrev = () => props.currentPage > 1 && props.onPageChange(props.currentPage - 1)
    const handleNext = () => props.currentPage < props.totalPages && props.onPageChange(props.currentPage + 1)


    return (
        <div className='flex justify-center'>
            <div className='flex items-center gap-5'>
                <button onClick={handlePrev} disabled={props.currentPage === 1}>
                    <FaLongArrowAltLeft className='inline' />
                </button>

                <div className='text-sm'>
                    {Array.from({ length: props.totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`m-1 w-5 h-5 rounded-full ${props.currentPage === i + 1 ? 'bg-accent text-primary' : 'bg-accent3 text-primary'
                                }`}
                            onClick={() => props.onPageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button onClick={handleNext} disabled={props.currentPage === props.totalPages}>
                    <FaLongArrowAltRight className='inline' />
                </button>

            </div>
        </div>
    )
}

export default Pagination