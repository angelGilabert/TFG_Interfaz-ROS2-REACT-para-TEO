
import React, { useState, useEffect } from 'react';
import { CustomDropdown } from '../elements/dropdown';


export function Video({ ros }) {

    const [imageTopicNames, setImageTopicNames] = useState([]);
    const [msgImageTopicNames, setMsgImageTopicNames] = useState([]);
    const [selectedVideoTopicName, setSelectedVideoTopicName] = useState();
    const [videoTopicNamesJsx, setVideoTopicNamesJsx] = useState();

    useEffect(() => {
        ros.getTopicsForType("sensor_msgs/Image", (got) => { setImageTopicNames(got.filter(item => item !== "/undefined")) });
        ros.getTopicsForType("sensor_msgs/msg/Image", (got) => { setMsgImageTopicNames(got) });
    }, [ros]);

    useEffect(() => {
        const topicNames = [];
        topicNames.push(...imageTopicNames);
        topicNames.push(...msgImageTopicNames);
        setSelectedVideoTopicName(topicNames[0]);
        setVideoTopicNamesJsx(topicNames);
    }, [imageTopicNames, msgImageTopicNames]);

    return (

        <main style={{ display: 'block', backgroundColor: '#DDEEFF' }}>

            <div id='dropdown' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', gap: '1rem', backgroundColor: '#DDEEFF' }}>

                <h1 style={{ margin: '0' }}>Video</h1>

                <CustomDropdown actual_state={selectedVideoTopicName} setState={setSelectedVideoTopicName} states={videoTopicNamesJsx == null ? ["Camara desconectada"] : videoTopicNamesJsx} padding={'0px'}
                    style={{
                        padding: '10px 20px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        width: '175px',
                        height: '45px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: '425px'
                    }}
                />

                <img
                    src={"http://localhost:8080/stream?topic=" + selectedVideoTopicName}
                    alt={"Image from http://localhost:8080/stream?topic=" + selectedVideoTopicName}
                    style={{ width: '600px', objectFit: 'cover' }} />

                <p> Also see:&nbsp;
                    <a
                        href="http://localhost:8080"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        http://localhost:8080
                    </a>
                </p>


            </div>
        </main >
    );
}












/*







        <Container>


            
            <Row>
                <Col>
                    <img
                        src={"http://localhost:8080/stream?topic=" + selectedVideoTopicName}
                        alt={"Image from http://localhost:8080/stream?topic=" + selectedVideoTopicName} />
                </Col>
            </Row>

            <Row className="mt-3 mb-5">
                <Col>
                    Also see:&nbsp;<a href={"http://localhost:8080"} target="_blank" rel="noopener noreferrer">{"http://localhost:8080"}</a>
                </Col>
            </Row>
            <Row className="mt-5 mb-5"></Row>

        </Container>
    );
} */
