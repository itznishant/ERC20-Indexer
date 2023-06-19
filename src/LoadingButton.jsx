import React, { useState } from 'react';

export default function LoadingButton() {
    const [loading, setLoading] = useState(false);
    
    const animate = () => {
        // Button loading starts
        setLoading(true);
    }
    
    return(
        <button onClick = {animate} className = {loading ? `btn btn--loading` : `btn`}>
            GET TOKEN BALANCES
        </button>
    );
}