import axios from "axios";

class TodoApi {
  getAll = () => {
    return new Promise(async (resolve) => {
      const payload = { success: false, data: null };

      axios
        .get("http://localhost:5050/api/v1/todos")
        .then((response) => {
          payload.success = response.status === 200;
          payload.data = response.data;
          resolve(payload);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

  
  create = todo => {
    return new Promise(async (resolve) => {
      const payload = { success: false, data: null };

      axios
        .post(`http://localhost:5050/api/v1/todos`, todo)
        .then((response) => {
          payload.success = response.status === 200;
          payload.data = response.data;
          resolve(payload);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

  update = todo => {
    return new Promise(async (resolve) => {
      const payload = { success: false, data: null };

      axios
        .put(`http://localhost:5050/api/v1/todos/${todo.id}`, todo)
        .then((response) => {
          payload.success = response.status === 200;
          payload.data = response.data;
          resolve(payload);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

  delete = id => {
    return new Promise(async (resolve) => {
      const payload = { success: false, data: null };

      axios
        .delete(`http://localhost:5050/api/v1/todos/${id}`)
        .then((response) => {
          payload.success = response.status === 200;
          payload.data = response.data;
          resolve(payload);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

}

export default TodoApi;
