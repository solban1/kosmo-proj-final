import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

function MainPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupId, setSignupId] = useState("");
  const [signupPwd, setSignupPwd] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupDate, setSignupDate] = useState("");

  const [loginId, setloginId] = useState("");
  const [loginPwd, setloginPwd] = useState("");

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  function doLogin() {
    const params = {
      id: loginId,
      pwd: loginPwd,
    };
    fetch(
      `http://localhost:8080/members/search/existsByIdAndPwd?${new URLSearchParams(
        params,
      ).toString()}`,
      { method: "GET" },
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        if (json === true) {
          alert(`환영합니다. ${loginId}님!`);
          location.href = "/feed";
        } else {
          alert("아이디 혹은 비밀번호를 확인해 주세요.");
        }
      })
      .catch((err) => {
        alert("아이디 혹은 비밀번호를 확인해 주세요.");
        console.error(err);
      });
  }

  function doSignup() {
    const requestBody = {
      id: signupId,
      pwd: signupPwd,
      name: signupName,
      birth: signupDate,
    };
    const json = JSON.stringify(requestBody);
    console.log(json);

    fetch("http://localhost:8080/members", {
      body: json,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
    })
      .then((response) => {
        if (response.ok) {
          alert("회원가입이 완료 되었습니다.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Button variant="danger" onClick={handleShowLogin}>
        Login
      </Button>

      <Button variant="secondary" onClick={handleShowSignup}>
        Sign up
      </Button>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Pinterest에 오신 것을 환영합니다!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="test"
              value={loginId}
              onChange={(e) => setloginId(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">ID</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="pass"
              value={loginPwd}
              onChange={(e) => setloginPwd(e.target.value)}
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="danger" onClick={doLogin}>
            LOGIN
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>회원가입</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="name@example.com"
              value={signupId}
              onChange={(e) => setSignupId(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">아이디</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
              value={signupPwd}
              onChange={(e) => setSignupPwd(e.target.value)}
            />
            <label htmlFor="floatingPasswordCustom">비밀번호</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">이름</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="date"
              placeholder="name@example.com"
              value={signupDate}
              onChange={(e) => setSignupDate(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">생년월일</label>
          </Form.Floating>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="danger" onClick={doSignup}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainPage;
