
// import './Footer.module.scss';
import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className='footer'>
        <div style={{ marginLeft: 20 }}>
          <h4 className='fw-600'>Nice food</h4>
        </div>
        <div className='about-us'>
          <div>
            <h4 className='fw-600'>About us</h4>
          </div>
          <div>
            <h4 className='fw-600'>T&C</h4>
          </div>
          <div>
            <h4 className='fw-600'>Privacy policy</h4>
          </div>
          <div>
            <h4 className='fw-600'>Contact us</h4>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

