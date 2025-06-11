import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";



function Tronco({ realAnglesTrunk, desiredAnglesTrunk, changing_value }) {
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

    const third_mat = useMemo(() => nodes["node016"].material.clone(), []);
    const third_mat_transparent = useMemo(() => {
        const mat = nodes["node016"].material.clone();
        mat.transparent = true;
        mat.opacity = 0.4;
        return mat;
    }, []);




    // Apunte:: en react-three las coordenadas son distntas que en blender: BlenderX= X  BlenderY= Z   BlenderZ= -Y  El eje z va al reves que en Blender  
    return (

        <group>

            <mesh
                geometry={nodes["node"].geometry}
                position={[0, -0.3, 0]}
                material={nodes["node"].material.clone()}
            />

            {/* Real Axial Trunk*/}
            <group position={[0, -0.1068, 0]} rotation={[0, realAnglesTrunk[0], 0]}>
                <mesh
                    geometry={nodes["node015"].geometry}
                    material={main_mat}
                    visible={!changing_value}
                />
                {/* Frontal Trunk*/}
                <group position={[0, 0, 0]} rotation={[0, 0, -realAnglesTrunk[1]]}>
                    <mesh
                        geometry={nodes["node016"].geometry}
                        material={third_mat}
                        visible={!changing_value}
                    />
                    <group position={[0, 0.435, 0]} rotation={[0, 0, 0]}>
                        <mesh
                            geometry={nodes["AxialNeck"].geometry}
                            material={main_mat}
                            visible={!changing_value}
                        />
                        <group position={[0, 0.0325, 0]} rotation={[0, 0, 0]}>
                            <mesh
                                geometry={nodes["FrontalNeck"].geometry}
                                material={second_mat}
                                visible={!changing_value}
                            />
                        </group>
                    </group>
                </group>
            </group>


            {/* Axial Trunk*/}
            <group position={[0, -0.1068, 0]} rotation={[0, desiredAnglesTrunk[0], 0]}>
                <mesh
                    geometry={nodes["node015"].geometry}
                    material={main_mat_transparent}
                />
                {/* Frontal Trunk*/}
                <group position={[0, 0, 0]} rotation={[0, 0, -desiredAnglesTrunk[1]]}>
                    <mesh
                        geometry={nodes["node016"].geometry}
                        material={third_mat_transparent}
                    />
                    <group position={[0, 0.435, 0]} rotation={[0, 0, 0]}>
                        <mesh
                            geometry={nodes["AxialNeck"].geometry}
                            material={main_mat_transparent}
                        />
                        <group position={[0, 0.0325, 0]} rotation={[0, 0, 0]}>
                            <mesh
                                geometry={nodes["FrontalNeck"].geometry}
                                material={second_mat_transparent}
                            />
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
}

export function Trunk({ realAnglesTrunk, desiredAnglesTrunk, changing_value }) {
    return (
        <Canvas camera={{ zoom: 12.75, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <Tronco realAnglesTrunk={realAnglesTrunk} desiredAnglesTrunk={desiredAnglesTrunk} changing_value={changing_value} />
            <OrbitControls enableZoom={false} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}