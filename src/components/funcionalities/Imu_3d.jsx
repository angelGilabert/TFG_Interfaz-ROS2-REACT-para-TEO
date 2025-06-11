import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";



function Modelo_Imu({ angles }) {
    const { nodes } = useGLTF("../3d_models/teo3d.glb");

    let angles_radx = angles[0] * (Math.PI / 180)
    let angles_rady = angles[1] * (Math.PI / 180)
    let angles_radz = angles[2] * (Math.PI / 180)




    // Apunte:: en react-three las coordenadas son distntas que en blender: BlenderX= X  BlenderY= Z   BlenderZ= -Y  El eje z va al reves que en Blender  
    return (
        <group position={[0, -0.1, 0]} rotation={[angles_radx, angles_radz + 1.57, - angles_rady - 3.15]}>
            <mesh
                geometry={nodes["Cubo"].geometry}
                material={nodes["Cubo"].material}
                scale={[0.07, 0.07, 0.07]}
            />
            <mesh
                geometry={nodes["Cubo_1"].geometry}
                material={nodes["Cubo_1"].material}
                scale={[0.07, 0.07, 0.07]}
            />
            <mesh
                geometry={nodes["Cubo_2"].geometry}
                material={nodes["Cubo_2"].material}
                scale={[0.07, 0.07, 0.07]}
            />
            <mesh
                geometry={nodes["Cubo_3"].geometry}
                material={nodes["Cubo_3"].material}
                scale={[0.07, 0.07, 0.07]}
            />
        </group>
    );
}

export function Imu3d({ angles }) {
    return (
        <Canvas camera={{ zoom: 22, position: [10, 0, 0] }}>
            <ambientLight intensity={1} />
            <Modelo_Imu angles={angles} />
            <directionalLight position={[10, 10, -10]} intensity={1} />
            <directionalLight position={[-10, -10, 0]} intensity={0.5} />
        </Canvas>
    )
}