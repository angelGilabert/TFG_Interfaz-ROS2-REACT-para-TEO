import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";



function Modelo_brazoIzq({ realAnglesLeftArm, desiredAnglesLeftArm, changing_value, inverseKinVals, isDirecta }) {
    const { nodes } = useGLTF("../3d_models/teo3d.glb");

    const main_mat = useMemo(() => nodes["FrontalLeftShoulder"].material.clone(), []);
    const main_mat_transparent = useMemo(() => {
        const mat = nodes["FrontalLeftShoulder"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);

    const second_mat = useMemo(() => nodes["FrontalLeftWrist"].material.clone(), []);
    const second_mat_transparent = useMemo(() => {
        const mat = nodes["FrontalLeftWrist"].material.clone();
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
                position={[0, -0.005, 0.26292]}
                geometry={nodes["node016"].geometry}
                material={isDirecta ? pecho_mat : pecho_mat_transparent}
            />

            {/* Brazo real */}
            <group position={[0, 0.3, 0]} rotation={[0, 0, -realAnglesLeftArm[0]]}>
                <mesh
                    geometry={nodes["FrontalLeftShoulder"].geometry}
                    material={main_mat}
                    visible={!changing_value}
                />
                <group position={[0, 0, -0.084]} rotation={[realAnglesLeftArm[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalLeftShoulder"].geometry}
                        material={main_mat}
                        visible={!changing_value}
                    />
                    <group position={[0, -0.329, 0]} rotation={[0, realAnglesLeftArm[2], 0]}>
                        <mesh
                            geometry={nodes["AxialLeftShoulder"].geometry}
                            material={main_mat}
                            visible={!changing_value}
                        />
                        <group position={[0, 0, 0]} rotation={[0, 0, -realAnglesLeftArm[3]]}>
                            <mesh
                                geometry={nodes["FrontalLeftElbow"].geometry}
                                material={main_mat}
                                visible={!changing_value}
                            />
                            <group position={[0, -0.202, 0]} rotation={[0, realAnglesLeftArm[4], 0]}>
                                <mesh
                                    geometry={nodes["AxialLeftWrist"].geometry}
                                    material={main_mat}
                                    visible={!changing_value}
                                />
                                <group position={[0, 0, 0]} rotation={[0, 0, -realAnglesLeftArm[5]]}>
                                    <mesh
                                        geometry={nodes["FrontalLeftWrist"].geometry}
                                        material={second_mat}
                                        visible={!changing_value}
                                    />
                                    <mesh
                                        geometry={nodes["Wrist"].geometry}
                                        material={second_mat}
                                        visible={!changing_value}
                                    />
                                    <group position={[0, -0.31, 0]} rotation={[0, 1.57, 0]}>
                                        <mesh
                                            geometry={nodes["Cubo"].geometry}
                                            material={nodes["Cubo"].material}
                                            scale={[0.025, 0.025, 0.025]}
                                            visible={!isDirecta}
                                        />
                                        <mesh
                                            geometry={nodes["Cubo_1"].geometry}
                                            material={nodes["Cubo_1"].material}
                                            scale={[0.025, 0.025, 0.025]}
                                            visible={!isDirecta}
                                        />
                                        <mesh
                                            geometry={nodes["Cubo_2"].geometry}
                                            material={nodes["Cubo_2"].material}
                                            scale={[0.025, 0.025, 0.025]}
                                            visible={!isDirecta}
                                        />
                                        <mesh
                                            geometry={nodes["Cubo_3"].geometry}
                                            material={nodes["Cubo_3"].material}
                                            scale={[0.025, 0.025, 0.025]}
                                            visible={!isDirecta}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>

            {/* Brazo fantasma (posición donde queremos mover) */}
            <group position={[0, 0.3, 0]} rotation={[0, 0, -desiredAnglesLeftArm[0]]}>
                <mesh
                    geometry={nodes["FrontalLeftShoulder"].geometry}
                    material={main_mat_transparent}
                    visible={isDirecta}
                />
                <group position={[0, 0, -0.084]} rotation={[desiredAnglesLeftArm[1], 0, 0]}>
                    <mesh
                        geometry={nodes["SagittalLeftShoulder"].geometry}
                        material={main_mat_transparent}
                        visible={isDirecta}
                    />
                    <group position={[0, -0.329, 0]} rotation={[0, desiredAnglesLeftArm[2], 0]}>
                        <mesh
                            geometry={nodes["AxialLeftShoulder"].geometry}
                            material={main_mat_transparent}
                            visible={isDirecta}
                        />
                        <group position={[0, 0, 0]} rotation={[0, 0, -desiredAnglesLeftArm[3]]}>
                            <mesh
                                geometry={nodes["FrontalLeftElbow"].geometry}
                                material={main_mat_transparent}
                                visible={isDirecta}
                            />
                            <group position={[0, -0.202, 0]} rotation={[0, desiredAnglesLeftArm[4], 0]}>
                                <mesh
                                    geometry={nodes["AxialLeftWrist"].geometry}
                                    material={main_mat_transparent}
                                    visible={isDirecta}
                                />
                                <group position={[0, 0, 0]} rotation={[0, 0, -desiredAnglesLeftArm[5]]}>
                                    <mesh
                                        geometry={nodes["FrontalLeftWrist"].geometry}
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

            <group position={[0.015, -0.006 - 0.17252, 0.26292]}>
                <mesh
                    position={[inverseKinVals[0], inverseKinVals[2], -inverseKinVals[1]]}
                    rotation={[inverseKinVals[3], inverseKinVals[5], -inverseKinVals[4] + Math.PI]}
                    geometry={nodes["marker"].geometry}
                    material={marker_mat}
                    visible={!isDirecta}
                />
            </group>

            <group position={[0, -0.005, 0.26292]} rotation={[0, 1.57, 0]}>
                <mesh
                    geometry={nodes["Cubo"].geometry}
                    material={nodes["Cubo"].material}
                    scale={[0.025, 0.025, 0.025]}
                    visible={!isDirecta}
                />
                <mesh
                    geometry={nodes["Cubo_1"].geometry}
                    material={nodes["Cubo_1"].material}
                    scale={[0.025, 0.025, 0.025]}
                    visible={!isDirecta}
                />
                <mesh
                    geometry={nodes["Cubo_2"].geometry}
                    material={nodes["Cubo_2"].material}
                    scale={[0.025, 0.025, 0.025]}
                    visible={!isDirecta}
                />
                <mesh
                    geometry={nodes["Cubo_3"].geometry}
                    material={nodes["Cubo_3"].material}
                    scale={[0.025, 0.025, 0.025]}
                    visible={!isDirecta}
                />
            </group>
        </group>
    );
}

export function Left_arm({ realAnglesLeftArm, desiredAnglesLeftArm, changing_value, inverseKinVals, isDirecta }) {
    return (
        <Canvas camera={{ zoom: 12, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <Modelo_brazoIzq realAnglesLeftArm={realAnglesLeftArm} desiredAnglesLeftArm={desiredAnglesLeftArm} changing_value={changing_value} inverseKinVals={inverseKinVals} isDirecta={isDirecta} />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}