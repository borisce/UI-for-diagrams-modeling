/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["./setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
    'src/app/modules/editor/semantic-check/systemVerilog/svSemanticAnalyzer.ts',
    'src/app/modules/editor/semantic-check/syntaxUtils.ts',
    'src/app/modules/editor/semantic-check/vhdl/vhdlSemanticVisitor.ts',
    'src/app/modules/design-hierarchy/systemverilog/system-verilog-module-listener.ts',
  ],
  testPathIgnorePatterns: ["/node_modules/", "environment.test.ts"],
};
