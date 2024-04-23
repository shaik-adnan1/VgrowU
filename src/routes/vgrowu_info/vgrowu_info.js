import { useState, useRef, useEffect } from "react";

import logo from "../../assets/logo.png";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer.component";
import "./vgrowU_info.css";

const VgrowU_Info = () => {
  const [showApplyNow, setShowApplyNow] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const handleVideoProgress = () => {
        console.log("Current Time:", videoRef.current.currentTime);
        console.log("Duration:", videoRef.current.duration);
        const remainingTime =
          videoRef.current.duration - videoRef.current.currentTime;
        console.log("Remaining Time:", remainingTime);
        if (remainingTime <= 300) {
          setShowApplyNow(true);
        } else {
          setShowApplyNow(false);
        }
      };

      videoRef.current.addEventListener("timeupdate", handleVideoProgress);

      return () => {
        videoRef.current.removeEventListener("timeupdate", handleVideoProgress);
      };
    }
  }, [videoRef.current]);

  return (
    <>
      <div className="vgrowU_info_container">
        <div className="logo_container">
          <img src={logo} alt="company logo" className="logo" />
        </div>
        <div className="steps_container">
          <div className="steps_1_container">
            <h3 className="steps_text">STEP 1: WATCH THIS VIDEO</h3>
            <VideoPlayer isPLayable={true} className="videoplayer" ref={videoRef} />
          </div>
          <div className="steps_2_container">
            <h3 className="steps_text">
              STEP 2: Book your Free Call with us after watching this short
              video 👇
            </h3>
            <p className="apply_disclaimer">
              You will get Apply Now button after you watch the complete video
            </p>
            {showApplyNow && (
              <button type="submit" className="apply-now-button">
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VgrowU_Info;
