
type Props = {
    status: boolean
}

const TableHead = (props: Props) => {
    return (
        <thead className="">
            <tr className="border-b opacity-50">
                <th className="pl-6 p-3 text-left">#</th>
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Area</th>
                {props.status && <th className="p-3 text-left">Status</th>}
                <th className="pl-4 py-3 text-left"></th>
            </tr>
        </thead>
    )
}

export default TableHead