export const duplicateImports = `-- chip_types.vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


package chip_types is
  type states_t is (HOLD, LOAD, READY); -- Definícia enumerovaného typu
end package chip_types;

-- bus_types.vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

package bus_types is
  constant HOLD: natural := 32; -- Definícia konštanty HOLD
end package bus_types;

-- chip.vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use work.chip_types.states_t;
-- replace for:
-- use work.chip_types.all;
use work.bus_types.all; -- Import balíkov chip_types a bus_types

entity chip is
  port (
    -- Definujte porty modulu chip
    clock: in STD_LOGIC;
    reset_n: in STD_LOGIC 
  );
end entity chip;

architecture rtl of chip is
  signal state_e, nstate_e: states_t; -- Použitie enumerovaného typu "states_t"
begin
  process (clock, reset_n)
  begin
    if reset_n = '0' then
      state_e <= HOLD; -- Použitie konštanty HOLD
    else
      state_e <= nstate_e;
    end if;
  end process;
  
  -- Ďalšia logika modulu
end architecture rtl;`;

export const incompleteSensitivityList =`library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;

entity KomplexnyNeuplnySensitivityList is
    Port ( Clock : in STD_LOGIC;
           Reset : in STD_LOGIC;
           Input : in STD_LOGIC;
           Output : out STD_LOGIC);
end KomplexnyNeuplnySensitivityList;

architecture Behavioral of KomplexnyNeuplnySensitivityList is
    signal InternalSignal1 : STD_LOGIC := '0';
    signal InternalSignal2 : STD_LOGIC := '0';
begin
    process (Clock, Reset)
    begin
        if Reset = '1' then
            InternalSignal1 <= '0';
        elsif rising_edge(Clock) then
            InternalSignal1 <= Input;
        end if;
    end process;

    process (InternalSignal1, InternalSignal2, Output)
    begin
        -- Toto je ďalší nekompletný zoznam senzitivity,
        -- chýba tu signál "Clock"
        if InternalSignal1 = '1' then
            Output <= '1';
        elsif InternalSignal2 = '1' then
          Output <= '1';
        else
            Output <= '0';
        end if;
    end process;

end Behavioral;`;

export const incompleteSensitivityListWrong = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;

entity KomplexnyNeuplnySensitivityList is
    Port ( Clock : in STD_LOGIC;
           Reset : in STD_LOGIC;
           Input : in STD_LOGIC;
           Output : out STD_LOGIC);
end KomplexnyNeuplnySensitivityList;

architecture Behavioral of KomplexnyNeuplnySensitivityList is
    signal InternalSignal1 : STD_LOGIC := '0';
    signal InternalSignal2 : STD_LOGIC := '0';
begin
    process (Reset)
    begin
        if Reset = '1' then
            InternalSignal1 <= '0';
        elsif rising_edge(Clock) then
            InternalSignal1 <= Input;
        end if;
    end process;

    process (InternalSignal1, InternalSignal2, Output)
    begin
        -- Toto je ďalší nekompletný zoznam senzitivity,
        -- chýba tu signál "Clock"
        if InternalSignal1 = '1' then
            Output <= '1';
        elsif InternalSignal2 = '1' then
          Output <= '1';
        else
            Output <= '0';
        end if;
    end process;

end Behavioral;`;

export const incompleteSensitivityList2 = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;

entity NeuplnySensitivityList is
    Port ( Input1 : in STD_LOGIC;
           Input2 : in STD_LOGIC;
           Output : out STD_LOGIC);
end NeuplnySensitivityList;

architecture Behavioral of NeuplnySensitivityList is
    signal InternalSignal : STD_LOGIC := '0';
begin
    process (Input1, Input2)
    begin
        if Input1 =  '1' then
            Output <= '1';
        elsif Input2 = '1' then
            InternalSignal <= '1';
            Output <= '0';
        end if;
    end process;

end Behavioral;`;

export const raceConditions = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity ExampleEntity is
    Port ( 
        elk : in  STD_LOGIC;
        rstn : in STD_LOGIC;
        inl : in STD_LOGIC;
        clk_divided2 : out STD_LOGIC;
        out1 : out STD_LOGIC;
        out2 : out STD_LOGIC
    );
