import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import apiLocalidades from '@/services/apiLocalidades';

const Mapa = () => {
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [dadosGeograficos, setDadosGeograficos] = useState(null);

    useEffect(() => {
        apiLocalidades.get('localidades/estados?orderBy=nome').then(res => {
            setDadosGeograficos(res.data);
            console.log(res.data)
        })
        
    }, []);
    
    return (
        <div>
            <ComposableMap projection="geoMercator">
                <Geographies geography={dadosGeograficos}>
                    {({ dadosGeograficos}) =>
                        dadosGeograficos.map((geography) => (
                            <Geography
                                key={geography.id}
                                geography={geography}
                                onClick={() => handleEstadoClick(geography)}
                                style={{
                                    default: {
                                        fill: '#ECEFF1',
                                        stroke: '#607D8B',
                                        strokeWidth: 0.75,
                                        outline: 'none',
                                    },
                                    hover: {
                                        fill: '#CFD8DC',
                                        stroke: '#607D8B',
                                        strokeWidth: 0.75,
                                        outline: 'none',
                                    },
                                    pressed: {
                                        fill: '#FF5722',
                                        stroke: '#607D8B',
                                        strokeWidth: 0.75,
                                        outline: 'none',
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
            {estadoSelecionado && <p>Estado selecionado: {estadoSelecionado}</p>}
        </div>
    );
};

export default Mapa