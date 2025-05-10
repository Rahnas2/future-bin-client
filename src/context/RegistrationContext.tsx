
import { createContext, useEffect, useState, ReactNode } from "react";

interface RegistrationContextType {
    data: {
        firstName: string;
        lastName: string;
        mobile: string;
        password: string;
        role: string;
    };
    updateField: (field: string, value: string) => void;
    clearSession: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

interface RegistrationProviderProps {
    children: ReactNode;
}

export const RegistrationProvider = ({ children }: RegistrationProviderProps) => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const savedData = sessionStorage.getItem('registrationData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    const updateField = (field: string, value: string) => {
        setData((prevData) => {
            const newData = { ...prevData, [field]: value };
            sessionStorage.setItem('registrationData', JSON.stringify(newData));
            return newData;
        });
    };

    const clearSession = () => {
        sessionStorage.removeItem('registrationData');
        setData({
            firstName: '',
            lastName: '',
            mobile: '',
            password: '',
            role: '',
        });
    };

    return (
        <RegistrationContext.Provider value={{ data, updateField, clearSession }}>
            {children}
        </RegistrationContext.Provider>
    )
}

// export default RegistrationProvider