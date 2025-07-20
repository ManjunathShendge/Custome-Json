import { Card } from "antd";

const JSONPreview = ({ data, isDarkMode }) => {
  return (
    <Card
      style={{
        backgroundColor: isDarkMode ? "#1f1f1f" : "#fafafa",
        color: isDarkMode ? "#ffffff" : "#000000",
        border: isDarkMode ? "1px solid #444" : "1px solid #eee",
        borderRadius: 8,
        fontFamily: "monospace",
        textAlign: "left",
        overflowX: "auto",
      }}
      bodyStyle={{
        padding: 0,
      }}
    >
      <pre
        style={{
          margin: 0,
          padding: 16,
          fontSize: "14px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflowX: "auto",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </Card>
  );
};

export default JSONPreview;
