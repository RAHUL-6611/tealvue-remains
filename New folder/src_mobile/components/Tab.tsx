import styled from 'styled-components';

interface TabProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
  tabOptions: string[];
}

export default function Tab({ tab, setTab, tabOptions }: TabProps) {
  return (
    <TabContainer>
      {tabOptions.map((content, index) => {
        return (
          <TabButton key={index} isActive={tab === index} onClick={() => setTab(index)}>
            {content}
          </TabButton>
        );
      })}
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  position: relative;
  color: ${({ theme }) => theme.palette.white};
  font-family: inherit;
  font-size: 1rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.palette.primaryDark};
  outline: none;
  border: none;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ isActive, theme }) => {
    if (isActive) {
      return `
        background-color: ${theme.palette.primary};
      `;
    }
  }}
`;
