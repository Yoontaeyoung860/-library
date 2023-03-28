import React, { useEffect } from 'react';
import { Row, Col, Button, Input, message as messageDialog } from 'antd';

import styles from './Signin.module.css';
import { LoginReqType } from '../types';

interface SigninProps {
  loading: boolean;
  error: Error | null;
  login: ({ email, password }: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ loading, login, error }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  useEffect(() => {
    if (error === null) return;

    switch (error.message) {
      case 'USER_NOT_EXIST':
        messageDialog.error('User not exist');
        break;
      case 'PASSWORD_NOT_MATCH':
        messageDialog.error('Wrong password');
        break;
      default:
        messageDialog.error('Unknown error occured');
    }
  }, [error]);

  return (
    <form>
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img
              src="/bg_signin.png"
              alt="Signin"
              className={styles.signin_bg}
            />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Please Note Your Opinion
            </div>
            <div className={styles.signin_underline} />
            <div className={styles.email_title}>
              Email
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.password_title}>
              Password
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.button_area}>
              <Button
                size="large"
                loading={loading}
                onClick={click}
                className={styles.button}
              >
                Sign In
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </form>
  );

  function click() {
    if (email === "" || password === "") {
      messageDialog.error('Please fill out all inputs');
      return;
    }
    login({ email, password });
  }
};

export default Signin;
