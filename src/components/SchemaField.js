import { Input, Select, Switch, Button, Card, Collapse } from "antd";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";

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
      style={{
        marginBottom: 16,
        backgroundColor: isDarkMode ? "#1f1f1f" : "#fdfdfd",
        borderRadius: 8,
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Field Name"
          value={field.name || ""}
          onChange={(e) => update({ name: e.target.value.trimStart() })}
          style={{
            flex: "1 1 200px",
            minWidth: 140,
            fontSize: "14px",
          }}
        />

        <Select
          value={field.type}
          onChange={(val) => update({ type: val })}
          style={{
            flex: "1 1 150px",
            minWidth: 120,
          }}
        >
          {fieldTypes.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: "1 1 100px",
            gap: 8,
            minWidth: 100,
          }}
        >
          <span style={{ fontSize: 12 }}>Required</span>
          <Switch
            checked={field.required}
            onChange={(checked) => update({ required: checked })}
          />
        </div>

        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(field.id)}
          style={{ flex: "0 0 auto" }}
        >
          Delete
        </Button>
      </div>

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
            marginTop: 16,
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
                  };
                  const updatedChildren = [...(field.children || []), newChild];
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
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </Panel>
        </Collapse>
      )}
    </Card>
  );
};

export default SchemaField;
