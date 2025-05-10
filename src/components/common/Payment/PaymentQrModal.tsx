
import { QRCodeSVG } from 'qrcode.react';

type Props = {
    paymentUrl: string,
    amount: number
    onClose: () => void
}

const PaymentQrModal = (props: Props) => {
    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-seconday p-6 rounded-lg text-center">
                <h3 className="mb-4 text-lg font-semibold">Scan to Pay Balance</h3>
                <QRCodeSVG
                    value={props.paymentUrl}
                    size={256}
                    includeMargin={true}
                />
                <div className="mt-4 space-y-2">
                    <p className="">Amount: ₹{props.amount}</p>
                </div>
                <button
                    onClick={props.onClose}
                    className="mt-4 px-4 py-1 bg-gray-600 text-white rounded-md"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default PaymentQrModal