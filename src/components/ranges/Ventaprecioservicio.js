import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 

 

const Ventaprecioservicio = ({VentaPrecioservicioo}) => {
  const [servicioventa, setServicioVenta ] = useState([500, 1000000]);

  return (
    <div className='card'>
      <label>
      Prix en Dinars
        <Slider
          min={500}
          max={1000000}
          step={500}
          range
          value={servicioventa}
          onChange={(newRange) => {
            setServicioVenta(newRange);
            VentaPrecioservicioo(newRange); // Llama a la función proporcionada por el prop
          }}
          trackStyle={{ backgroundColor: '#007bff', height: 10 }}
          handleStyle={{
            borderColor: '#007bff',
            height: 20,
            width: 20,
            marginLeft: -10,
            marginTop: -5,
            backgroundColor: '#007bff',
          }}
          railStyle={{ backgroundColor: '#ccc', height: 10 }}
        />

        <div style={{ marginTop: 10 }}>
        De {servicioventa[0]} à {servicioventa[1]} Dinar
        </div>
      </label>
    </div>
  );
};

export default Ventaprecioservicio
