import { useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useNavigate } from 'react-router-dom';


const head_components = ["node003", "node001"];
const left_arm_components = ["node002", "node004", "node005", "node006", "node007", "node008"];
const right_arm_components = ["node009", "node010", "node011", "node012", "node013", "node014"];
const left_leg_components = ["node017", "node018", "node019", "node020", "node021", "node022", "node023"];
const right_leg_components = ["node024", "node025", "node026", "node027", "node028", "node029", "node030"];
const trunk_components = ["node", "node015", "node016"];


function ModeloRobot() {
    const { nodes } = useGLTF("../3d_models/teo3d.glb");
    const [select_part, setSelect_part] = useState(null);
    const navigate = useNavigate();

    const handleHover = (valor) => {
        setSelect_part(valor);
    };

    const handleClick = (valor) => {
        if (valor == 0) {
            navigate("/Head");
        } else if (valor == 1) {
            navigate("/LeftArm")
        } else if (valor == 2) {
            navigate("/RightArm")
        } else if (valor == 3) {
            navigate("/LeftLeg")
        } else if (valor == 4) {
            navigate("/RightLeg")
        } else if (valor == 5) {
            navigate("/Trunk")
        }
    };

    return (
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
                    onPointerOver={() => handleHover(1)} // Activar hover
                    onPointerOut={() => handleHover(-1)} // Desactivar hover
                    onClick={() => handleClick(1)}
                    material-color={select_part === 1 ? "orange" : nodes[part].material.color}
                />
            ))}
            {trunk_components.map((part, index) => (
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
            {right_arm_components.map((part, index) => (
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
            {left_leg_components.map((part, index) => (
                <mesh
                    key={index}
                    geometry={nodes[part].geometry}
                    position={nodes[part].position} // Mantener la posición original
                    material={nodes[part].material.clone()}
                    onPointerOver={() => handleHover(3)} // Activar hover
                    onPointerOut={() => handleHover(-1)} // Desactivar hover
                    onClick={() => handleClick(3)}
                    material-color={select_part === 3 ? "orange" : nodes[part].material.color}
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
    );
}

export function Teo_model() {
    return (
        <Canvas camera={{ zoom: 7.75, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <ModeloRobot />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, 10, 0]} intensity={1} />
        </Canvas>
    )
}