import { useState } from "react";
import Typewriter from "typewriter-effect";
import { ConfigProvider, theme as antdTheme, Switch, Typography } from "antd";
import SchemaBuilder from "./components/SchemaBuilder";

const { Title } = Typography;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <div
        className="App"
        style={{
          backgroundColor: isDarkMode ? "#141414" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          minHeight: "100vh",
          padding: 24,
          textAlign: "center",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <Switch checked={isDarkMode} onChange={toggleTheme} />
          <span style={{ marginLeft: 8 }}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </span>
        </div>

        <Title level={2} style={{ color: isDarkMode ? "#00e5ff" : "#1890ff" }}>
          <Typewriter
            options={{
              strings: ["JSON Schema Builder"],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              cursor: "|",
            }}
          />
        </Title>

        <SchemaBuilder />
      </div>
    </ConfigProvider>
  );
}

export default App;
