import { Card } from "antd";

const JSONPreview = ({ data, isDarkMode }) => {
  return (
    <Card
      style={{
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
        backgroundColor: "#fafafa",
        color: isDarkMode ? "#ffffff" : "#000000",
        border: "1px solid #eee",
        padding: "16px",
        textAlign: "left",
        borderRadius: 8,
      }}
      bodyStyle={{ padding: 0 }}
    >
      <pre style={{ margin: 0, padding: 16 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </Card>
  );
};

export default JSONPreview;
