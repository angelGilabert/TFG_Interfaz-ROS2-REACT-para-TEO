import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";


function Modelo_piernaIzq({ realAnglesLeftLeg, desiredAnglesLeftLeg, changing_value }) {
    const { nodes } = useGLTF("../3d_models/teo_leftLeg.glb");

    const main_mat = useMemo(() => nodes["AxialLeftHip"].material.clone(), []);
    const main_mat_transparent = useMemo(() => {
        const mat = nodes["AxialLeftHip"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);

    const second_mat = useMemo(() => nodes["FrontalLeftHip"].material.clone(), []);
    const second_mat_transparent = useMemo(() => {
        const mat = nodes["FrontalLeftHip"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);


    // Apunte:: en react-three las coordenadas son distntas que en blender: BlenderX= X  BlenderY= Z   BlenderZ= -Y  El eje z va al reves que en Blender  
    return (

        <group>

            {/* Mallas del pecho */}
            <mesh
                position={[0, 0.35, 0.046]}
                geometry={nodes["node"].geometry}
                material={nodes["node"].material.clone()}
            />


            {/* Brazo real */}
            <group position={[0, 0.35, -0.1]} rotation={[0, realAnglesLeftLeg[0], 0]}>
                <mesh
                    geometry={nodes["AxialLeftHip"].geometry}
                    material={main_mat}
                    visible={!changing_value}
                />
                <group position={[0, -0.092, 0]} rotation={[realAnglesLeftLeg[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalLeftHip"].geometry}
                        material={main_mat}
                        visible={!changing_value}
                    />
                    <group position={[0, 0, 0]} rotation={[0, 0, -realAnglesLeftLeg[2]]}>
                        <mesh
                            geometry={nodes["FrontalLeftHip"].geometry}
                            material={second_mat}
                            visible={!changing_value}
                        />
                        <group position={[0, -0.33, 0]} rotation={[0, 0, -realAnglesLeftLeg[3]]}>
                            <mesh
                                geometry={nodes["FrontalLeftKnee"].geometry}
                                material={second_mat}
                                visible={!changing_value}
                            />
                            <group position={[0, -0.3, 0.0175]} rotation={[0, 0, -realAnglesLeftLeg[4]]}>
                                <mesh
                                    geometry={nodes["FrontalLeftAnkle"].geometry}
                                    material={main_mat}
                                    visible={!changing_value}
                                />
                                <group position={[0, 0, 0]} rotation={[realAnglesLeftLeg[5], 0, 0]}>
                                    <mesh
                                        geometry={nodes["SagittalLeftAnkle"].geometry}
                                        material={main_mat}
                                        visible={!changing_value}
                                    />
                                    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                                        <mesh
                                            geometry={nodes["LeftFoot"].geometry}
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
            <group position={[0, 0.35, -0.1]} rotation={[0, desiredAnglesLeftLeg[0], 0]}>
                <mesh
                    geometry={nodes["AxialLeftHip"].geometry}
                    material={main_mat_transparent}
                />
                <group position={[0, -0.092, 0]} rotation={[desiredAnglesLeftLeg[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalLeftHip"].geometry}
                        material={main_mat_transparent}
                    />
                    <group position={[0, 0, 0]} rotation={[0, 0, -desiredAnglesLeftLeg[2]]}>
                        <mesh
                            geometry={nodes["FrontalLeftHip"].geometry}
                            material={second_mat_transparent}
                        />
                        <group position={[0, -0.33, 0]} rotation={[0, 0, -desiredAnglesLeftLeg[3]]}>
                            <mesh
                                geometry={nodes["FrontalLeftKnee"].geometry}
                                material={second_mat_transparent}
                            />
                            <group position={[0, -0.3, 0.0175]} rotation={[0, 0, -desiredAnglesLeftLeg[4]]}>
                                <mesh
                                    geometry={nodes["FrontalLeftAnkle"].geometry}
                                    material={main_mat_transparent}
                                />
                                <group position={[0, 0, 0]} rotation={[desiredAnglesLeftLeg[5], 0, 0]}>
                                    <mesh
                                        geometry={nodes["SagittalLeftAnkle"].geometry}
                                        material={main_mat_transparent}
                                    />
                                    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
                                        <mesh
                                            geometry={nodes["LeftFoot"].geometry}
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

export function Left_leg({ realAnglesLeftLeg, desiredAnglesLeftLeg, changing_value }) {
    return (
        <Canvas camera={{ zoom: 12, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <Modelo_piernaIzq realAnglesLeftLeg={realAnglesLeftLeg} desiredAnglesLeftLeg={desiredAnglesLeftLeg} changing_value={changing_value} />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}