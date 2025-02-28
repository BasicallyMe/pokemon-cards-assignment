'use client';

import { useState, useEffect } from "react";

export default async function PokemonCard({ data }: { data: { name: string, url: string }}) {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getPokemonData() {
        try {
            
        } catch (error) {
            console.log('Got error');
        }
    }
    
    useEffect(() => {

    }, [])

    return (
        <div>

        </div>
    )
}