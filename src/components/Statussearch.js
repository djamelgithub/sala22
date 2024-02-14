import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
 
const Statussearchh = () => {
    const dispatch = useDispatch();

    const buttonStyles = {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#3498db',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const handleButtonClick = () => {
        dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: true });
    };

    return (

        <div className="sidebar-search">
        <div>
            <div className="input-group">
                <input type="text" className="form-control search-menu"placeholder='Recherche avancée' onClick={handleButtonClick}/>
                <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fa fa-search" aria-hidden="true" />
                                        </span>
                                    </div>
            </div>
        </div>
    </div>

         
    );
};


export default Statussearchh