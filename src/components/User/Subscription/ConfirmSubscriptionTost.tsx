import { subscriptionType } from "@/types/SubscriptionType";
import toast from "react-hot-toast";

const showSubscriptionToast = (subscription: subscriptionType, onConfirm: () => void) => {
    return toast.custom((t) => (
        <div className={` ${t.visible ? 'animate-enter' : 'animate-leave'} w-[60%] bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
                <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                        Confirm Subscription Change
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        You already have an active subscription. Switching to <b>{subscription.name}</b> will replace your current plan. Do you want to proceed?
                    </p>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)} // ❌ Cancel
                    className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 cursor-pointer"
                >
                    ❌ Cancel
                </button>
                <button
                    onClick={() => {
                        toast.dismiss(t.id);
                        setTimeout(onConfirm, 1000); // ✅ Confirm after toast disappears
                    }}
                    className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 cursor-pointer"
                >
                    ✅ Confirm
                </button>
            </div>
        </div>
    ));
};

export default showSubscriptionToast