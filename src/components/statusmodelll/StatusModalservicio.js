import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

import { createServicioPendiente } from '../../redux/actions/servicioaproveAction'
import { updateServicio } from '../../redux/actions/servicioAction';


import communesjson from "../../json/communes.json";


import { imageShow, videoShow } from '../../utils/mediaShow'
import Slider from 'rc-slider';







const StatusModalservice = ({ closeModal }) => {

    const { auth, theme, statusservicio, socket } = useSelector(state => state)
    const { user } = useSelector(state => state.auth);
    const { bloquepost } = user;

    const dispatch = useDispatch()

    const initialState = { content: '',   opcionesservicio: '', discripcion: '', precioservicio: '', dinero: '', negociable: '', wilaya: '', commune: '', nomprenom: '', telefono: '', email: '', privacidad_informations: '', privacidad_commentarios: '' }

    const [servicioData, setservicioData] = useState(initialState);
    const [images, setImages] = useState([])

    const [selectedWilaya, setSelectedWilaya] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState([]);
    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')



    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }



    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
        setSelectedWilaya(selectedWilaya);

        const wilayaEncontrada = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya);
        const communes = wilayaEncontrada && wilayaEncontrada.commune ? wilayaEncontrada.commune : [];

        if (communes.length > 0) {
            setSelectedCommune(communes[0]);
        } else {
            setSelectedCommune('');
        }
    };




    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };




    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleChangeInput = (e, value) => {
        if (value !== undefined) {
            // Manejar el Slider
            setservicioData({ ...servicioData, [e]: value });
        } else {
            // Manejar los selects
            const { name, value } = e.target;
            setservicioData({ ...servicioData, [name]: value });
        }
    };








    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Veuillez ajouter votre photo.' },
            });



        if (statusservicio.onEdit) {
            dispatch(updateServicio({ servicioData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, statusservicio }));
        } else {
            dispatch(createServicioPendiente({ servicioData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, socket }));
        }


        setservicioData({
            content: '',   opcionesservicio: '', discripcion: '', precioservicio: '', dinero: '', negociable: '', wilaya: '', commune: '', nomprenom: '', telefono: '', email: '', privacidad_informations: '', privacidad_commentarios: ''
        });
        setImages([]);
        dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: false});
    }




    const wilayasOptions = communesjson.map((wilaya, index) => (
        <option key={index} value={wilaya.wilaya}>
            {wilaya.wilaya}
        </option>
    ));

    const communesOptions = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya)?.commune?.map((commune, index) => (
        <option key={index} value={commune}>
            {commune}
        </option>
    ));




    useEffect(() => {
        if (statusservicio.onEdit) {


            setservicioData({ ...statusservicio.servicioData });
            setImages(statusservicio.images);

            setSelectedWilaya(statusservicio.wilaya)
            setSelectedCommune(statusservicio.commune)

        }
    }, [statusservicio])








    return (


        <div className="status_modal">
            <div className="status_body">


                <form onSubmit={handleSubmit}>

                    <div className="status_header">
                        <h5 className="m-0">Ajouter votre Annonces Servise de salle</h5>
                        <span onClick={() => dispatch({
                            type: GLOBALTYPES.STATUSSERVICIO, payload: false
                        })}>
                            <span onClick={closeModal}>&times;</span>
                        </span>
                    </div>





                    <div className="form-group" >
                          <input type="hidden" name="content" value={servicioData.sala}  />

                    </div>



                    <br></br>

                    <div className="form-group" >
                        <select onChange={(e) => handleChangeInput(e)} value={servicioData.opcionesservicio} name="opcionesservicio" placeholder="Option de service" className="form-control" disabled={bloquepost === 'bloque-post'}  >

                             <option > Option de service</option>

                            <option value="">Options service</option>
                            <option value="planificacionevnevenements">Services de Planification de événements</option>
                            <option value="organisasionmariage">Organisations de mariage</option>
                            <option value="mobilierequipement">Location de Mobilier et Équipement</option>
                            <option value="decorationallefetes">Décoration Des Salles Des Fêtes</option>
                            <option value="espaceenements">Espace pour les événements</option>
                            <option value="cateringbanquet">Catering et Banquet</option>
                            <option value="locationvoiture">Transport de Luxe / Location de voiture de mariage</option>
                            <option value="audiovisueLumieres">Location de matériel audiovisuel et Lumières</option>
                            <option value="musiciendirect">Musiciens et Groupes en Direct</option>
                            <option value="robescostumes">Location de robes de mariée et de costumes</option>
                            <option value="maquillagecoiffure">Service de maquillage et coiffure</option>
                            <option value="navetteinvites">Service de navette pour les invités</option>
                            <option value="photographievideographie">Photographie et Vidéographie</option>
                            <option value="traiteurestauration">Service de Traiteur et Restauration</option>
                            <option value="gateaumariage">Gâteau de mariage</option>
                            <option value="fleurdecoration">Services de Fleurs et Décoration</option>
                            <option value="enfants">Service de garde d'enfants</option>
                            <option value="nettoyage">Services de Nettoyage</option>
                            <option value="securite">Service de sécurité</option>
                            <option value="feuxartifice">Feux d'artifice</option>


                        </select>
                    </div>

                    <br></br>

                    <div className="card-body form-group">
                        <label className="text-danger">Description: </label>
                        <textarea name="discripcion" value={servicioData.discripcion}
                            onChange={(e) => handleChangeInput(e)}
                            style={{
                                filter: theme ? 'invert(1)' : 'invert(0)',
                                color: theme ? 'white' : '#111',
                                background: theme ? 'rgba(0,0,0,.03)' : '',

                            }}
                            disabled={bloquepost === 'bloque-post'}
                        />
                    </div>

                    <br></br>
                    <div className="card-body form-group">
                        <label className="text-danger">Sélectionner lePrix en Dinars </label>
                        <Slider
                            min={500}
                            max={2000000}
                            step={500}
                            value={servicioData.precioservicio}
                            onChange={(value) => {
                                handleChangeInput('precioservicio', value);
                            }}
                            trackStyle={{ backgroundColor: '#44EB00', height: 10 }}
                            handleStyle={{
                                borderColor: '#00AF72',
                                height: 20,
                                width: 20,
                                marginLeft: -10,
                                marginTop: -5,
                                backgroundColor: '#007bff',
                            }}
                            railStyle={{ backgroundColor: '#ccc', height: 10 }}
                            disabled={bloquepost === 'bloque-post'}
                        />
                        <div style={{ marginTop: 10 }}>
                            prix: {servicioData.precioservicio} Dinars
                        </div>



                        <br></br>

                        <div className="form-group" >
                            <select onChange={(e) => handleChangeInput(e)} value={servicioData.dinero} name="dinero" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                <option > Devis de vente</option>
                                <option value="Dinars"  >Dinars</option>

                                <option value="Millions Centimes" disabled > Millions Centimes </option>

                            </select>
                        </div>
                        <div>
                            <select onChange={(e) => handleChangeInput(e)} value={servicioData.negociable} name="negociable" placeholder="Negociable" className="form-control" disabled={bloquepost === 'bloque-post'} >
                                <option > Négociation:</option>
                                <option value="Négociable" > Négociable</option>
                                <option value="Fixe">Fixe</option>
                                <option value="Offert">Offert</option>

                            </select>
                        </div>
                    </div>
                    <br></br>



                    <div className="form-group">
                        <label className="text-danger">Wilaya:</label>
                        <div>
                            <select className="form-control" name="wilaya" value={selectedWilaya} onChange={handleWilayaChange} disabled={bloquepost === 'bloque-post'} >
                                <option value="">Seleccionar wilaya</option>
                                {wilayasOptions}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="text-danger">Communes:</label>
                        <div>
                            <select className="form-control" name="commune" value={selectedCommune} onChange={handleCommuneChange} disabled={bloquepost === 'bloque-post'} >
                                <option value="">Seleccionar commune</option>
                                {communesOptions}
                            </select>
                        </div>
                    </div>

                    <br></br>
                    <div className="form-group  ">
                        <label className="text-danger">Cordonnées :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Nom et Prénom" value={servicioData.nomprenom} name="nomprenom" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>


                    <div className="form-group  ">
                        <label className="text-danger">Numéro de téléphone :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Téléphone" value={servicioData.telefono} name="telefono" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>


                    <div className="form-group  ">
                        <label className="text-danger">Email :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Email" value={servicioData.email} name="email" type="email" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>

                    <br></br>

                    <div className="form-group" >
                        <label className="text-danger">Options d'informations personnelles:</label>
                        <select onChange={(e) => handleChangeInput(e)} value={servicioData.privacidad_informations } name="privacidad_informations" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                            <option > Options  </option>
                            <option value="autoriser-les-informations">Autoriser les informations</option>
                            <option value="ne-pas-autoriser-les-informations">Ne pas autoriser les informations</option>

                        </select>
                    </div>
                    <div className="form-group" >
                        <label className="text-danger">Options des commentaires:</label>
                        <select onChange={(e) => handleChangeInput(e)} value={servicioData.privacidad_commentarios } name="privacidad_commentarios" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                            <option > Options </option>
                            <option value="autoriser-les-commentaires">Autoriser les commentaires</option>

                            <option value="ne-pas-autoriser-les-commentaires">Ne pas autoriser les commentaires</option>

                        </select>
                    </div>


                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
                                    {
                                        img.camera ? imageShow(img.camera, theme)
                                            : img.url
                                                ? <>
                                                    {
                                                        img.url.match(/video/i)
                                                            ? videoShow(img.url, theme)
                                                            : imageShow(img.url, theme)
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        img.type.match(/video/i)
                                                            ? videoShow(URL.createObjectURL(img), theme)
                                                            : imageShow(URL.createObjectURL(img), theme)
                                                    }
                                                </>
                                    }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{ display: 'none' }} />
                        </div>
                    }

                    <div className="input_images">
                        {
                            stream
                                ? <i className="fas fa-camera" onClick={handleCapture} />
                                : <>
                                    <i className="fas fa-camera" onClick={handleStream} />

                                    <div className="file_upload">
                                        <i className="fas fa-image" />
                                        <input type="file" name="file" id="file"
                                            multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    </div>
                                </>
                        }

                    </div>
                    <div className="status_footer">
                        <div>
                            <button className="btn btn-secondary w-100" type="submit"
                                disabled={bloquepost === 'bloque-post'}
                            > Envoiye
                            </button>

                        </div>
                    </div>



                </form>
            </div>
        </div>
    );
}
export default StatusModalservice