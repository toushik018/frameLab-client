import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useTitle from "../../Hooks/useTitle";

const Enrolled = () => {
    const { user } = useAuth();
    const [enrolledData, setEnrolledData] = useState([]);
    useTitle('Enrolled Classes')

    useEffect(() => {
        fetch(`https://frame-lab-server.vercel.app/enrolled/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setEnrolledData(data);
            });
    }, [user]);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Id</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {enrolledData.map((item) => (
                        <tr key={item._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>

                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.date)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.price}$</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.transactionId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Enrolled;
