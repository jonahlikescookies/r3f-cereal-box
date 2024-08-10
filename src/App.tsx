import { Canvas, MeshProps } from "@react-three/fiber";
import { OrbitControls, Stats, Text, useTexture } from "@react-three/drei";
import { Leva, useControls, folder } from "leva";
import * as THREE from "three";

import { HiLightBulb, HiOutlineRefresh } from "react-icons/hi";
import { BsToggleOn } from "react-icons/bs";

import svgPath from "./assets/name.svg";
import cerealBowlSvgPath from "./assets/cereal-bowl.svg";
import nutritionLabelPath from "./assets/nutrition-label.png";
import topBoxDetailsSvgPath from "./assets/box-details-top.svg";
import boxBackSvgPath from "./assets/box-back.svg";

interface ImagePlaneProps extends MeshProps {
  url: string;
  planeGeometryArgs: [number, number];
}

function ImagePlane({ url, planeGeometryArgs, ...props }: ImagePlaneProps) {
  const [texture] = useTexture([url]);

  return (
    <>
      <mesh {...props} castShadow receiveShadow>
        <planeGeometry args={planeGeometryArgs} />
        <meshStandardMaterial attach="material" map={texture} transparent />
      </mesh>
    </>
  );
}

function App() {
  const { brightness, lightRotation, directionalLightOn } = useControls({
    "Ambient Light": folder({
      brightness: {
        value: 3.5,
        min: 0,
        max: 7,
        step: 0.1,
        label: (
          <div>
            <HiLightBulb /> Brightness
          </div>
        ),
      },
    }),
    "Directional Light": folder({
      lightRotation: {
        value: 235,
        min: 0,
        max: 360,
        step: 1,
        label: (
          <div>
            <HiOutlineRefresh /> Rotation
          </div>
        ),
      },
      directionalLightOn: {
        value: true,
        label: (
          <div>
            <BsToggleOn /> Enabled
          </div>
        ),
      },
    }),
  });

  return (
    <>
      <Canvas
        camera={{
          fov: 135,
          near: 0.1,
          far: 1000,
          position: [0, 8, 8],
        }}
        shadows
      >
        <ambientLight intensity={brightness} visible />
        <OrbitControls enablePan={false} enableDamping={true} />
        <directionalLight
          color="white"
          intensity={directionalLightOn ? 3.5 : 0}
          position={[
            -6 * Math.cos(THREE.MathUtils.degToRad(lightRotation)),
            4,
            -6 * Math.sin(THREE.MathUtils.degToRad(lightRotation)),
          ]}
          castShadow
        />
        {/* box */}
        <mesh
          position={[-3.5, 5.5, -3]}
          scale={[1, 11, 3]}
          castShadow
          receiveShadow
        >
          <boxGeometry />
          <meshStandardMaterial color="#d24c42" />
        </mesh>
        <mesh
          position={[3.5, 5.5, -3]}
          scale={[1, 11, 3]}
          castShadow
          receiveShadow
        >
          <boxGeometry />
          <meshStandardMaterial color="#d24c42" />
        </mesh>
        <mesh
          position={[0, 5.5, -3]}
          scale={[6, 11, 3]}
          castShadow
          receiveShadow
        >
          <boxGeometry />
          <meshStandardMaterial color="#ccc" />
        </mesh>
        <mesh
          position={[0, 11.5, -3]}
          scale={[8, 1, 3]}
          castShadow
          receiveShadow
        >
          <boxGeometry />
          <meshStandardMaterial color="#026a81" />
        </mesh>
        {/* text for box */}
        <Text
          position={[0, 11.5, -1.49]}
          fontSize={0.4}
          fontWeight={700}
          receiveShadow
          castShadow
        >
          7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84
          <meshStandardMaterial color="white" />
        </Text>
        <Text
          position={[0, 11.5, -4.52]}
          fontSize={0.4}
          rotation={[0, Math.PI, 0]}
          fontWeight={700}
          receiveShadow
          castShadow
        >
          7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84
          <meshStandardMaterial color="white" />
        </Text>
        <Text
          position={[4.01, 11.5, -3]}
          fontSize={0.4}
          rotation={[0, Math.PI / 2, 0]}
          fontWeight={700}
          receiveShadow
          castShadow
        >
          1, 2, 3, 4, 5, 6, 7
          <meshStandardMaterial color="white" />
        </Text>
        <Text
          position={[-4.01, 11.5, -3]}
          fontSize={0.4}
          rotation={[0, -Math.PI / 2, 0]}
          fontWeight={700}
          receiveShadow
          castShadow
        >
          1, 2, 3, 4, 5, 6, 7
          <meshStandardMaterial color="white" />
        </Text>
        <Text
          position={[-4.01, 5.5, -3]}
          maxWidth={2.8}
          fontSize={0.2}
          rotation={[0, -Math.PI / 2, 0]}
        >
          {`Setting:
Counting by 7s takes place in
a fictional version of
Bakersfield, CA, in the mid
2000s.
Conflict:
The conflict in Counting by 7s
is a man vs. self conflict.
Willow has to cope with the
loss of her parents, and
potentially leaving the
Nguyens for another family.
Plot/Summary:
Willow Chance, a 12 year-old
genius, has no friends going
into middle school. She only
gains popularity by getting a
perfect score on the state
test and getting sent to the
counselor, Dell Duke. One
day, Dell Duke takes Willow,
as well as Mai and Quang-ha
Nguyen around Bakersfield.
When Willow gets home, she
discovers that her parents
died. She stays with the
Nguyens at Happy Polish
Nails, and eventually the
Gardens of Glenwood.
Eventually, she has to go to a
different family. Pattie, Mai
and Quang-ha's mother,
found Jairo, Willow's taxi
driver, and they agreed on
taking in Willow. Pattie
secretly had money and plans
on buying the Gardens of
Glenwood.`}
          <meshStandardMaterial color="black" />
        </Text>
        {/* details for box */}
        <ImagePlane
          url={nutritionLabelPath}
          planeGeometryArgs={[2.8, (2.8 * 1489) / 820]}
          rotation={[0, Math.PI / 2, 0]}
          position={[4.01, 8.2, -3]}
          receiveShadow
          castShadow
        />
        <ImagePlane
          url={svgPath}
          planeGeometryArgs={[5.5, 5.5]}
          position={[0, 8, -1.49]}
          receiveShadow
          castShadow
        />
        <ImagePlane
          url={cerealBowlSvgPath}
          planeGeometryArgs={[5.5, 11 / 3]}
          position={[0, 3.4, -1.49]}
          receiveShadow
          castShadow
        />
        <ImagePlane
          url={topBoxDetailsSvgPath}
          planeGeometryArgs={[8, 1.7]}
          position={[0, 12.01, -3.65]}
          receiveShadow
          castShadow
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <ImagePlane
          url={boxBackSvgPath}
          planeGeometryArgs={[6, 10]}
          position={[0, 6, -4.51]}
          receiveShadow
          castShadow
          rotation={[0, Math.PI, 0]}
        />
        {/* floor */}
        <mesh position={[0, -1, 0]} scale={[24, 2, 24]} receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color="#2f2f30" />
        </mesh>
        s
        <mesh
          position={[11, 0.5, 11]}
          geometry={new THREE.DodecahedronGeometry(0.5)}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="red" wireframe />
        </mesh>
        <Stats />
      </Canvas>
      <Leva oneLineLabels titleBar={{ drag: false }} />
    </>
  );
}

export default App;
