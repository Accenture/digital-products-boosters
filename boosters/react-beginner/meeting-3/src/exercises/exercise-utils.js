import {
  arc,
  calculateEndAngle,
  setTransitionDuration
} from "../components/progress-bars/utils";

let webSockets = [];
export const sendMessageToConnectedWebSockets = text =>
  webSockets.forEach(webSocket => {
    if (!webSocket.onmessage) return;

    const data = JSON.stringify({
      text,
      timestamp: new Date().toLocaleString()
    });
    webSocket.onmessage({ data });
  });

export function WebSocketImplementation() {
  webSockets.push(this);
  this.close = () => {
    webSockets = webSockets.filter(webSocket => webSocket !== this);
  };
}

export const fetchImplementation = (_url, init) => {
  sendMessageToConnectedWebSockets(init.body);
  return Promise.resolve({ ok: true });
};

export const resetWebSocketConnections = () => {
  webSockets = [];
};

const newTransitionDuration = 100;
setTransitionDuration(newTransitionDuration);
export const testTimeout = newTransitionDuration + 100;

const createQueryPercentProgressBar = percentage => {
  const endAngle = calculateEndAngle(percentage);
  const pathD = arc({ endAngle });
  return container => () => container.querySelector(`path[d='${pathD}']`);
};

export const queryPercentProgressBar = {
  percent0: createQueryPercentProgressBar(0),
  percent50: createQueryPercentProgressBar(50),
  percent75: createQueryPercentProgressBar(75),
  percent100: createQueryPercentProgressBar(100)
};
