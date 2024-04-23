import { useContext } from "react";

import logo from "../../assets/logo.png";

import "./Funnel.component.css";
import VideoPlayer from "../videoPlayer/VideoPlayer.component";
import ContactForm from "../detailsPopup/contactForm";
// import { GlobalContext } from "../../App";
import { GlobalContext } from "../../context/globalContext";

const Funnel = () => {
  const { isModalOpen, setIsModalOpen, detailsPopup } = useContext(GlobalContext);
 

  return (
    <>
      <ContactForm />
      <div className="funnel_container">
        <div className="logo_hero_text_container">
          <div className="logo_container">
            <img alt="company-logo" src={logo} className="logo mt-16 mb-10" />
          </div>
          <div className="hero_text_container">
            <h3 className="hero_heading">NO COST CASE STUDY</h3>
            <p className="hero_text_moto">
              We Help business people to grow their business Digitally by
              developing personalised websites.💼🤝
            </p>
          </div>
        </div>
        <div className="video_Vdesc_container">
          <div className="videoPlayer_container">
            <VideoPlayer isPLayable={false}/>
          </div>
          <div className="Vdec_container">
            <h2>EXCLUSIVE FREE CASE STUDY</h2>
            <ol className="feature_list">
              <li>
                <strong>The new strategy</strong> - To achieve your 2nd source
                of income through trading without spending more time.
              </li>
              <li>
                <strong>How to become a profitable trader?</strong> - Even with
                zero knowledge you can learn our strategy and make consistent
                profits.
              </li>
              <li>
                <strong>Trade just 30 mins/day</strong> - How you can have the
                ability to earn more than your 9 to 5 job by just trading part
                time.
              </li>
            </ol>
            <button className="Watch_now_btn" onClick={detailsPopup}>
              Watch Now For Free
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funnel;
