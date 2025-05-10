
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const NotFound = () => {

    const navigate = useNavigate()
    const [isLidOpen, setIsLidOpen] = useState(false);

    useEffect(() => {
        console.log('hello my guyss ....')
        const interval = setInterval(() => {
            setIsLidOpen(prev => !prev);
            setTimeout(() => {
                setIsLidOpen(prev => !prev);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="max-w-lg w-full text-center">
                {/* Animated Trash Bin */}
                <div className="relative w-32 h-40 mx-auto mb-8">
                    {/* Bin Lid */}
                    <div
                        className={`absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-primary rounded-t-md z-10 transition-transform duration-300 origin-bottom ${isLidOpen ? 'transform -rotate-30' : ''
                            }`}
                    ></div>

                    {/* Bin Body */}
                    <div className="absolute bottom-0 w-32 h-32 bg-accen bg-primary rounded-md overflow-hidden">
                        {/* Recycling Symbol */}
                        <div className="absolute inset-0 flex items-center justify-center text-seconday text-4xl">
                            ♻️
                        </div>
                    </div>

                    {/* Paper flying out when lid opens */}
                    <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-6 h-8 bg-accent2 rounded transform transition-all duration-500 ${isLidOpen ? '-translate-y-8 rotate-12' : 'translate-y-4 opacity-0'
                        }`}></div>
                </div>

                {/* Error Text */}
                <h1 className="text-8xl font-bold text-accent mb-2">404</h1>
                <h2 className="text-2xl font-semibold opacity-50 mb-4">Page Not Found</h2>
                <p className="opacity-50 mb-8">
                    Looks like this page has been recycled or never existed.
                    Let's help you find your way back to a cleaner environment.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-primary  text-accent2 rounded-xl font-bold transition-colors"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-1 bg-accent text-primary rounded-xl font-bold  transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound