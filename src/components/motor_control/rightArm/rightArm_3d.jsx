import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";


function Modelo_brazoDer({ realAnglesRightArm, desiredAnglesRightArm, changing_value, inverseKinVals, isDirecta }) {
    const { nodes } = useGLTF("../3d_models/teo3d.glb");

    const main_mat = useMemo(() => nodes["FrontalRightShoulder"].material.clone(), []);
    const main_mat_transparent = useMemo(() => {
        const mat = nodes["FrontalRightShoulder"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);

    const second_mat = useMemo(() => nodes["FrontalRightWrist"].material.clone(), []);
    const second_mat_transparent = useMemo(() => {
        const mat = nodes["FrontalRightWrist"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);

    const marker_mat = useMemo(() => {
        const mat = nodes["marker"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.7;
        return mat;
    }, []);

    const pecho_mat = useMemo(() => nodes["node016"].material.clone(), []);
    const pecho_mat_transparent = useMemo(() => {
        const mat = nodes["node016"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);



    // Apunte:: en react-three las coordenadas son distntas que en blender: BlenderX= X  BlenderY= Z   BlenderZ= -Y  El eje z va al reves que en Blender  
    return (

        <group>
            {/* Mallas del pecho */}
            <mesh
                position={[0, -0.005, -0.14292]}
                geometry={nodes["node016"].geometry}
                material={nodes["node016"].material.clone()}
            />
            <mesh
                position={[0, -0.005, -0.14292]}
                geometry={nodes["node015"].geometry}
                material={nodes["node015"].material.clone()}
            />

            {/* Brazo real */}
            <group position={[0, 0.3, 0.12]} rotation={[0, 0, -realAnglesRightArm[0]]}>
                <mesh
                    geometry={nodes["FrontalRightShoulder"].geometry}
                    material={main_mat}
                    visible={!changing_value}
                />
                <group position={[0, 0, 0.084]} rotation={[realAnglesRightArm[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalRightShoulder"].geometry}
                        material={main_mat}
                        visible={!changing_value}
                    />
                    <group position={[0, -0.329, 0]} rotation={[0, realAnglesRightArm[2], 0]}>
                        <mesh
                            geometry={nodes["AxialRightShoulder"].geometry}
                            material={main_mat}
                            visible={!changing_value}
                        />
                        <group position={[0, 0, 0]} rotation={[0, 0, -realAnglesRightArm[3]]}>
                            <mesh
                                geometry={nodes["FrontalRightElbow"].geometry}
                                material={main_mat}
                                visible={!changing_value}
                            />
                            <group position={[0, -0.202, 0]} rotation={[0, realAnglesRightArm[4], 0]}>
                                <mesh
                                    geometry={nodes["AxialRightWrist"].geometry}
                                    material={main_mat}
                                    visible={!changing_value}
                                />
                                <group position={[0, 0, 0]} rotation={[0, 0, -realAnglesRightArm[5]]}>
                                    <mesh
                                        geometry={nodes["FrontalRightWrist"].geometry}
                                        material={second_mat}
                                        visible={!changing_value}
                                    />
                                    <mesh
                                        geometry={nodes["Wrist"].geometry}
                                        material={second_mat}
                                        visible={!changing_value}
                                    />
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>

            {/* Brazo fantasma (posición donde queremos mover) */}
            <group position={[0, 0.3, 0.12]} rotation={[0, 0, -desiredAnglesRightArm[0]]}>
                <mesh
                    geometry={nodes["FrontalRightShoulder"].geometry}
                    material={main_mat_transparent}
                    visible={isDirecta}
                />
                <group position={[0, 0, 0.084]} rotation={[desiredAnglesRightArm[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalRightShoulder"].geometry}
                        material={main_mat_transparent}
                        visible={isDirecta}
                    />
                    <group position={[0, -0.329, 0]} rotation={[0, desiredAnglesRightArm[2], 0]}>
                        <mesh
                            geometry={nodes["AxialRightShoulder"].geometry}
                            material={main_mat_transparent}
                            visible={isDirecta}
                        />
                        <group position={[0, 0, 0]} rotation={[0, 0, -desiredAnglesRightArm[3]]}>
                            <mesh
                                geometry={nodes["FrontalRightElbow"].geometry}
                                material={main_mat_transparent}
                                visible={isDirecta}
                            />
                            <group position={[0, -0.202, 0]} rotation={[0, desiredAnglesRightArm[4], 0]}>
                                <mesh
                                    geometry={nodes["AxialRightWrist"].geometry}
                                    material={main_mat_transparent}
                                    visible={isDirecta}
                                />
                                <group position={[0, 0, 0]} rotation={[0, 0, -desiredAnglesRightArm[5]]}>
                                    <mesh
                                        geometry={nodes["FrontalRightWrist"].geometry}
                                        material={second_mat_transparent}
                                        visible={isDirecta}
                                    />
                                    <mesh
                                        geometry={nodes["Wrist"].geometry}
                                        material={second_mat_transparent}
                                        visible={isDirecta}
                                    />
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>

            <group position={[0, -0.231 - 0.097 + 0.23, -0.084 + 0.35]}>
                <mesh
                    position={[inverseKinVals[0], inverseKinVals[2], -inverseKinVals[1]]}
                    rotation={[inverseKinVals[3], inverseKinVals[5], -inverseKinVals[4]]}
                    geometry={nodes["marker"].geometry}
                    material={marker_mat}
                    visible={!isDirecta}
                />
            </group>

        </group>


    );
}

export function Right_arm({ realAnglesRightArm, desiredAnglesRightArm, changing_value, inverseKinVals, isDirecta }) {
    return (
        <Canvas camera={{ zoom: 12, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <Modelo_brazoDer realAnglesRightArm={realAnglesRightArm} desiredAnglesRightArm={desiredAnglesRightArm} changing_value={changing_value} inverseKinVals={inverseKinVals} isDirecta={isDirecta} />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}