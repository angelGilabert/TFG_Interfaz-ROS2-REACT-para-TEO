import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";


function Modelo_cabeza({ realAnglesHead, desiredAnglesHead, changing_value, movil_connected }) {
    const { nodes } = useGLTF("../3d_models/teo3d.glb");

    const main_mat = useMemo(() => nodes["AxialNeck"].material.clone(), []);
    const main_mat_transparent = useMemo(() => {
        const mat = nodes["AxialNeck"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);

    const second_mat = useMemo(() => nodes["FrontalNeck"].material.clone(), []);
    const second_mat_transparent = useMemo(() => {
        const mat = nodes["FrontalNeck"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);


    // Apunte:: en react-three las coordenadas son distntas que en blender: BlenderX= X  BlenderY= Z   BlenderZ= -Y  El eje z va al reves que en Blender  
    return (

        <group>
            <mesh
                position={[0, -0.285, 0]}
                geometry={nodes["node016"].geometry}
                material={nodes["node016"].material.clone()}
            />
            <mesh
                position={[0, -0.285, 0]}
                geometry={nodes["node015"].geometry}
                material={nodes["node015"].material.clone()}
            />

            {/* Brazo real */}
            <group position={[0, 0.15, 0]} rotation={[0, realAnglesHead[0], 0]}>
                <mesh
                    geometry={nodes["AxialNeck"].geometry}
                    material={main_mat}
                    visible={!changing_value}
                />
                <group position={[0, 0.0325, 0]} rotation={[0, 0, -realAnglesHead[1]]}>
                    <mesh
                        geometry={nodes["FrontalNeck"].geometry}
                        material={second_mat}
                        visible={!changing_value}
                    />
                </group>
            </group>

            {/* Brazo fantasma (posición donde queremos mover) */}
            <group position={[0, 0.15, 0]} rotation={[0, desiredAnglesHead[0], 0]}>
                <mesh
                    geometry={nodes["AxialNeck"].geometry}
                    material={main_mat_transparent}
                    visible={!movil_connected}
                />
                <group position={[0, 0.0325, 0]} rotation={[0, 0, -desiredAnglesHead[1]]}>
                    <mesh
                        geometry={nodes["FrontalNeck"].geometry}
                        material={second_mat_transparent}
                        visible={!movil_connected}
                    />
                </group>
            </group>
        </group>


    );
}

export function Head({ realAnglesHead, desiredAnglesHead, changing_value, movil_connected }) {
    return (
        <Canvas camera={{ zoom: 18, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <Modelo_cabeza realAnglesHead={realAnglesHead} desiredAnglesHead={desiredAnglesHead} changing_value={changing_value} movil_connected={movil_connected} />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}