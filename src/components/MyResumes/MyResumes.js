import React,{ useState, useEffect }from 'react'
import {Table, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import resumeData from './Sections/DefaultResume.json';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import resumeSvg from "../../assets/resume.svg";
import { SERVER_ROUTE } from '../Config.js'

function MyResumes(props) {
    const [resumeDefault, setResumeDefault] = useState(resumeData);
    const [resumeList, setResumeList] = useState([]);
    const getFormattedDate = (value) => {
      if (!value) return "";
      const date = new Date(value);
  
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    };
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'titel',
          render: (text) => <p>{text}</p>,
        },
        {
          title: 'Last Modified',
          dataIndex: 'last_modified',
          key: 'last_modified',
          render: (text) => <p>{getFormattedDate(text)}</p>,
        },
    ]

    const handleAddNew = () => {
        setResumeDefault(resumeData);
        const variable = {
            resume: resumeDefault,
        }
        Axios.post(`${SERVER_ROUTE}/api/resume/uploadResume`, variable, { withCredentials: true })
        .then(response1 =>{
          if(response1.data.success){
              Axios.post(`${SERVER_ROUTE}/api/users/addResume`,{userId: props.user.userData._id, resumeId: response1.data.id}, { withCredentials: true })
              .then(response2 =>{
                  if(response2.data.success){
                    props.history.push({
                      pathname: "/body",
                      state: { resumeId: response1.data.id,
                               userId: props.user.userData._id } //
                    });
                  }else{
                    alert('Failed to add Resume to user');
                  }
              })
          }else{
              alert('Failed to create Resume');
          }
        })
    }

    const compareByDateDesc = (a, b) => {
      return new Date(b.last_modified) - new Date(a.last_modified);
    };
    
    useEffect(() =>{
      if(props.user && props.user.userData){
        Axios.get(`${SERVER_ROUTE}/api/users/getResumeList?userId=${props.user.userData._id}`, { withCredentials: true })
        .then(response =>{
          let myResumes = response.data.resumes.map((ele, index) =>{
              return {
                key: ele.id,
                title: ele.title,
                last_modified: ele.date
              }
            })
            const sortedResumes = myResumes.sort(compareByDateDesc);
            setResumeList(sortedResumes);
        })
     }
    },[props.user])
  return (
  <div style={{height: '92vh', paddingTop: '1rem', padding: '0.5rem', display: 'flex',
    flexDirection: 'row', justifyContent: 'center', gap: '1rem',
  backgroundImage: 'url("https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png")'}}>
    <div style={{ width: '75%', gap: '1rem', display: 'flex', flexDirection: 'column',
                height: '90vh', backgroundColor:'#fff', 
                padding: '0.5rem', borderRadius: '0.25rem'}}>
        <Button onClick = {handleAddNew} type="primary" icon={<PlusOutlined />} size='large' style={{maxWidth: '100px', marginBottom: '0.25rem'}}>
         New 
        </Button>
        <Table 
         onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              props.history.push({
                pathname: "/body",
                state: { resumeId: record.key, userId: props.user.userData._id } //
              });
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        dataSource={resumeList} columns={columns} 
        locale={{
          emptyText: (
            <div style={{ textAlign: "center" }}>
              <Button onClick = {handleAddNew} type="primary" size='large' > 
                Create Your First Resume
              </Button>
            </div>
          ),
        }}
        />
    </div>
    <img src={resumeSvg} style={{width: '45vw'}} alt="Resume" />
  </div>
  )
}

export default withRouter(MyResumes)