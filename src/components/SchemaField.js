import { Input, Select, Switch, Button, Card, Space, Collapse } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { RightOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Panel } = Collapse;

const fieldTypes = ["string", "number", "boolean", "nested"];

const SchemaField = ({ field, onUpdate, onDelete, isDarkMode }) => {
  const update = (changes) => {
    onUpdate({ ...field, ...changes });
  };

  return (
    <Card
      size="small"
      style={{ marginBottom: 16, backgroundColor: "#fdfdfd", borderRadius: 8 }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space style={{ width: "100%" }} wrap>
          <Input
            placeholder="Field Name"
            value={field.name || ""}
            onChange={(e) => update({ name: e.target.value.trimStart() })}
            style={{ width: "70%", padding: "8px 12px", fontSize: "14px" }}
          />

          <Select
            value={field.type}
            onChange={(val) => update({ type: val })}
            style={{ width: "130%" }}
          >
            {fieldTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          <Switch
            checked={field.required}
            onChange={(checked) => update({ required: checked })}
            style={{ marginLeft: "50%" }}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(field.id)}
            style={{ marginLeft: "30%" }}
          >
            Delete
          </Button>
        </Space>

        {field.type === "nested" && (
          <Collapse
            defaultActiveKey={["1"]}
            bordered={false}
            expandIcon={({ isActive }) => (
              <RightOutlined
                rotate={isActive ? 90 : 0}
                style={{
                  color: isDarkMode ? "#fff" : "#000",
                  fontSize: 16,
                }}
              />
            )}
            style={{
              backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <Panel
              key="1"
              header={
                <span
                  style={{
                    color: isDarkMode ? "#fff" : "#000",
                    fontWeight: 500,
                  }}
                >
                  {field.name || "Nested Fields"}
                </span>
              }
            >
              <div
                style={{
                  maxHeight: 300,
                  overflowY: "auto",
                  paddingLeft: 12,
                  paddingRight: 8,
                  borderLeft: "2px solid #eee",
                  borderRadius: 4,
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    const newChild = {
                      id: Date.now() + Math.random(),
                      name: "",
                      type: "string",
                      required: false,
                      style: { color: isDarkMode ? "#fff" : "#000" },
                    };
                    const updatedChildren = [
                      ...(field.children || []),
                      newChild,
                    ];
                    update({ children: updatedChildren });
                  }}
                  style={{ marginBottom: 12 }}
                >
                  + Add Item
                </Button>

                {(field.children || []).map((child) => (
                  <SchemaField
                    key={child.id}
                    field={child}
                    onUpdate={(updatedChild) => {
                      const updatedChildren = field.children.map((c) =>
                        c.id === updatedChild.id ? updatedChild : c
                      );
                      update({ children: updatedChildren });
                    }}
                    onDelete={(childId) => {
                      const updatedChildren = field.children.filter(
                        (c) => c.id !== childId
                      );
                      update({ children: updatedChildren });
                    }}
                  />
                ))}
              </div>
            </Panel>
          </Collapse>
        )}
      </Space>
    </Card>
  );
};

export default SchemaField;
