import Image from 'next/image';

export default function ProjectVisualV4({ project, compact=false, hideOrigin=false }){
  if(project.preview){
    return (
      <div className={`v5-project-visual is-image theme-${project.theme} ${compact?'is-compact':''}`}>
        <div className="v5-project-image-browser"><Image src={project.preview} alt={`Prévia visual do projeto ${project.name}`} fill quality={92} sizes={compact ? "(max-width: 760px) 92vw, 46vw" : "(max-width: 900px) 92vw, 55vw"} /></div>
        {!hideOrigin && !compact && <div className="v5-project-origin">{project.origin} · {project.tags[0]}</div>}
      </div>
    );
  }

  return (
    <div className={`v5-project-visual theme-${project.theme} ${compact?'is-compact':''}`} aria-hidden="true">
      <div className="v5-project-backword">{project.name}</div>
      <div className="v5-project-browser">
        <div className="v5-project-browser-top"><span/><span/><span/><small>{project.name.toLowerCase()} / webfun</small></div>
        <div className="v5-project-browser-body">
          <small>{project.kicker}</small>
          <strong>{project.meta}</strong>
          <p>{project.short}</p>
          <div className="v5-project-lines"><i/><i/><i/></div>
        </div>
      </div>
      <div className="v5-project-phone"><small>MOBILE</small><b>{project.tags[0]}</b><i/></div>
      {!hideOrigin && !compact && <div className="v5-project-origin">{project.origin} · {project.tags[0]}</div>}
    </div>
  );
}
