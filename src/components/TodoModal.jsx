import React from "react";
import { Input, Modal, Button } from "antd";
import {DeleteOutlined} from '@ant-design/icons'

class TodoModal extends React.PureComponent {
  render() {
    const visible =
      typeof this.props.visible === "boolean" &&
      this.props.todo !== null &&
      typeof this.props.todo.title === "string"
        ? this.props.visible
        : false;
    const onOk =
      typeof this.props.onOk === "function" ? this.props.onOk : () => {};
    const onCancel =
      typeof this.props.onCancel === "function"
        ? this.props.onCancel
        : () => {};
    const onDelete =
      typeof this.props.onDelete === "function"
        ? this.props.onDelete
        : () => {};
    const onChange =
      typeof this.props.onChange === "function"
        ? this.props.onChange
        : () => {};
    const create =
      typeof this.props.create === "boolean" ? this.props.create : false;

    const onTodoChange = (e) => {
      const todo = { ...this.props.todo };
      todo.title = e.target.value;
      onChange(todo);
    };

    const onDone = () => {
      const todo = { ...this.props.todo };
      onOk(create, todo);
    };

    const deleteTodo = ()=>{
        onDelete(this.props.todo.id);
    }

    let content = null;
    if (this.props.todo !== null && typeof this.props.todo.title == "string") {
      content = (
        <React.Fragment>
          Title:{" "}
          <Input
            placeholder="Title"
            onChange={onTodoChange}
            value={this.props.todo.title}
          />
        </React.Fragment>
      );
    }

    return (
      <Modal
        title={this.props.create ? "Create Todo" : "Edit Todo"}
        visible={visible}
        onCancel={onCancel}
        footer={[
          this.props.create ? null : <Button key="delete" type="primary" onClick={deleteTodo} icon={<DeleteOutlined />} danger/>,
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onDone}>
            Submit
          </Button>,
        ]}
      >
        {content}
      </Modal>
    );
  }
}

export default TodoModal;
