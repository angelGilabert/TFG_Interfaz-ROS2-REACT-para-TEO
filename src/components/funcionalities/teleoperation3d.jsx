import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";


function Modelo_brazo({ realAnglesRightArm, desiredAnglesRightArm, changing_value, inverseKinVals, isDirecta }) {
    const { nodes } = useGLTF("../3d_models/teo3d.glb");

    const main_mat = useMemo(() => nodes["FrontalRightShoulder"].material.clone(), []);

    const second_mat = useMemo(() => nodes["FrontalRightWrist"].material.clone(), []);

    const pecho_mat = useMemo(() => nodes["node016"].material.clone(), []);
    const pecho_mat_transparent = useMemo(() => {
        const mat = nodes["node016"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);

    const origen = [0, 0, 0]





    // Apunte:: en react-three las coordenadas son distntas que en blender: BlenderX= X  BlenderY= Z   BlenderZ= -Y  El eje z va al reves que en Blender  
    return (

        <group>
            {/* Mallas del pecho */}
            <mesh
                position={[0, origen[1], origen[2]]}
                geometry={nodes["node"].geometry}
                material={nodes["node"].material.clone()}
            />

            <mesh
                position={[0, origen[1] + 0.1932, origen[2]]}
                geometry={nodes["node016"].geometry}
                material={nodes["node016"].material.clone()}
            />
            <mesh
                position={[0, origen[1] + 0.1932, origen[2]]}
                geometry={nodes["node015"].geometry}
                material={nodes["node015"].material.clone()}
            />

            {/* Cabeza */}
            <mesh
                position={[0, origen[1] + 0.6282, origen[2]]}
                geometry={nodes["AxialNeck"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] + 0.6607, origen[2]]}
                geometry={nodes["FrontalNeck"].geometry}
                material={second_mat}
            />

            {/* Pierna izq */}
            <mesh
                position={[0, origen[1], origen[2] - 0.146]}
                geometry={nodes["AxialLeftHip"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.092, origen[2] - 0.146]}
                geometry={nodes["SagittalLeftHip"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.092, origen[2] - 0.146]}
                geometry={nodes["FrontalLeftHip"].geometry}
                material={second_mat}
            />
            <mesh
                position={[0, origen[1] - 0.422, origen[2] - 0.146]}
                geometry={nodes["FrontalLeftKnee"].geometry}
                material={second_mat}
            />
            <mesh
                position={[0, origen[1] - 0.722, origen[2] - 0.1285]}
                geometry={nodes["SagittalLeftAnkle"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.722, origen[2] - 0.1285]}
                geometry={nodes["FrontalLeftAnkle"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.722, origen[2] - 0.1285]}
                geometry={nodes["LeftFoot"].geometry}
                material={second_mat}
            />

            {/* Pierna der */}
            <mesh
                position={[0, origen[1], origen[2] + 0.146]}
                geometry={nodes["AxialRightHip"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.092, origen[2] + 0.146]}
                geometry={nodes["SagittalRightHip"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.092, origen[2] + 0.146]}
                geometry={nodes["FrontalRightHip"].geometry}
                material={second_mat}
            />
            <mesh
                position={[0, origen[1] - 0.422, origen[2] + 0.146]}
                geometry={nodes["FrontalRightKnee"].geometry}
                material={second_mat}
            />
            <mesh
                position={[0, origen[1] - 0.722, origen[2] + 0.1285]}
                geometry={nodes["SagittalRightAnkle"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.722, origen[2] + 0.1285]}
                geometry={nodes["FrontalRightAnkle"].geometry}
                material={main_mat}
            />
            <mesh
                position={[0, origen[1] - 0.722, origen[2] + 0.1285]}
                geometry={nodes["RightFoot"].geometry}
                material={second_mat}
            />


            {/* Brazo real */}
            <group position={[0, origen[1] + 0.4982, origen[2] + 0.26292]} rotation={[0, 0, -realAnglesRightArm[0]]}>
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
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>


    );
}

export function Teleop3d({ realAnglesRightArm }) {
    return (
        <Canvas camera={{ zoom: 10, position: [10, 0, 7] }}>
            <ambientLight intensity={1} />
            <Modelo_brazo realAnglesRightArm={realAnglesRightArm} />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}