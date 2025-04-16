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
  const engins = model.scene.children[1];
  engins.visible = false;
  const aimation = useAnimations(model.animations, model.scene);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(7, 5, 0);
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
    });
  });

  useEffect(()=>{
    
    if(engin == null || !clones[engin]) return;

    const selected = clones[engin];
    
    if(Array.isArray(selected.actions)){
      selected.actions.forEach((action)=>{
        if(!direct == false){
          action.timeScale = speed /10;
        }else{
          action.timeScale = -speed /10;
        };

     

        if(start === true){
          action.play();
          action.paused = false;
          
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
    

  },[start, speed, direct , stop]);





  return (
    <>
    <OrbitControls minDistance={5} maxDistance={20}/>
    <Stage
    adjustCamera = {false}
    >
      <primitive object={model.scene}/>
    </Stage>
    </>
  )
}
