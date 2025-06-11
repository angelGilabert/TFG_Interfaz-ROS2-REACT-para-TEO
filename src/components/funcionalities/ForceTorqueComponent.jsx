import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';

import ROSLIB from 'roslib';

import Dygraph from 'dygraphs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

export function ForceTorque({ ros }) {

    const [wrenchStampedTopicNames, setWrenchStampedTopicNames] = useState([]);
    const [msgWrenchStampedTopicNames, setMsgWrenchStampedTopicNames] = useState([]);
    const [selectedWrenchStampedTopicName, setSelectedWrenchStampedTopicName] = useState();
    const [wrenchStampedTopicNamesJsx, setWrenchStampedTopicNamesJsx] = useState();
    const [topicFtsensor, setTopicFtsensor] = useState();
    const [refreshHz, setRefreshHz] = useState(20); // [Hz]
    const [timeMax, setTimeMax] = useState(5); // [s]
    const [forceMax, setForceMax] = useState(100); // [N]
    const [torqueMax, setTorqueMax] = useState(10); // [Nm]

    const [forceGraph, setForceGraph] = useState();
    const [torqueGraph, setTorqueGraph] = useState();

    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        ros.getTopicsForType("geometry_msgs/WrenchStamped", (got) => { setWrenchStampedTopicNames(got.filter(item => item !== "/undefined")) });
        ros.getTopicsForType("geometry_msgs/msg/WrenchStamped", (got) => { setMsgWrenchStampedTopicNames(got) });
    }, [ros]);

    useEffect(() => {
        const topicNames = [];
        topicNames.push(...wrenchStampedTopicNames);
        topicNames.push(...msgWrenchStampedTopicNames);
        setSelectedWrenchStampedTopicName(topicNames[0]);
        setWrenchStampedTopicNamesJsx(topicNames.map(topicName => <Dropdown.Item eventKey={topicName} key={topicName}>{topicName}</Dropdown.Item>));
    }, [wrenchStampedTopicNames, msgWrenchStampedTopicNames]);

    useEffect(() => {
        const d = new Date();
        setForceGraph(new Dygraph("forceGraph", [[d, 0.0, 0.0, 0.0]],
            {
                drawPoints: false,
                showRoller: false,
                valueRange: [-forceMax, forceMax],
                labels: ['Time', 'Fx [N]', 'Fy [N]', 'Fz [N]'],
                legend: 'always',
                labelsSeparateLines: true,
                labelsDiv: document.getElementById('forceStatus'),
            }));
    }, [forceMax, selectedWrenchStampedTopicName]);

    useEffect(() => {
        const d = new Date();
        setTorqueGraph(new Dygraph("torqueGraph", [[d, 0.0, 0.0, 0.0]],
            {
                drawPoints: false,
                showRoller: false,
                valueRange: [-torqueMax, torqueMax],
                labels: ['Time', 'Tx [Nm]', 'Ty [Nm]', 'Tz [Nm]'],
                legend: 'always',
                labelsSeparateLines: true,
                labelsDiv: document.getElementById('torqueStatus'),
            }));
    }, [torqueMax, selectedWrenchStampedTopicName]);

    useEffect(() => {
        setTopicFtsensor(new ROSLIB.Topic({
            ros: ros,
            name: selectedWrenchStampedTopicName,
            messageType: 'geometry_msgs/WrenchStamped'
        }));
    }, [ros, selectedWrenchStampedTopicName]);

    useEffect(() => {
        if (forceGraph === undefined) return;
        if (torqueGraph === undefined) return;
        if (topicFtsensor === undefined) return;

        if (!playing) return;

        var forceData = [];
        var torqueData = [];

        topicFtsensor.subscribe(function (message) {
            //console.log('Received message on ' + topicFtsensor.name + ': ' + message.wrench.force.x);
            const d = new Date();  // current time
            const F = message.wrench.force;
            const T = message.wrench.torque;
            forceData.push([d, F.x, F.y, F.z]);
            torqueData.push([d, T.x, T.y, T.z]);
        });

        const renderRefresh = setInterval(function () {
            var now = new Date();
            const threshold = new Date(now - timeMax * 1000.0);
            forceData = forceData.filter(item => {
                return item[0] > threshold;
            });
            torqueData = torqueData.filter(item => {
                return item[0] > threshold;
            });
            if (forceData.length > 0) {
                //console.log(forceData.length);
                forceGraph.updateOptions({ 'file': forceData });
            }
            if (torqueData.length > 0) {
                torqueGraph.updateOptions({ 'file': torqueData });
            }
        }, 1000.0 / refreshHz);

        return () => {
            clearInterval(renderRefresh);
            topicFtsensor.unsubscribe();
        }

    }, [topicFtsensor, refreshHz, timeMax, forceGraph, torqueGraph, playing]);

    return (
        <Container>
            <Row>
                <Col>
                    <h2 tabIndex="0">
                        Force/Torque
                    </h2>
                </Col>
            </Row>
            <Row className="g-3 mb-1">
                <Col>
                    <Dropdown onSelect={(selectedKey) => setSelectedWrenchStampedTopicName(selectedKey)}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {selectedWrenchStampedTopicName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {wrenchStampedTopicNamesJsx}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown onSelect={(selectedKey) => setRefreshHz(parseFloat(selectedKey))}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {refreshHz} Hz
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="2">2 Hz</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5 Hz</Dropdown.Item>
                            <Dropdown.Item eventKey="10">10 Hz</Dropdown.Item>
                            <Dropdown.Item eventKey="20">20 Hz</Dropdown.Item>
                            <Dropdown.Item eventKey="30">30 Hz</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown onSelect={(selectedKey) => setTimeMax(parseFloat(selectedKey))}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {timeMax} s
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">1 s</Dropdown.Item>
                            <Dropdown.Item eventKey="2">2 s</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5 s</Dropdown.Item>
                            <Dropdown.Item eventKey="10">10 s</Dropdown.Item>
                            <Dropdown.Item eventKey="15">15 s</Dropdown.Item>
                            <Dropdown.Item eventKey="30">30 s</Dropdown.Item>
                            <Dropdown.Item eventKey="45">45 s</Dropdown.Item>
                            <Dropdown.Item eventKey="60">60 s</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown onSelect={(selectedKey) => setForceMax(parseFloat(selectedKey))}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {forceMax} N
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">1</Dropdown.Item>
                            <Dropdown.Item eventKey="2">2</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5</Dropdown.Item>
                            <Dropdown.Item eventKey="10">10</Dropdown.Item>
                            <Dropdown.Item eventKey="25">25</Dropdown.Item>
                            <Dropdown.Item eventKey="50">50</Dropdown.Item>
                            <Dropdown.Item eventKey="100">100</Dropdown.Item>
                            <Dropdown.Item eventKey="150">150</Dropdown.Item>
                            <Dropdown.Item eventKey="200">200</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown onSelect={(selectedKey) => setTorqueMax(parseFloat(selectedKey))}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {torqueMax} Nm
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1">1</Dropdown.Item>
                            <Dropdown.Item eventKey="2">2</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5</Dropdown.Item>
                            <Dropdown.Item eventKey="10">10</Dropdown.Item>
                            <Dropdown.Item eventKey="25">25</Dropdown.Item>
                            <Dropdown.Item eventKey="50">50</Dropdown.Item>
                            <Dropdown.Item eventKey="100">100</Dropdown.Item>
                            <Dropdown.Item eventKey="150">150</Dropdown.Item>
                            <Dropdown.Item eventKey="200">200</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Button onClick={() => { setPlaying(!playing) }}>
                        {playing ?
                            <FontAwesomeIcon icon={faPause} /> :
                            <FontAwesomeIcon icon={faPlay} />}
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3" style={{ height: 450 }}>
                <Col xs={5}>
                    <div id="forceGraph"
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center'
                        }}>
                    </div>
                </Col>
                <Col xs={5}>
                    <div id="torqueGraph"
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center'
                        }}>
                    </div>
                </Col>
                <Col xs={2}>
                    <div id="forceStatus"></div>
                    <div id="torqueStatus"></div>
                </Col>
            </Row>
        </Container>
    );
}
