import './login.css'

export default function Login({}) {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2 className='title'>Welcome</h2>

        <div className="email-wrap input-wrp">
          <label htmlFor="email"> Email</label>
          <input
            placeholder="example@gmal.com"
            id="email"
            name="email"
            type="email"
          />
          <span className='msg'>Valid email</span>
        </div>
        <div className="password-wrap input-wrp">
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="12334..."
          />
          <span className='msg'>incorect password</span>
        </div>
        <button type='submit' className="login-btn">Login</button>
      </div>
    </div>
  );
}
