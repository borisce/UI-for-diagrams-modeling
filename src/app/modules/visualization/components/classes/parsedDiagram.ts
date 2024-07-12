export interface ParsedDiagram {
    mainModuleName: string;
    mainPorts: [{
        bandwidth: string,
        dataType: string,
        name: string,
        id: string,
        direction: string,
        x: number,
        y: number,
        connectedVia: {
            bandwidth: string,
            dataType: string,
            from: {
                bandwidth: string,
                dataType: string,
                name: string,
                id: string,
                direction: string
            }
            to: [{
                bandwidth: string,
                dataType: string,
                name: string,
                id: string,
                direction: string,
            }]
            Id: string
        },
        connectedTo: [{
            bandwidth: string,
            dataType: string,
            name: string,
            id: string,
            direction: string
        }]
    }];
    modules: [{
        x: number,
        y: number,
        id: string,
        name: string,
        instance: string,
        modulePorts: [{
            bandwidth: string,
            dataType: string,
            name: string,
            id: string,
            direction: string,
            connectedTo: [{
                bandwidth: string,
                dataType: string,
                name: string,
                id: string,
                direction: string
            }],
            connectedVia: {
                bandwidth: string,
                dataType: string,
                from: {
                    bandwidth: string,
                    dataType: string,
                    name: string,
                    id: string,
                    direction: string
                }
                to: [{
                    bandwidth: string,
                    dataType: string,
                    name: string,
                    id: string,
                    direction: string,
                }]
                Id: string
            }
        }]
    }
    ];
    innerOutputPortCons: [{
        bandwidth: string,
        dataType: string,
        from: {
            bandwidth: string,
            dataType: string,
            name: string,
            id: string,
            direction: string
        }
        to: [{
            bandwidth: string,
            dataType: string,
            name: string,
            id: string,
            direction: string
        }],
        Id: string,
    }];
    allConnections: [{
        bandwidth: string,
        dataType: string,
        from: {
            bandwidth: string,
            dataType: string,
            name: string,
            id: string,
            direction: string,
        }
        to: [{
            bandwidth: string,
            dataType: string,
            name: string,
            id: string,
            direction: string,
        }],
        Id: string,
    }];
}
