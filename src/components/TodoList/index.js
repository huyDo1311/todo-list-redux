import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { addNewTodo, addToDo, addToDos } from "./todoSlice";
import { useSelector } from "react-redux";
import { todoRemainingSelector } from "../../redux/selectors";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");

  const todoList = useSelector(todoRemainingSelector);
  // const searchText = useSelector(searchTextSelector);
  // console.log('searchText', searchText);
  // console.log('todoList', todoList);

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    // const todo = {
    //   id: uuidv4(),
    //   name: todoName,
    //   priority: priority,
    //   completed: false,
    // };
    // const action = addToDo(todo);
    // dispatch(action);
    // setTodoName("");
    // setPriority("Medium");

    // dispatch(
    //   addToDos({
    //     id: uuidv4(),
    //     name: todoName,
    //     priority: priority,
    //     completed: false,
    //   })
    // );

    // dispatch(
    //   addToDo({
    //     id: uuidv4(),
    //     name: todoName,
    //     priority: priority,
    //     completed: false,
    //   })
    // );

    dispatch(
      addNewTodo({
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false,
      })
    );
  };

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {/* <Todo name="Learn React" prioriry="High" />
        <Todo name="Learn Redux" prioriry="Medium" />
        <Todo name="Learn JavaScript" prioriry="Low" /> */}
        {todoList.map((todo, index) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              name={todo.name}
              prioriry={todo.priority}
              completed={todo.completed}
              // todo={todo}
            />
          );
        })}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
