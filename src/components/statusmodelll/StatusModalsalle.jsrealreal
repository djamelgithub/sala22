import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

import { createPostPendiente } from '../../redux/actions/postaproveAction'
import { updatePost } from '../../redux/actions/postAction';


import communesjson from "../../json/communes.json";

import { Form, InputGroup } from 'react-bootstrap';
import { imageShow, videoShow } from '../../utils/mediaShow'
import Slider from 'rc-slider';

import Select from 'react-select';
const names = [
    'Mariages (حفلات الزفاف)',
    'Fiançailles (خطبة)',
    '3akika (عقيقة)',
    'Circoncision-khtana (الختان)',
    'Baptêmes (التعميد)',
    'Anniversaires (الذكرى)',
    'Diplômes (التخرج)',
    'Fêtes d\'anniversaire (حفلات عيد الميلاد)',
    'Réunions familiales (اجتماعات عائلية)',
    'Événements d\'entreprise (أحداث الشركات)',
    'Conférences (المؤتمرات)',
    'Séminaires (الندوات)',
    'Réunion (الاجتماع)',
    'Expositions (المعارض)',
    'Salle (القاعة)',
    'Fêtes (الاحتفالات)',
    'Dîner (العشاء)',
    'Buffet (البوفيه)',
    'Cafétéria (المقهى)',
];

const datos = names.map(name => {
    return { value: name, label: name };
});


