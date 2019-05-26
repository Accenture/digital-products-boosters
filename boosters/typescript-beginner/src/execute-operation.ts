let substract = (x: number, y: number): number => x - y;

let multiply = (x: number, y: number): number => x * y;

let divide = (x: number, y: number): number => x / y;

let executeOperation = (
  operation: (x: number, y: number) => number,
  { x, y }: { x: number; y: number },
): number => operation(x, y);

export { executeOperation, substract, multiply, divide };
