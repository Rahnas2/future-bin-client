import { TiTick } from 'react-icons/ti'

type Props = {
    features: string[]
}

const ActiveSubscriptionFeatures = (props: Props) => {
    return (
        <div className='flex flex-col bg-primary px-6 py-5 rounded-2xl border border-gray-500 shadow-sm md:shadow md:border-0'>
            <div className='mb-5 font-bold text-xl'>Available Services</div>
            <div className='flex flex-col gap-2'>
                {
                    props.features.map(feature => (
                        <div key={feature}>
                            <TiTick className='inline text-accent2 mr-3' />
                            <span>{feature}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ActiveSubscriptionFeatures