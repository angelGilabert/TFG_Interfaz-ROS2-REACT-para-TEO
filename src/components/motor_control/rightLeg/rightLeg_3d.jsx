import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";


function Modelo_piernaDer({ realAnglesRightLeg, desiredAnglesRightLeg, changing_value }) {
    const { nodes } = useGLTF("../3d_models/teo_rightLeg.glb");

    const main_mat = useMemo(() => nodes["AxialRightHip"].material.clone(), []);
    const main_mat_transparent = useMemo(() => {
        const mat = nodes["AxialRightHip"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);

    const second_mat = useMemo(() => nodes["FrontalRightHip"].material.clone(), []);
    const second_mat_transparent = useMemo(() => {
        const mat = nodes["FrontalRightHip"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);


    // Apunte:: en react-three las coordenadas son distntas que en blender: BlenderX= X  BlenderY= Z   BlenderZ= -Y  El eje z va al reves que en Blender  
    return (

        <group>

            {/* Mallas del pecho */}
            <mesh
                position={[0, 0.35, -0.046]}
                geometry={nodes["node"].geometry}
                material={nodes["node"].material.clone()}
            />

            {/* Brazo real */}
            <group position={[0, 0.35, 0.1]} rotation={[0, realAnglesRightLeg[0], 0]}>
                <mesh
                    geometry={nodes["AxialRightHip"].geometry}
                    material={main_mat}
                    visible={!changing_value}
                />
                <group position={[0, -0.092, 0]} rotation={[realAnglesRightLeg[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalRightHip"].geometry}
                        material={main_mat}
                        visible={!changing_value}
                    />
                    <group position={[0, 0, 0]} rotation={[0, 0, -realAnglesRightLeg[2]]}>
                        <mesh
                            geometry={nodes["FrontalRightHip"].geometry}
                            material={second_mat}
                            visible={!changing_value}
                        />
                        <group position={[0, -0.33, 0]} rotation={[0, 0, -realAnglesRightLeg[3]]}>
                            <mesh
                                geometry={nodes["FrontalRightKnee"].geometry}
                                material={second_mat}
                                visible={!changing_value}
                            />
                            <group position={[0, -0.3, -0.0175]} rotation={[0, 0, -realAnglesRightLeg[4]]}>
                                <mesh
                                    geometry={nodes["FrontalRightAnkle"].geometry}
                                    material={main_mat}
                                    visible={!changing_value}
                                />
                                <group position={[0, 0, 0]} rotation={[realAnglesRightLeg[5], 0, 0]}>
                                    <mesh
                                        geometry={nodes["SagittalRightAnkle"].geometry}
                                        material={main_mat}
                                        visible={!changing_value}
                                    />
                                    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                                        <mesh
                                            geometry={nodes["RightFoot"].geometry}
                                            material={second_mat}
                                            visible={!changing_value}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>

            {/* Brazo fantasma (posición donde queremos mover) */}
            <group position={[0, 0.35, 0.1]} rotation={[0, desiredAnglesRightLeg[0], 0]}>
                <mesh
                    geometry={nodes["AxialRightHip"].geometry}
                    material={main_mat_transparent}
                />
                <group position={[0, -0.092, 0]} rotation={[desiredAnglesRightLeg[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalRightHip"].geometry}
                        material={main_mat_transparent}
                    />
                    <group position={[0, 0, 0]} rotation={[0, 0, -desiredAnglesRightLeg[2]]}>
                        <mesh
                            geometry={nodes["FrontalRightHip"].geometry}
                            material={second_mat_transparent}
                        />
                        <group position={[0, -0.33, 0]} rotation={[0, 0, -desiredAnglesRightLeg[3]]}>
                            <mesh
                                geometry={nodes["FrontalRightKnee"].geometry}
                                material={second_mat_transparent}
                            />
                            <group position={[0, -0.3, -0.0175]} rotation={[0, 0, -desiredAnglesRightLeg[4]]}>
                                <mesh
                                    geometry={nodes["FrontalRightAnkle"].geometry}
                                    material={main_mat_transparent}
                                />
                                <group position={[0, 0, 0]} rotation={[desiredAnglesRightLeg[5], 0, 0]}>
                                    <mesh
                                        geometry={nodes["SagittalRightAnkle"].geometry}
                                        material={main_mat_transparent}
                                    />
                                    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                                        <mesh
                                            geometry={nodes["RightFoot"].geometry}
                                            material={second_mat_transparent}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>

        </group>


    );
}

export function Right_leg({ realAnglesRightLeg, desiredAnglesRightLeg, changing_value }) {
    return (
        <Canvas camera={{ zoom: 12, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <Modelo_piernaDer realAnglesRightLeg={realAnglesRightLeg} desiredAnglesRightLeg={desiredAnglesRightLeg} changing_value={changing_value} />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}