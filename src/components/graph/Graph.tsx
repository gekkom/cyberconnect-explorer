import React, { useContext } from "react";
import "@visdauas/react-sigma-v2/lib/react-sigma-v2.css";
import dynamic from "next/dynamic";
import useWindowDimensions from "./useWindowDimensions";
import { Settings } from "sigma/settings";
const SigmaContainer = dynamic(import("@visdauas/react-sigma-v2").then(mod => mod.SigmaContainer), { ssr: false });
const SocialGraph = dynamic(import("./SocialGraph").then(mod => mod.SocialGraph), { ssr: false });
import getNodeImageProgram from "sigma/rendering/webgl/programs/node.image";
import { GraphContext } from "../../context/GraphContext";

export const Graph = () => {
  const { width, height } = useWindowDimensions();
  const { graphLoading, hideGraph } = useContext(GraphContext);

  let w = width;
  let h = height;

  const settings: Partial<Settings> = {
    nodeProgramClasses: {
      image: getNodeImageProgram()
    }
  };
  if(graphLoading || hideGraph) {
    w = 1;
    h = 1;
  }

  return (
    <React.StrictMode>
      {w && h &&
        <SigmaContainer style={{ width: w / 5 * 3, height: h }}
          initialSettings={settings}>
          <SocialGraph />
        </SigmaContainer>
      }
    </React.StrictMode >
  );
}