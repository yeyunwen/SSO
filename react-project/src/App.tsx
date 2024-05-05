import "./App.css";

function App() {
  fetch("http://localhost:3000/login?appId=9LQ8Y3mB").then((res) => {
    location.href = res.url;
  });

  return (
    <>
      <div>React Project</div>
    </>
  );
}

export default App;