end ExampleEntity;

architecture Behavioral of ExampleEntity is
begin
    process (inl, rstn)
    begin
        out1 <= '0';
        if (rstn = '0') then
            clk_divided2 <= '0';
        else
            clk_divided2 <= not clk_divided2;
        end if;
    end process;

    process (inl, rstn)
    begin
        if (rstn = '0') then
            out1 <= '0';
        else
            out2 <= inl;
        end if;
    end process;

    out2 <= out1 + inl;

    process (clk_divided2)
    begin
        if (rstn = '0') then
            out2 <= '0';
        else
            out2 <= out1;
        end if;
    end process;

end Behavioral;`;

export const noRaceConditions = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity ExampleEntity is
    Port ( 
        elk : in  STD_LOGIC;
        rstn : in STD_LOGIC;
        inl : in STD_LOGIC;
        clk_divided2 : out STD_LOGIC;
        out1 : out STD_LOGIC;
        out2 : out STD_LOGIC
    );
end ExampleEntity;

architecture Behavioral of ExampleEntity is
begin
    process (inl, rstn)
    begin
        out1 <= '0';
        if (rstn = '0') then
            clk_divided2 <= '0';
        else
            clk_divided2 <= not clk_divided2;
        end if;
    end process;

    process (inl, rstn)
    begin
        if (rstn = '0') then
            out1 <= '0';
        else
            out2 <= inl;
        end if;
    end process;

    out2 <= out1 + inl;
end Behavioral;`;

export const incompleteDecisionStatements = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;

entity StateMachine is
    Port (
        state : in STD_LOGIC_VECTOR(2 downto 0);
        nstate : out STD_LOGIC_VECTOR(2 downto 0)
    );
end entity StateMachine;

architecture Behavioral of StateMachine is
begin
    process (state)
    begin
        nstate <= "111";
        if state = "001" then
            nstate <= "010";
        elsif state = "010" then
            nstate <= "100";
        elsif state = "100" then
            nstate <= "001";
        end if;
    end process;
end architecture Behavioral;`;

export const incompleteDecisionStatementsCaseVersion = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;


entity StateMachine is
    Port (
        state : in STD_LOGIC_VECTOR(2 downto 0);
        nstate : out STD_LOGIC_VECTOR(2 downto 0)
    );
end entity StateMachine;

architecture Behavioral of StateMachine is
begin
    process (state)
    begin
        case state is
            when "001" =>
                nstate <= "010";
            when "010" =>
                nstate <= "100";
            when "100" =>
                nstate <= "001";
            when "101" =>
                nstate <= "101";
        end case;
    end process;
end architecture Behavioral;`;

export const twoClocks = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Incorrect_FlipFlop is
    Port ( clk1 : in  STD_LOGIC;
           clk2 : in  STD_LOGIC;
           reset : in  STD_LOGIC;
           d : in  STD_LOGIC;
           q : out  STD_LOGIC);
end Incorrect_FlipFlop;

architecture Behavioral of Incorrect_FlipFlop is
begin
    process(clk1, reset)
    begin
        if (rising_edge(clk1) or rising_edge(reset)) then
          if reset = '1' then
            q <= '0';
          else
            q <= d;
          end if;
        end if;
    end process;
end Behavioral;`;

export const operatorMissmatch = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;

entity BitwiseLogicExample is
end BitwiseLogicExample;

architecture Behavioral of BitwiseLogicExample is
  signal abc : integer;
  signal xyz : std_logic_vector(1 downto 0);
begin
  process
  begin
    abc <= '1';
    xyz <= "01";
    
    if abc then
      -- II evaluates as FALSE
      report "II evaluates as FALSE";
    end if;

    if not b(1) and not b(0) then
      -- II evaluates as FALSE
      report "II evaluates as FALSE";
    end if;

    if xyz = abc then
      -- II evaluates as TRUE
      report "II evaluates as TRUE -- GOTCHA!";
    end if;
    
    wait;
  end process;
end Behavioral;`;

