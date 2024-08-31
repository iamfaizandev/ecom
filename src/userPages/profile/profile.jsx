import { useCookies } from "react-cookie";
import "./profile.css";
import HeaderandNav from "../../twoInOne/header&Nav/header&Nav";
import personSvg from "../../assets/personSvg.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Footer from "../../component/footer/footer";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
export default function Profile() {
  let navigate = useNavigate();
  const [isLoading, setIsloading] = useState(true);
  const [cookies] = useCookies(["Email", "FirstName", "LastName", "PhoneNo"]);
  const [userDetails, setUserDetails] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
      }
    });
  };

  useEffect(() => {
    fetchUserData();
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  });

  return (
    <div className="profile">
      <HeaderandNav />
      <section className="profile-section">
        <div className="leftSide">
          {isLoading ? (
            <Skeleton
              width={420}
              height={90}
              className="mb-2"
              variant="rectangular"
            />
          ) : (
            <div className="userTop d-flex justify-content-space">
              <div className="personSvg">
                <img src={personSvg} alt="" />
              </div>
              <div className="usertxt">
                <span className="greet">Hello!</span> <br />
                <span className="username">
                  {`${cookies.FirstName} ${cookies.LastName}`}{" "}
                </span>
              </div>
            </div>
          )}
          {isLoading ? (
            <Skeleton width={420} height={500} variant="rectangular" />
          ) : (
            <div className="profileOrder">
              <div className="profileOrder-header">{}</div>
              <div className="profile-details ">
                <ul className="UserDataList">
                  <li>
                    <strong>First Name:</strong> {cookies.FirstName}
                  </li>
                  <li>
                    <strong>Last Name:</strong> {cookies.LastName}
                  </li>
                  <li>
                    <strong>Email:</strong> {cookies.Email}
                  </li>
                  <li>
                    <strong>Phone Number:</strong> {cookies.PhoneNo}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {isLoading ? (
          <Skeleton width={850} height={600} variant="rectangular" />
        ) : (
          <div className="rightSide">
            <Skeleton width={870} height={600} variant="rectangular" />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
