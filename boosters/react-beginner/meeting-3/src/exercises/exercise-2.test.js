import React from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import Messages, { text } from "../components/messages/index.jsx";
import {
  fetchImplementation,
  resetWebSocketConnections,
  WebSocketImplementation,
  sendMessageToConnectedWebSockets
} from "./exercise-utils.js";

// DESIRED FUNCTIONALITY 👇🏽
// https://digital-products-boosters-react-beginner-meeting-3.s3.amazonaws.com/exercise-2.gif

xdescribe("Exercise 2 - Messages component", () => {
  const renderComponent = () => render(<Messages />);
  const sendMessage = async (value, { getByLabelText, getByText }) => {
    const messageField = getByLabelText(text.message);
    fireEvent.change(messageField, { target: { value } });
    const submitButton = getByText(text.send);
    await act(async () => fireEvent.click(submitButton));
  };

  beforeEach(() => {
    window.fetch = jest.fn(fetchImplementation);
    window.WebSocket = jest.fn(WebSocketImplementation);
  });

  afterEach(cleanup);
  afterEach(resetWebSocketConnections);

  it("should not add messages to the list if listening is off and a message is sent and received", async () => {
    const { getByLabelText, getByText, queryByText } = renderComponent();

    const newMessage = "hola!";
    await sendMessage(newMessage, { getByLabelText, getByText });
    expect(queryByText(newMessage)).toBe(null);
  });

  it("should add messages to the list if listening is on and a message is sent and received", async () => {
    const { getByLabelText, getByText } = renderComponent();

    const newMessage = "hola!";
    const listenButton = getByText(text.start);
    fireEvent.click(listenButton);
    await sendMessage(newMessage, { getByLabelText, getByText });
    getByText(newMessage);
  });

  it("should add messages to the list if listening is on and a message is sent and received", async () => {
    const { getByLabelText, getByText } = renderComponent();

    const newMessage = "hola!";
    const listenButton = getByText(text.start);
    fireEvent.click(listenButton);
    await sendMessage(newMessage, { getByLabelText, getByText });
    getByText(newMessage);
  });

  it("should add messages to the list if listening is on and a message is received", async () => {
    const { getByText } = renderComponent();

    const newMessage = "hola!";
    const listenButton = getByText(text.start);
    fireEvent.click(listenButton);
    act(() => sendMessageToConnectedWebSockets(newMessage));
    getByText(newMessage);
  });

  it("should add only one message to the list if listening is on and a message is received", async () => {
    const { getByText } = renderComponent();

    const newMessage = "hola!";
    const listenButton = getByText(text.start);
    fireEvent.click(listenButton);
    fireEvent.click(listenButton);
    fireEvent.click(listenButton);
    act(() => sendMessageToConnectedWebSockets(newMessage));
    getByText(newMessage);
  });
});