const StatusModalsalle = ({ closeModal }) => {

    const { auth, theme, status, socket } = useSelector(state => state)
    const { user } = useSelector(state => state.auth);
    const { bloquepost } = user;

    const dispatch = useDispatch()

    const initialState = { content: '',   discripcion: '', price: '', dinero: '', negociable: '', wilaya: '', commune: '', nomprenom: '', telefono: '', email: '' , privacidad_informations: '', privacidad_commentarios: '' }

    const [postData, setPostdata] = useState(initialState);
    const [images, setImages] = useState([])
    const { specifications } = postData;
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



    const [selectedOptions, setSelectedOptions] = useState({});



    const handleChangeSelect = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setPostdata({ ...postData, specifications: selectedValues });
    };



    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOptions({
            ...selectedOptions,
            [selectedValue]: selectedOptions[selectedValue] || '',
        });
    };

    const handleInputChange = (event, selectedValue) => {
        const inputText = event.target.value;
        setSelectedOptions({
            ...selectedOptions,
            [selectedValue]: inputText,
        });
    };





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
            setPostdata({ ...postData, [e]: value });
        } else {
            // Manejar los selects
            const { name, value } = e.target;
            setPostdata({ ...postData, [name]: value });
        }
    };








    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Veuillez ajouter votre photo.' },
            });



        if (status.onEdit) {
            dispatch(updatePost({ postData, specifications, wilaya: selectedWilaya, commune: selectedCommune, images, auth, status }));
        } else {
            dispatch(createPostPendiente({ postData, specifications, wilaya: selectedWilaya, commune: selectedCommune, images, auth, socket }));
        }


        setPostdata({
            content: '', selectedOptions: [], discripcion: '', price: '', dinero: '', negociable: '', wilaya: '', commune: '', nomprenom: '', telefono: '', email: '', specifications: [], privacidad_informations: '', privacidad_commentarios: ''
        });
        setImages([]);
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
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
        if (status.onEdit) {


            setPostdata({ ...status, selectedOptions: status.selectedOptions, specifications: status.specifications });
            setImages(status.images);

            setSelectedWilaya(status.wilaya)
            setSelectedCommune(status.commune)

        }
    }, [status])








    return (


        <div className="status_modal">
            <div className="status_body">


                <form onSubmit={handleSubmit}>

                    <div className="status_header">
                        <h5 className="m-0">Ajouter votre Annonces Salle des fêtes</h5>
                        <span onClick={() => dispatch({
                            type: GLOBALTYPES.STATUS, payload: false
                        })}>
                            <span onClick={closeModal}>&times;</span>
                        </span>
                    </div>





                    <div className="form-group" >
                          <input type="hidden" name="content" value={postData.sala}  />

                    </div>


                    <div>
                        <Form.Select aria-label="Default select example" onChange={handleSelectChange} value={postData.selectedOptions}>



                            <option>Open this select menu</option>
                            <option value="capacidad">Capacité</option>
                            <option value="restaurante">Restaurant</option>
                            <option value="invitados">Hébergement pour invités</option>
                            <option value="recipcion">Réception</option>
                            <option value="decoracion">Décoration</option>
                            <option value="musica">Musique et Divertissement</option>
                            <option value="decoracion">Décoration</option>
                            <option value="parking">Parkings</option>
                            <option value="disponibilidad">Disponibilité dans l'année</option>
                            <option value="promocion">Promotion</option>
                        </Form.Select>

                        {Object.keys(selectedOptions).map((key) => (
                            <InputGroup className="mt-3" key={key}>
                                <InputGroup.Text>{`User Input for ${key}`}</InputGroup.Text>
                                <Form.Control
                                    as="textarea"
                                    placeholder={`Enter your input for ${key}`}
                                    value={selectedOptions[key]}
                                    onChange={(event) => handleInputChange(event, key)}
                                />
                            </InputGroup>
                        ))}
                    </div>




                    <br></br>




                    <div className="form-group">
                        <div>
                            <Select
                                isDisabled={bloquepost === 'bloque-post'}

                                placeholder="Événements de la Salle"
                                value={datos.filter(obj => postData.specifications && postData.specifications.includes(obj.value))}
                                options={datos}
                                onChange={handleChangeSelect}
                                isMulti
                                closeMenuOnSelect={false}
                            />
                        </div>

                    </div>

                    <br></br>

                    <div className="card-body form-group">
                        <label className="text-danger">Sélectionner Prix pour Milions Cm: </label>
                        <Slider
                            min={5}
                            max={300}
                            step={5}
                            value={postData.price}
                            onChange={(value) => {
                                handleChangeInput('price', value);
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
                            prix: {postData.price} Milions Cm
                        </div>



                        <br></br>

                        <div className="form-group" >
                            <select onChange={(e) => handleChangeInput(e)} value={postData.dinero.someProperty} name="dinero" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                <option > Devis de vente</option>
  <option value="Millions Centimes" > Millions Centimes </option>
                                <option value="Dinars" disabled >Dinars</option>
                            </select>
                        </div>
                        <div>
                            <select onChange={(e) => handleChangeInput(e)} value={postData.negociable.someProperty} name="negociable" placeholder="Negociable" className="form-control" disabled={bloquepost === 'bloque-post'} >
                                <option > Négociation:</option>
                                <option value="Négociable" > Négociable</option>
                                <option value="Fixe">Fixe</option>
                                <option value="Offert">Offert</option>

                            </select>
                        </div>
                    </div>
                    <br></br>

                    <label className="text-danger">Description: </label>
                    <textarea name="discripcion" value={postData.discripcion}
                        onChange={(e) => handleChangeInput(e)}
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            background: theme ? 'rgba(0,0,0,.03)' : '',

                        }}
                        disabled={bloquepost === 'bloque-post'}
                    />



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
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Nom et Prénom" value={postData.nomprenom} name="nomprenom" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>


                    <div className="form-group  ">
                        <label className="text-danger">Numéro de téléphone :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Téléphone" value={postData.telefono} name="telefono" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>


                    <div className="form-group  ">
                        <label className="text-danger">Email :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Email" value={postData.email} name="email" type="email" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>

                    <br></br>

                    <div className="form-group" >
                        <label className="text-danger">Options d'informations personnelles:</label>
                        <select onChange={(e) => handleChangeInput(e)} value={postData.privacidad_informations.someProperty} name="privacidad_informations" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                            <option > Options  </option>
                            <option value="autoriser-les-informations">Autoriser les informations</option>
                            <option value="ne-pas-autoriser-les-informations">Ne pas autoriser les informations</option>

                        </select>
                    </div>
                    <div className="form-group" >
                        <label className="text-danger">Options des commentaires:</label>
                        <select onChange={(e) => handleChangeInput(e)} value={postData.privacidad_commentarios.someProperty} name="privacidad_commentarios" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
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

export default StatusModalsalle


















