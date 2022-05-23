import { useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { Button, Form, Input } from 'antd';
import { UserContext } from '../App';

const firebaseConfig = {
    apiKey: "AIzaSyBFPMkqDrVCya9MdgwM_PPWFOylmejzMBg",
  authDomain: "my-first-firestore-ltw.firebaseapp.com",
  projectId: "my-first-firestore-ltw",
  storageBucket: "my-first-firestore-ltw.appspot.com",
  messagingSenderId: "694538538859",
  appId: "1:694538538859:web:615e7a26b1eac5362ac62e"
};

const connectAuth = () => {
    const app = initializeApp(firebaseConfig); // connect to firebase
    return  getAuth(app); // connect to firebase/auth
  }

  export default function Login() {
    const { setUser } = useContext(UserContext);
    const handleLogin = ({ email, password }) => {
      const auth = connectAuth();
      // login with Firebase Auth
      signInWithEmailAndPassword(auth, email, password)
        .then(res => setUser(res.user))
        .catch(console.error)
    }

    const handleGoogleLogin = () => {
        const auth = connectAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then(res => setUser(res.user))
          .catch(console.error)
      }
      
    return(
     <section style={{ padding: '2em' }}>
        <Form
        onFinish={handleLogin}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter a valid email' }]}
            >
            <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 16, offset: 8 }}
        >
            <Button type="primary" htmlType='submit'>Login</Button>
        </Form.Item>
         <Form.Item
          wrapperCol={{ span: 16, offset: 8 }}
        >
            <Button onClick={handleGoogleLogin}>Google Login</Button>
         </Form.Item>
        </Form>
     </section>
    )   
}