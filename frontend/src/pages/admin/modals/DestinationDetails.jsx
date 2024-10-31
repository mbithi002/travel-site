import React, { useEffect, useState } from 'react';

const DestinationDetails = ({ destination }) => {
    const [currentDestination, setCurrentDestination] = useState(destination);

    useEffect(() => {
        setCurrentDestination(destination);
    }, [destination]);

    return (
        <>
        </>
    );
};

export default DestinationDetails;
