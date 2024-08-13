import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const formInitial = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  }
  const [form, setForm] = useState(formInitial);
const [buttonText, setButtonText] = useState("Send")
const [status, setStatus] = useState({});
  const handleChange = (category, value) => {
    setForm({ ...form, [category]: value, })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("https://test-3-wjlg.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(form)
    });
    let result = await response.json();
    setButtonText("Send");
    setForm(formInitial);
    if(result.code == 200) {
      setStatus({sucess: true, message: "Message sent Successfully"})
    }else {
      setStatus({sucess: fale, message: "Something went wrong"})

    }
    console.log(form);
  }

  return (
    <div className="App">
     
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='input'>
            <label>firstname: </label>
            <input 
            type='text'
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)} 
            placeholder='Kamal' />
          </div>
          <div className='input'>
            <label>Lastname: </label>
            <input
             type='text' 
             value={form.lastName}
             onChange={(e) => handleChange("lastName", e.target.value)}
             placeholder='Jerry' />
          </div>
          <div className='input'>
            <label>Phonenumber: </label>
            <input 
              type='number'
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)} 
              placeholder='+23482487499' />
          </div>
          <div className='input'>
            <label>Email: </label>
            <input 
            type='email'
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
             placeholder='your@email.com' />
          </div>
          <div className='input'>
            <label>message: </label>
            <textarea 
             type='text'
             value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
              placeholder='message'
              ></textarea>
          </div>
          <button type='submit'>{buttonText}</button>
          <div>
            <p>{status.message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
