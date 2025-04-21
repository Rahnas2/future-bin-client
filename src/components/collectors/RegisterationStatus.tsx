import { getStripeOnboardingUrlApi } from '@/api/collectorServices';
import { AlertTriangle, Check, X } from 'lucide-react';
import React from 'react';

type Props = {
    status: 'pending' | 'approved' | 'rejected'
    stripeAccountId: string | null
}

const RegistrationStatus: React.FC<Props> = ({status, stripeAccountId}) => {
    // Determine styling and content based on status
    const getBgColor = () => {
        switch(status) {
            case 'pending': return 'bg-amber-900/20';
            case 'approved': return 'bg-emerald-900/20';
            case 'rejected': return 'bg-red-900/20';
            default: return 'bg-amber-900/20';
        }
    };
    
    const getBorderColor = () => {
        switch(status) {
            case 'pending': return 'border-amber-700';
            case 'approved': return 'border-emerald-700';
            case 'rejected': return 'border-red-700';
            default: return 'border-amber-700';
        }
    };
    
    const getTextColor = () => {
        switch(status) {
            case 'pending': return 'text-amber-200';
            case 'approved': return 'text-emerald-200';
            case 'rejected': return 'text-red-200';
            default: return 'text-amber-200';
        }
    };
    
    const getIcon = () => {
        switch(status) {
            case 'pending': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            case 'approved': return <Check className="h-5 w-5 text-emerald-500" />;
            case 'rejected': return <X className="h-5 w-5 text-red-500" />;
            default: return <AlertTriangle className="h-5 w-5 text-amber-500" />;
        }
    };
    
    const handleAccCreation = async () => {
        if(!stripeAccountId) return 
        try {
            const result = await getStripeOnboardingUrlApi(stripeAccountId)
            window.location.href = result.url
        } catch (error) {
            console.log('error fetching onboarding url ', error)
        }
    }

    const text = status === 'pending' 
        ? 'Your account is pending approval from an administrator.' 
        : status === 'approved' 
            ? 'Your account has been approved but you need to complete the setup process.' 
            : 'Your registration has been rejected by an administrator.';

    
    return (
        <div className={`border-l-4 p-4 mb-5 ${getBgColor()} ${getBorderColor()}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    {getIcon()}
                </div>
                <div className="ml-3">
                    <p className={`text-sm ${getTextColor()}`}>
                        {text}
                        {status === 'approved' && (
                            <button onClick={handleAccCreation} className="ml-2 cursor-pointer underline text-emerald-400 hover:text-emerald-300 font-medium">
                                Complete setup now
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationStatus;