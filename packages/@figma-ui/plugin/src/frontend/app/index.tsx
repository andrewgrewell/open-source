import { Page, Rectangle, Text } from 'react-figma';

export const App = () => {
  return (
    <Page name="New page">
      <Rectangle style={{ backgroundColor: '#dd55aa', height: 100, width: 200 }} />
      <Text characters="text" style={{ color: '#ffffff' }} />
    </Page>
  );
};
