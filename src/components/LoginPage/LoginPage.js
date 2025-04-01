import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../_actions/user_actions";
import { Form, Input, Button } from 'antd';
import { useDispatch } from "react-redux";
import styles from "./LoginPage.module.css";
import { useLocation } from "react-router-dom";

function LoginPage(props) {
  const location = useLocation();
  const { state } = location;
  console.log("state:",state);
  const dispatch = useDispatch();
  const [formErrorMessage, setFormErrorMessage] = useState(null)


  const onFinish = (values) => {
    const { username, password } = values;
  
    // Dispatch your login action here, passing the username and password
    dispatch(loginUser({ email: username, password }))
      .then((response) => {
        if (response.payload.loginSuccess) {
          console.log("from:",state?.from);
          props.history.push(state?.from || "/");
          // props.history.push("/");
        } else {
          setFormErrorMessage('Check your Account or Password again');
        }
      })
      .catch((err) => {
        setFormErrorMessage('Check your Account or Password again');
        setTimeout(() => {
          setFormErrorMessage('');
        }, 3000);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
  <div className="app">
    <div className={styles.form}>
      <h2 style={{marginBlock:'5px'}}>Sign in</h2>
      {formErrorMessage && 
      <div className={styles.errorbox}>
        <div style={{width: '5px', backgroundColor: 'rgb(219, 48, 48)'}}/>
        <div className={styles.errortext}>
          <p>{formErrorMessage}</p>
        </div>
      </div>}
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
      >
      <div>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }}>
          Log in
      </Button>
      </div>
      </Form.Item>
    </Form>
    </div>
  </div>
  );
};

export default withRouter(LoginPage);


