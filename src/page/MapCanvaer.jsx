/* eslint-disable react-hooks/exhaustive-deps */
import { OrbitControls, Stage , useAnimations, useGLTF} from "@react-three/drei"
import { useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import * as THREE from "three";




export default function MapCanvaer({engineCount, speed, start, direct, engin , stop, len}) {

  

  const [initialPosition, setInitialPosition] = useState(null);
  const [clones, setClones] = useState([]);
  
 
  

  const model = useGLTF("/Canvaer.glb",);
  const engins = model.scene.children[2];
  
  
  console.log(model);
  
  const sensorA = model.scene.children[3];
  const sensorB = model.scene.children[4];
  const sensorC = model.scene.children[5];
  const sensorD = model.scene.children[6];
  const sensorE = model.scene.children[7];
  const sensorF = model.scene.children[8];
  






  engins.visible = false;
  const aimation = useAnimations(model.animations, model.scene);
  const { camera } = useThree();


  useEffect(() => {
    camera.position.set(0, 30, 100);
  }, [camera]);





  useEffect(()=>{
    if(engins && !initialPosition){
      setInitialPosition({
        position : engins.position.clone(),
        rotation : engins.rotation.clone(),
        scale : engins.scale.clone()
      });
    };

  },[engins])

  useEffect(()=>{

    const newClons = [];

    for(let i = 0; i < engineCount || i < len; i++){
      const clonEngin = clone(engins);
      clonEngin.position.copy(initialPosition.position);
      clonEngin.rotation.copy(initialPosition.rotation);
      clonEngin.scale.copy(initialPosition.scale);
      clonEngin.visible = true;
      model.scene.add(clonEngin);

      let actions = [];

      const loadMixer = new THREE.AnimationMixer(clonEngin);
      aimation.names.forEach((clipName)=>{
        const clip = aimation.actions[clipName].getClip();
        const action = loadMixer.clipAction(clip);

        actions.push(action);
      });

      newClons.push({object:clonEngin , mixer: loadMixer, actions});

    };

    setClones(newClons);


    return ()=>{
      newClons.forEach(({object})=>{
        model.scene.remove(object);
      })
    };

  },[engineCount, len]);

  useFrame((state, delta)=>{
    clones.forEach(({mixer})=>{
      mixer.update(delta);
      // console.log(delta);
    });
  });

  useEffect(()=>{
    
    if(engin == null || !clones[engin]) return;

    const selected = clones[engin];
   
    
    if(Array.isArray(selected.actions)){
      selected.actions.forEach((action)=>{
        if(!direct == false){
          action.timeScale = speed ;
        }else{
          action.timeScale = -speed ;
        };

     

        if(start === true){
          action.play();
          action.paused = false;
          console.log(clones[0].object.position);
          
        }
        if(stop === true ){
          action.paused = true;
          
        };

      

      });
    };



    clones.forEach((clone , index)=>{
      if(index !== engin){
        clone.object.position.copy(clone.object.position);
        clone.object.rotation.copy(clone.object.rotation);
        clone.object.scale.copy(clone.object.scale);
      };
    });
    

  },[start, speed, direct , stop, engin]);





  return (
    <>
    <OrbitControls/>
    <Stage
    adjustCamera = {false}
    >
      <primitive object={model.scene}/>
    </Stage>
    </>
  )
}
