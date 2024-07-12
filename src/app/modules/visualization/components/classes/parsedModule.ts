export interface ParsedModule {
        mainModuleName: string;
        mainModuleInstance: string;
        mainPorts: [{
            bandwidth: string,
            dataType: string,
            name: string,
            id: string,
            direction: string
        }];
        modules: [{
                id: string,
                name: string,
                instance: string,
                modulePorts: [{
                    bandwidth: string,
                    dataType: string,
                    name: string,
                    id: string,
                    direction: string
                }]
            }
        ];
}