export const defaultCode = `library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity comparator is
port( a,b : in unsigned(2 downto 0);  --3 bit numbers to be compared
a_eq_b : out std_logic;  --a equals b
a_le_b : out std_logic;  --a less than b
 a_gt_b : out std_logic   --a greater than b
);
end comparator;

architecture gate_level of comparator is

signal temp1,temp2,temp3,temp4,temp5,temp6,temp7,temp8,temp9 : std_logic := '0';

begin
temp1 <= not(a(2) xor b(2));  --XNOR gate with 2 inputs.
temp2 <= not(a(1) xor b(1));  --XNOR gate with 2 inputs.
temp3 <= not(a(0) xor b(0));  --XNOR gate with 2 inputs.
temp4 <= (not a(2)) and b(2);
temp5 <= (not a(1)) and b(1);
temp6 <= (not a(0)) and b(0);
temp7 <= a(2) and (not b(2));
temp8 <= a(1) and (not b(1));
temp9 <= a(0) and (not b(0));

a_eq_b <= temp1 and temp2 and temp3;  -- for a equals b.
a_le_b <= temp4 or (temp1 and temp5) or (temp1 and temp2 and temp6); --for a less than b
a_gt_b <= temp7 or (temp1 and temp8) or (temp1 and temp2 and temp9); --for a greater than b

end gate_level;`;

export const defaultCode2 = `-- Definícia knižníc
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;

-- Definícia entity (porty)
entity BinaryAdder is
Port (A : in STD_LOGIC_VECTOR(1 downto 0);
      B : in STD_LOGIC_VECTOR(1 downto 0);
      Sum : out STD_LOGIC_VECTOR(1 downto 0));
end BinaryAdder;

-- Definícia architektúry (sčítacieho procesu)
architecture Behavioral of BinaryAdder is
signal temp1: std_logic := 0;
signal temp2: std_logic := 1;

begin
    -- Proces na sčítanie
    process(A, B)
        variable temp : STD_LOGIC_VECTOR(1 downto 0);
    begin
        temp := (others => '0');  -- Inicializácia pomocnej premennej na 00

        -- Sčítanie A a B
        temp := A + B;

        -- Výstupný signál Sum
        Sum <= temp;

    end process;

end Behavioral;

architecture Behaviorals of BinaryAdder is
signal temp1: std_logic := 0;
signal temp2: std_logic := 1;

begin
    -- Proces na sčítanie
    process(A, B)
        variable temp : STD_LOGIC_VECTOR(1 downto 0);
    begin
        temp := (others => '0');  -- Inicializácia pomocnej premennej na 00

        
        -- Sčítanie A a B
        temp := A + B;

        -- Výstupný signál Sum
        Sum <= temp;

    end process;

end Behaviorals;`;

export const defaultCode3 = `-- Definícia knižníc
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;

-- Definícia entity (porty)
entity BinaryAdder is
Port ( A : in STD_LOGIC_VECTOR(1 downto 0);
        B : in STD_LOGIC_VECTOR(1 downto 0);
        Sum : out STD_LOGIC_VECTOR(1 downto 0));
end BinaryAdder;

-- Definícia architektúry (sčítacieho procesu)
architecture Behavioral of BinaryAdder is
    signal SignalA : STD_LOGIC_VECTOR(1 downto 0);  -- Deklarácia signálov
    signal SignalB : integer;

begin
    -- Priraď signály A a B do nových signálov
    SignalA <= A;
    SignalB <= B;

    -- Proces na sčítanie
    process(SignalA, SignalB)
        variable temp : STD_LOGIC_VECTOR(1 downto 0);
    begin
        temp := (others => '0');  -- Inicializácia pomocnej premennej na 00

        -- Sčítanie SignalA a SignalB
        temp := SignalA + SignalB;

        -- Výstupný signál Sum
        Sum <= temp;

        -- Porovnanie hodnôt SignalA a SignalB
        if SignalA = SignalB then
            report "SignalA a SignalB sú rovnaké.";
        else
            report "SignalA a SignalB nie sú rovnaké.";
        end if;

    end process;

end Behavioral;`;