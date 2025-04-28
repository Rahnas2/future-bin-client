
import AdminNav from '../../components/Admin/AdminNav'
import AddSubscription from '../../components/Admin/Subscriptions/AddSubscription';
import AdminSubCard from '../../components/Admin//Subscriptions/AdminSubCard';
import SubscriptionModal from '../../components/Admin/Subscriptions/SubscriptionModal';
import { useEffect, useState } from 'react';
import { subscriptionType } from '../../types/SubscriptionType';
import { fetchAllSubscriptionsApi } from '../../api/userService';


type Props = {}

const SubscriptionManagemnt = (props: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [subscriptions, setSubscriptions] = useState<subscriptionType[]>([]);
    const [editingSubscription, setEditingSubscription] = useState<subscriptionType | null>(null);

    const [loading, setLoading] = useState<boolean>(true);


    const fetchSubscriptions = async () => {
        try {
            const result = await fetchAllSubscriptionsApi();
            setSubscriptions(result.subscriptions);
            setLoading(false);
        } catch (error) {
            console.log('error ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);


    const handleOpenAdd = () => {
        setIsOpen(true);
        setEditingSubscription(null);
    };

    const handleOpenEdit = (sub: subscriptionType) => {
        setIsOpen(true);
        setEditingSubscription(sub);
    };

    const handleClose = () => {
        setIsOpen(false)
        setEditingSubscription(null);
    }

    const handleAddSubscription = (newSubscription: subscriptionType) => {
        setSubscriptions((prevSubscriptions) => [newSubscription, ...prevSubscriptions]);
    };

    const handleEditSubscription = (updatedSubscription: subscriptionType) => {
        setSubscriptions((prev) =>
            prev.map((sub) => (sub._id === updatedSubscription._id ? updatedSubscription : sub))
        )
    }

    const handleDeleteSubscription = (id: string) => {
        setSubscriptions((prevSubscriptions) => prevSubscriptions.filter(sub => sub._id !== id));
    }

    return (
        <>
            <div className='flex min-h-lvh'>

                <div className="bg-primary mt-6 mr-2 rounded-t-xl px-4 py-4 flex-1 ">

                    <AddSubscription onOpen={handleOpenAdd} />

                    <div className='text-xl mb-4 px-10'>Avaliable Subscriptions</div>

                    <AdminSubCard
                        subscriptions={subscriptions}
                        loading={loading}
                        onDeleteSubscription={handleDeleteSubscription}
                        onOpenEdit={handleOpenEdit}
                    />

                </div>
            </div>
            {isOpen && <SubscriptionModal onClose={handleClose} onAddSubscription={handleAddSubscription} onEditSubscription={handleEditSubscription} subscription={editingSubscription} />}
        </>
    )
}

export default SubscriptionManagemnt