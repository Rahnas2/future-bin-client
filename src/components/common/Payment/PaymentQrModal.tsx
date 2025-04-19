import React from 'react'

import { QRCodeSVG } from 'qrcode.react';

type Props = {
    paymentUrl: string,
    amount: number
    onClose: () => void
}

const PaymentQrModal = (props: Props) => {
    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg text-center">
                <h3 className="mb-4 text-lg font-semibold">Scan to Pay Balance</h3>
                <QRCodeSVG
                    value={props.paymentUrl}
                    size={256}
                    includeMargin={true}
                />
                <div className="mt-4 space-y-2">
                    <p className="text-gray-600">Amount: ₹{props.amount}</p>
                    <p className="text-sm text-gray-500">
                        Use test card: 4242 4242 4242 4242
                    </p>
                </div>
                <button
                    onClick={props.onClose}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default PaymentQrModal