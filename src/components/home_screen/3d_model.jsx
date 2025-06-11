import { useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useNavigate } from 'react-router-dom';


const head_components = ["FrontalNeck", "AxialNeck"];
const left_arm_components = ["FrontalLeftShoulder", "SagittalLeftShoulder", "AxialLeftShoulder", "FrontalLeftElbow", "AxialLeftWrist", "FrontalLeftWrist", "LeftFetch"];
const right_arm_components = ["FrontalRightShoulder", "SagittalRightShoulder", "AxialRightShoulder", "FrontalRightElbow", "AxialRightWrist", "FrontalRightWrist", "RightFetch"];
const left_leg_components = ["AxialLeftHip", "SagittalLeftHip", "FrontalLeftHip", "FrontalLeftKnee", "FrontalLeftAnkle", "SagittalLeftAnkle", "LeftFoot"];
const right_leg_components = ["AxialRightHip", "SagittalRightHip", "FrontalRightHip", "FrontalRightKnee", "FrontalRightAnkle", "SagittalRightAnkle", "RightFoot"];
const trunk_components = ["node", "node015", "node016"];


function ModeloRobot({ select_part, setSelect_part, handleClick }) {
    const { nodes } = useGLTF("../3d_models/teo3d.glb");

    const handleHover = (valor) => {
        setSelect_part(valor);
    };

    return (
        <>
            <group>
                {head_components.map((part, index) => (
                    <mesh
                        key={index}
                        geometry={nodes[part].geometry}
                        position={nodes[part].position} // Mantener la posición original
                        material={nodes[part].material.clone()}
                        onPointerOver={() => handleHover(0)} // Activar hover
                        onPointerOut={() => handleHover(-1)} // Desactivar hover
                        onClick={() => handleClick(0)}
                        material-color={select_part === 0 ? "orange" : nodes[part].material.color}

                    />
                ))}
                {left_arm_components.map((part, index) => (
                    <mesh
                        key={index + head_components.length}
                        geometry={nodes[part].geometry}
                        position={nodes[part].position} // Mantener la posición original
                        material={nodes[part].material.clone()}
                        onPointerOver={() => handleHover(3)} // Activar hover
                        onPointerOut={() => handleHover(-1)} // Desactivar hover
                        onClick={() => handleClick(3)}
                        material-color={select_part === 3 ? "orange" : nodes[part].material.color}
                    />
                ))}
                {trunk_components.map((part, index) => (
                    <mesh
                        key={index}
                        geometry={nodes[part].geometry}
                        position={nodes[part].position} // Mantener la posición original
                        material={nodes[part].material.clone()}
                        onPointerOver={() => handleHover(2)} // Activar hover
                        onPointerOut={() => handleHover(-1)} // Desactivar hover
                        onClick={() => handleClick(2)}
                        material-color={select_part === 2 ? "orange" : nodes[part].material.color}
                    />
                ))}
                {right_arm_components.map((part, index) => (
                    <mesh
                        key={index}
                        geometry={nodes[part].geometry}
                        position={nodes[part].position} // Mantener la posición original
                        material={nodes[part].material.clone()}
                        onPointerOver={() => handleHover(1)} // Activar hover
                        onPointerOut={() => handleHover(-1)} // Desactivar hover
                        onClick={() => handleClick(1)}
                        material-color={select_part === 1 ? "orange" : nodes[part].material.color}
                    />
                ))}
                {left_leg_components.map((part, index) => (
                    <mesh
                        key={index}
                        geometry={nodes[part].geometry}
                        position={nodes[part].position} // Mantener la posición original
                        material={nodes[part].material.clone()}
                        onPointerOver={() => handleHover(5)} // Activar hover
                        onPointerOut={() => handleHover(-1)} // Desactivar hover
                        onClick={() => handleClick(5)}
                        material-color={select_part === 5 ? "orange" : nodes[part].material.color}
                    />
                ))}
                {right_leg_components.map((part, index) => (
                    <mesh
                        key={index}
                        geometry={nodes[part].geometry}
                        position={nodes[part].position} // Mantener la posición original
                        material={nodes[part].material.clone()}
                        onPointerOver={() => handleHover(4)} // Activar hover
                        onPointerOut={() => handleHover(-1)} // Desactivar hover
                        onClick={() => handleClick(4)}
                        material-color={select_part === 4 ? "orange" : nodes[part].material.color}
                    />
                ))}
            </group>
        </>
    );
}

export function Teo_model() {

    const parts = [0, 1, 2, 3, 4, 5];
    const [select_part, setSelect_part] = useState(null);
    const navigate = useNavigate();

    const handleClick = (valor) => {
        if (valor == 0) {
            navigate("/Head");
        } else if (valor == 3) {
            navigate("/LeftArm")
        } else if (valor == 1) {
            navigate("/RightArm")
        } else if (valor == 5) {
            navigate("/LeftLeg")
        } else if (valor == 4) {
            navigate("/RightLeg")
        } else if (valor == 2) {
            navigate("/Trunk")
        }
    };


    return (
        <>
            <Canvas camera={{ zoom: 8.3, position: [10, 0, 0] }}>
                <ambientLight intensity={1} />
                <ModeloRobot select_part={select_part} setSelect_part={setSelect_part} handleClick={handleClick} />
                <OrbitControls enableZoom={false} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <directionalLight position={[-10, 10, 0]} intensity={1} />
            </Canvas>
            {
                parts.map((i) => (
                    <button
                        key={i}
                        className="invisible-button"
                        onFocus={() => setSelect_part(i)}
                        onBlur={() => { setSelect_part(null) }}
                        onClick={() => handleClick(i)}
                    >
                    </button>
                ))
            }
        </>
    )
}