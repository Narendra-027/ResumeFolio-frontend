import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import Axios from 'axios';
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";
import styles from "./Body.module.css";
import {Input, Tour} from 'antd';
import resumeSvg from "../../assets/resume.svg";
import { SERVER_ROUTE } from '../Config.js'
// import { downloadResumePDF } from './Sections/downLoadJSON';

function Body(props) {
  const { location } = props; // Destructure the location prop from the props object
  const { state } = location; // Destructure the state object from the location object
  const { resumeId, userId } = state; // Destructure the resumeId from the state object
  const [open, setOpen] = useState(false);
  const titelRef = useRef(null);
  const editorRef = useRef(null);
  const templatesRef = useRef(null);
  const themeRef = useRef(null);
  const resRef = useRef(null);
  const saveCahngeRef = useRef(null);
  const downloadRef = useRef(null);

  const steps = [
    {
      title: 'Title Section',
      description: 'This section allows you to set a name for your resume, helping you organize different versions easily.',
      target: () => titelRef.current,
    },
    {
      title: 'Resume Editor',
      description: 'This is the main editor where you can add, edit, and format your resume content.',
      target: () => editorRef.current,
    },
    {
      title: 'Template Selection',
      description: 'Choose from various pre-designed resume templates to change the structure and appearance of your resume.',
      target: () => templatesRef.current,
    },
    {
      title: 'Theme Customization',
      description: 'Adjust the color scheme of your resume to match your style or industry preferences.',
      target: () => themeRef.current,
    },
    {
      title: 'Live Resume Preview',
      description: 'This section provides a real-time preview of your resume.\nYou can rearrange sections by dragging and dropping.',
      placement: 'left',
      target: () => resRef.current,
    },
    {
      title: 'Save Button',
      description: 'Use this button to save your progress and ensure your changes are not lost.',
      target: () => saveCahngeRef.current,
    },
    {
      title: 'Download Option',
      description: 'Once your resume is finalized, download it in a suitable format for job applications.',
      target: () => downloadRef.current,
    },
  ];
  

  const templates = ["twoColumn", "oneColumn"];

  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Experience",
    project: "Projects",
    education: "Education",
    skill: "Skills",
    achievement: "Achievements",
    course: "Coursework",
    por : "Position of Responsibility",
  };
  const resumeRef = useRef();
  const [template, setTemplate] = useState(templates[0]);
  const [title, setTitle] = useState([]);
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.skill]: {
      id: sections.skill,
      sectionTitle: sections.skill,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.course]: {
      id: sections.course,
      sectionTitle: sections.course,
      points: [],
    },
    [sections.por]: {
      id: sections.por,
      sectionTitle: sections.por,
      points: [],
    },
  });

  useEffect(() =>{
    Axios.get(`${SERVER_ROUTE}/api/resume/resume_by_id?id=${resumeId}&type=single`, { withCredentials: true }).then(
      response =>{
        setTitle(response.data[0].title);
        setResumeInformation(response.data[0].resume);
      }
    )
  },[resumeId]);

  

  const onSave = ()=>{
    const variable = {
      resume: resumeInformation,
      userId: userId,
      title: title,
      resumeId: resumeId
    }
    Axios.post(`${SERVER_ROUTE}/api/resume/updateResume`, variable, { withCredentials: true })
      .then(response =>{
        if(response.data.success){
          alert("resume updated Successfully");
        }else{
          console.log("err: ", response.data);
          alert('Failed to update Resume');
        }
      })
  }
  return (
    <>
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button type="primary" onClick={() => setOpen(true)}>
          Begin Tour
        </button>
        <div ref={titelRef}>
          <Input
             placeholder="Borderless" 
             addonBefore="title"
             bordered={true} 
             value={title} 
             onChange={(event) => setTitle(event.target.value)}
            />

        </div>
        <div className={styles.download_data}>
          <button ref={saveCahngeRef} onClick={onSave} style={{}}>Save Changes</button>
          {/* <button onClick={downloadResumePDF}>DOwnload backend</button> */}
          <div ref={downloadRef}>
          <ReactToPrint
            trigger={() => {
              return (
                <button> Download </button>
              );
            }}
            content={() => resumeRef.current}
            pageStyle={`@page {size: 8.27in 11.69in;}`}
          />
          </div>
          {/* <button onClick={generatePDF}>Generate PDF</button> */}
        </div>
      </div>
      <div className={styles.main}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div ref={editorRef}>
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
          />
          </div>
          <img src={resumeSvg} alt="Resume" style={{width: '45vw'}} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" , width: '100%'}}>
          <div className={styles.resumeToolbar}>
            <div className={styles.templates} ref={templatesRef}>
            {templates.map((item) => (
                <button
                  key={item}
                  className={`${styles.templateButton} ${
                    template === item ? styles.active : ""
                  }`}
                  onClick={() => setTemplate(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.colors} ref={themeRef}>
              {colors.map((item) => (
                <span
                  key={item}
                  style={{ backgroundColor: item }}
                  className={`${styles.color} ${
                    activeColor === item ? styles.active : ""
                  }`}
                  onClick={() => setActiveColor(item)}
                />
              ))}
            </div>
          </div>
        <div ref={resRef}>
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
          template={template}
        />
        </div>
        </div>
      </div>
    </div>
    <Tour open={open} onClose={() => setOpen(false)} steps={steps} 
      indicatorsRender={(current, total) => (
        <span>
          {current + 1} / {total}
        </span>
      )}
    />
    </>
  );
}

export default Body;
