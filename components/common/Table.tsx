import React from 'react'

const Table = ({ headers, data }: { headers: string[], data: any[] }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody


            >
                <tr>
                    <td>John Doe</td>
                    <td>john.doe@example.com</td>
                    <td>1234567890</td>
                    <td>123 Main St, Anytown, USA</td>
                </tr>

            </tbody>
        </table>
    )
}

export default Table