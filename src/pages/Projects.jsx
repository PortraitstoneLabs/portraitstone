import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import { Unity, useUnityContext } from "react-unity-webgl";

const Projects = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/Build.loader.js",
    dataUrl: "build/Build.data",
    frameworkUrl: "build/Build.framework.js",
    codeUrl: "build/Build.wasm",
  });

  const projectsRef = useRef(null);

  useEffect(() => {
    const checkElement = () => {
      const element = projectsRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        console.log(rect);
      } else {
        console.error('Element not found');
      }
    };

    // Using requestAnimationFrame
    requestAnimationFrame(checkElement);

    // Optional: Add a resize event listener
    window.addEventListener('resize', checkElement);
    return () => {
      window.removeEventListener('resize', checkElement);
    };
  }, []);

  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Projects{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Network
        </span>
      </h1>

      <p className='text-slate-500 mt-2 leading-relaxed'>
        Your collaboration is highly valued!
      </p>

      <div className='flex flex-wrap my-20 gap-16' ref={projectsRef}>
        {projects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={project.iconUrl}
                  alt='project icon'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>{project.description}</p>
              <div className='mt-5 flex items-center gap-2 font-poppins'>
                <Link
                  to={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-blue-600'
                >
                  Live Link
                </Link>
                <img
                  src={arrow}
                  alt='arrow'
                  className='w-4 h-4 object-contain'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Unity
        style={{
          width: "100%",
          justifySelf: "center",
          alignSelf: "center",
        }}
        unityProvider={unityProvider}
      />

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;
