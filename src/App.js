import React from "react";
import "./App.css";
import TodoApi from "./api/TodoApi";
import { message, Button, List, Typography, Checkbox } from "antd";
import { PlusOutlined, SyncOutlined } from "@ant-design/icons";
import TodoModal from "./components/TodoModal";
const api = new TodoApi();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      edit: false,
      create: false,
      editItem: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllTodos();
  }

  getAllTodos = async () => {
    this.setState({
      loading: true,
    });
    const response = await api.getAll();
    if (response.success) {
      this.setState({
        todos: response.data,
        loading: false,
      });
    } else {
      message.error("An error occured!");
    }
  };

  onDelete = async (id) => {
    this.setState({
      loading: true,
      create: false,
      edit: false,
      editItem: null,
    });
    const response = await api.delete(id);
    if (response.success) {
      message.success("Todo deleted successfully.");
      this.getAllTodos();
    } else {
      message.error("An error occured!");
    }
  };

  onLoadClick = () => {
    this.getAllTodos();
  };

  onTodoDoneChange = async (todo) => {
    this.setState({
      loading: true,
    });
    todo.done = !todo.done;
    const response = await api.update(todo);
    if (response.success) {
      message.success("Todo updated successfully.");
      this.getAllTodos();
    } else {
      message.error("An error occured!");
    }
    this.setState({
      loading: false,
    });
  };

  onModalOk = async (create, todo) => {
    this.setState({
      edit: false,
      create: false,
      editItem: null,
      loading: true,
    });
    if (create) {
      const response = await api.create(todo);
      if (response.success) {
        message.success("Todo created successfully.");
        this.getAllTodos();
      } else {
        message.error("An error occured!");
      }
    } else {
      this.onTodoDoneChange(todo);
    }
  };

  onCreateClick = () => {
    this.setState({
      create: true,
      edit: false,
      editItem: { title: "" },
    });
  };

  onTodoChange = (todo) => {
    this.setState({
      editItem: todo,
    });
  };

  onModalCancel = () => {
    this.setState({
      edit: false,
      editItem: null,
    });
  };

  onTodoClick = (todo) => {
    this.setState({
      edit: true,
      editItem: todo,
    });
  };

  renderContent = () => {};

  render() {
    return (
      <div>
        <br />
        <Button
          type="primary"
          style={{ marginLeft: "8px" }}
          onClick={this.onLoadClick}
          icon={<SyncOutlined />}
        >
          Refresh
        </Button>
        <div style={{ float: "right", paddingRight: "8px" }}>
          <Button
            type="primary"
            onClick={this.onCreateClick}
            icon={<PlusOutlined />}
          >
            Add
          </Button>
        </div>
        <br />
        <br />
        <List
          loading={this.state.loading}
          header={<h2>Todo List</h2>}
          bordered
          dataSource={this.state.todos}
          renderItem={(todo) => (
            <List.Item>
              <Typography.Text
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.onTodoClick(todo);
                }}
              >
                {" "}
                {todo.title}
              </Typography.Text>
              <Checkbox
                onChange={() => {
                  this.onTodoDoneChange(todo);
                }}
                value={todo.done}
              />
            </List.Item>
          )}
        />
        <TodoModal
          create={this.state.create}
          todo={this.state.editItem}
          visible={this.state.edit || this.state.create}
          onOk={this.onModalOk}
          onCancel={this.onModalCancel}
          onChange={this.onTodoChange}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

export default App;
