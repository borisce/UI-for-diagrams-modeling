export interface Logic {
  name: string,
  id: string,
  inPorts: Port [],
  outPorts: Port [],
  modulePorts?: Port [],
  selPorts?: Port[],
  clkPorts?: Port[],
  enPorts?: Port[],
  rstPorts?: Port[],
  type: string,
  struct: string,
  size?: {
    width: number,
    height: number
  },
  moduleConnection?: ModuleConnection[],
  bandwidth?: number,
  instance?: string,
  position?: {
    x: number,
    y: number
  }
}

export interface Connection {
  id: string,
  datatype: string,
  width?,
  from: Logic | Port,
  to: Logic | Port,
  fromType: string,
  toType: string,
  type?: string
}

export interface Signal {
  id: string
  name: string,
  datatype: string,
  direction: string,
  width?,
  position?: {
    x: number,
    y: number
  }
}

export interface Port {
  id: string,
  name: string,
  datatype: string,
  direction: string,
  width?,
  size?: {
    width: number,
    height: number
  },
  position?: {
    x: number,
    y: number
  }
}

export interface ModuleConnection {
  from: string,
  fromId: string,
  to: string,
  toId: string
}