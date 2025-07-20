import { useState } from "react";
import { Button, Typography, Row, Col, Tooltip, message } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import SchemaField from "./SchemaField";
import JSONPreview from "./JSONPreview";
import parseSchema from "../utils/parseSchema";

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  const addField = () => {
    const newField = {
      id: Date.now() + Math.random(),
      name: "",
      type: "string",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (updatedField) => {
    setFields(
      fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      )
    );
  };

  const deleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const jsonOutput = parseSchema(fields);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
      message.success("Copied to clipboard!", 0.5);
    } catch (error) {
      message.error("Copy failed!");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "24px 16px" }}>
      <Row gutter={[24, 24]}>
        {/* Schema Builder Form Column */}
        <Col xs={24} md={12}>
          <Typography.Title level={4}>Schema Builder</Typography.Title>

          {fields.map((field) => (
            <SchemaField
              key={field.id}
              field={field}
              onUpdate={updateField}
              onDelete={deleteField}
            />
          ))}

          <Button onClick={addField} type="primary" style={{ marginTop: 12 }}>
            + Add Item
          </Button>
        </Col>

        {/* JSON Preview Column */}
        <Col xs={24} md={12}>
          <Typography.Title level={4}>Live JSON Preview</Typography.Title>

          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <Tooltip title="Copy JSON">
              <Button icon={<CopyOutlined />} onClick={handleCopy} />
            </Tooltip>
            <Tooltip title="Export as File">
              <Button icon={<DownloadOutlined />} onClick={handleDownload} />
            </Tooltip>
          </div>

          <JSONPreview data={jsonOutput} />
        </Col>
      </Row>
    </div>
  );
};

export default SchemaBuilder;
