
// import './Footer.module.scss';
import "./Footer.css"

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h4 className="fw-600">Nice food</h4>
        </div>
        <div className="col-md-4">
          <div className="about-us">
            <h4 className="fw-600">About us</h4>
            <h4 className="fw-600">T&C</h4>
            <h4 className="fw-600">Privacy policy</h4>
            <h4 className="fw-600">Contact us</h4>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;

