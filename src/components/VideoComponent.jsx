/*
import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Dropdown } from 'react-bootstrap';

function Video({ ros }) {

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
        setVideoTopicNamesJsx(topicNames.map(topicName => <Dropdown.Item eventKey={topicName} key={topicName}>{topicName}</Dropdown.Item>));
    }, [imageTopicNames, msgImageTopicNames]);

    return (
        <Container>

            <Row>
                <Col>
                    <h2 tabIndex="0">
                        Video
                    </h2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Dropdown onSelect={(selectedKey) => setSelectedVideoTopicName(selectedKey)}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {selectedVideoTopicName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {videoTopicNamesJsx}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
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
}

export default Video;
*/