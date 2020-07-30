import React, { useState } from 'react'
import { Form, Col, Row, Button, Container } from 'react-bootstrap'
import useForm from "./useForm";
import validate from "./validateForm";
import './CustomForm.css'


function CustomForm() {
    const [songName, setSongName] = useState("Choose a song");
    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        validate
    );

    function submit() {
        console.log("Submitted Succesfully");
    }

    const handleSongUploadPlaceholder = (e) => {
        let audioTrack = e.target.files[0];
        if (!audioTrack)
            return

        let audioTrackName = audioTrack.name;
        setSongName(audioTrackName);

        let reader = new FileReader();
        reader.readAsDataURL(audioTrack);
        reader.onload = () => {
            console.log(reader.result);
        };

    }

    const handleFileUpload = (e) => {
        handleSongUploadPlaceholder(e);
        handleChange(e);
    }

    return (
        <Container className='d-flex align-items-center'>
            <Row className='sa m-auto'>
                <Col className='left-child' md={6}>
                    <div className='companyMotto'>
                        <div className='companyMascot mb-2'></div>
                        <div className='welcome text-center '>Welcome To</div>
                        <div className='companyName h5 text-center '>SongDew</div>
                    </div>
                </Col>

                <Col md={6} className="p-4 right-child">
                    <div className='cassette mb-3'></div>
                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Group controlId="nameID">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={values.name}
                                onChange={handleChange}
                                name="name"
                                className={errors.name && "inputError"} />
                            {errors.name && <p className="error">{errors.name}</p>}

                        </Form.Group>

                        <Form.Group controlId="ageID">
                            <Form.Control
                                type="number"
                                placeholder="Age"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={values.age}
                                onChange={handleChange}
                                name="age"
                                className={errors.age && "inputError"}
                            />
                            {errors.age && <p className="error">{errors.age}</p>}

                        </Form.Group>

                        <Form.Group controlId="emailID">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={values.email}
                                onChange={handleChange}
                                name="email"
                                className={errors.email && "inputError"}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}

                        </Form.Group>


                        <Form.File
                            id="songFileID"
                            label={songName}
                            custom
                            accept=".mp3,.flac,.wav"
                            required
                            name="song"
                            onChange={handleFileUpload}
                            className={errors.song && "inputError"}
                        />
                        {errors.song && <p className="error">{errors.song}</p>}


                        <div className='d-flex justify-content-end mt-3'>
                            <Button type="submit" className='py-1'>Join Us</Button>
                        </div>

                    </Form>
                </Col>
            </Row>

        </Container>
    )
}

export default CustomForm