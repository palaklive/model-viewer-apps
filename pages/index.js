import Script from "next/script";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [material, setMaterial] = useState(null);
  const modelRef = React.useRef();

  useEffect(() => {
    modelRef.current.addEventListener("load", () => {
      const material = modelRef.current.model.materials[0];
      console.log("material", material);
      setMaterial(material);
    });
  }, []);

  const createAndApplyTexture = async (channel, event) => {
    const texture = await modelRef.current.createTexture(event.target.value);
    if (channel.includes("base") || channel.includes("metallic")) {
      material.pbrMetallicRoughness[channel].setTexture(texture);
    } else {
      material[channel].setTexture(texture);
    }
  };

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      />
      <model-viewer
        id="helmet"
        ref={modelRef}
        class="model-viewer"
        camera-controls
        src="assets/models/DamagedHelmet.glb"
        ar
        ar-modes="webxr scene-viewer quick-look"
        alt="A 3D model of a helmet"
      ></model-viewer>
      <div className="controls">
        <div>
          <p>Diffuse</p>
          <select
            id="diffuse"
            onChange={(event) =>
              createAndApplyTexture("baseColorTexture", event)
            }
          >
            <option id="normalTexture" value="assets/models/Default_albedo.jpg">
              Damaged helmet
            </option>
            <option value="assets/models/Lantern_baseColor.png">
              Lantern Pole
            </option>
            <option value="assets/models/WaterBottle_baseColor.png">
              Water Bottle
            </option>
          </select>
        </div>

        <div>
          <p>Metallic-roughness</p>
          <select
            id="metallicRoughness"
            onChange={(event) =>
              createAndApplyTexture("metallicRoughnessTexture", event)
            }
          >
            <option value="assets/models/Default_metalRoughness.jpg">
              Damaged helmet
            </option>
            <option value="assets/models//Lantern_roughnessMetallic.png">
              Lantern Pole
            </option>
            <option value="assets/models/WaterBottle_occlusionRoughnessMetallic.png">
              Water Bottle
            </option>
          </select>
        </div>
        <div></div>
      </div>
    </>
  );
}
