import React from 'react';
import Link from "next/link";

const ClientsPage = () => {
    const clients = [
        {
            id: 'anton',
            name: 'Anton'
        },
        {
            id: 'ne-anton',
            name: 'Ne Anton'
        }
    ]

    return (
        <div>
            <h1>Clients pgge</h1>

            <ul>
                {
                    clients.map(client =>
                        <li key={client.id}>
                            {/*<Link href={`/clients/${client.id}`}>*/}
                            <Link href={{
                                pathname: 'clients/[clientId]',
                                query: {
                                    clientId: client.id
                                }
                            }}>
                                {client.name}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default ClientsPage;